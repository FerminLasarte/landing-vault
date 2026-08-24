import { cache } from "react";

import { site } from "@/lib/site";

// Where the download links come from. They are never hardcoded on purpose:
// every asset name carries the version (Vault_1.0.2_universal.dmg), so a URL
// written into the site is a 404 waiting for the next release.
const LATEST_RELEASE_API = `https://api.github.com/repos/${site.repoSlug}/releases/latest`;

// Where a visitor ends up when the feed cannot be read, or when the release is
// missing the asset for their platform. It always resolves to the newest
// release, so it is a longer route to the file but never a wrong one.
export const RELEASES_PAGE = `${site.repo}/releases/latest`;

// How long a rendered page may keep quoting an old version. The window is a
// straight trade against the unauthenticated GitHub limit of 60 requests per
// hour per IP: the call happens once per window per region that gets traffic —
// never once per visitor — so five minutes costs at most 12 requests an hour
// and leaves plenty of headroom on an egress IP shared with other sites.
//
// It cannot be zero. If a release should appear the second it is published,
// the fix is a deploy hook fired from the app's release workflow, not a shorter
// poll here.
const REVALIDATE_SECONDS = 300;

// `latest.json` and the `.sig` files belong to the app's own updater, and
// `.app.tar.gz` is the payload it installs over itself. None of the three is
// something a person downloads.
const NOT_FOR_HUMANS = /^latest\.json$|\.sig$|\.app\.tar\.gz$/i;

export interface Asset {
  href: string;
  // Already formatted for display, "13 MB".
  size: string;
}

export interface Release {
  // The tag as published, "v1.0.2". Null when the feed could not be read.
  version: string | null;
  mac: Asset | null;
  // The Windows installer, and the .msi as the alternative for whoever needs
  // it (managed machines, unattended installs).
  windows: Asset | null;
  windowsMsi: Asset | null;
}

// Every link degrades to the release page rather than disappearing: an asset
// missing from a release should cost a click, not the download.
export function assetHref(asset: Asset | null): string {
  return asset?.href ?? RELEASES_PAGE;
}

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  tag_name: string;
  assets: GitHubAsset[];
}

const UNKNOWN: Release = {
  version: null,
  mac: null,
  windows: null,
  windowsMsi: null,
};

// GitHub reports sizes in bytes and shows them in decimal megabytes on the
// release page. Matching that avoids a "12 MB here, 13 MB there" discrepancy.
function formatSize(bytes: number): string {
  const megabytes = bytes / 1_000_000;
  const formatted = new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: megabytes < 100 ? 1 : 0,
  }).format(megabytes);

  return `${formatted} MB`;
}

function findAsset(assets: GitHubAsset[], suffix: string): Asset | null {
  const match = assets.find(
    (asset) =>
      typeof asset?.name === "string" &&
      !NOT_FOR_HUMANS.test(asset.name) &&
      asset.name.toLowerCase().endsWith(suffix),
  );

  if (!match?.browser_download_url) return null;

  return { href: match.browser_download_url, size: formatSize(match.size) };
}

function normalizeTag(tag: unknown): string | null {
  if (typeof tag !== "string" || tag.length === 0) return null;
  return tag.startsWith("v") ? tag : `v${tag}`;
}

async function readLatestRelease(): Promise<Release> {
  const response = await fetch(LATEST_RELEASE_API, {
    headers: {
      Accept: "application/vnd.github+json",
      // Optional, and the site works without it. Setting it lifts the
      // unauthenticated ceiling of 60 requests per hour per IP to 5000, which
      // matters because the egress IP is shared with whoever else is deployed
      // alongside us — their traffic can spend our budget.
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(
      `GitHub answered ${response.status} for the latest release`,
    );
  }

  const release = (await response.json()) as GitHubRelease;
  const assets = Array.isArray(release?.assets) ? release.assets : [];

  return {
    version: normalizeTag(release?.tag_name),
    mac: findAsset(assets, ".dmg"),
    windows: findAsset(assets, "-setup.exe"),
    windowsMsi: findAsset(assets, ".msi"),
  };
}

// `cache` so the hero, the closing section and the footer share one request per
// render rather than asking GitHub three times for the same answer.
export const getLatestRelease = cache(async (): Promise<Release> => {
  try {
    return await readLatestRelease();
  } catch (error) {
    // Letting this throw is the point. A failed lookup must never replace a
    // page that was working: when a render throws during revalidation, Next
    // keeps serving the last one that succeeded, so a rate-limited minute is
    // invisible. Swallowing the error instead is what turned every download
    // button into a link to the releases page — the whole page degrades
    // because one request lost a race.
    //
    // The build is the exception: there is no previous page to keep, and
    // failing a deploy over GitHub being busy is worse than shipping links
    // that degrade for one revalidation window and then heal.
    if (process.env.NEXT_PHASE !== "phase-production-build") throw error;

    console.error("Could not read the latest release at build time", error);
    return UNKNOWN;
  }
});
