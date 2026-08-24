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

// An hour is short enough that a release shows up on the site the morning it
// ships, and long enough that the unauthenticated GitHub limit — 60 requests
// per hour per IP — is never in play, however much traffic the page gets.
const REVALIDATE_SECONDS = 3600;

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

// `cache` so the hero and the closing section share one request per render
// rather than asking GitHub twice for the same answer.
export const getLatestRelease = cache(async (): Promise<Release> => {
  try {
    const response = await fetch(LATEST_RELEASE_API, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(`GitHub answered ${response.status} for the latest release`);
      return UNKNOWN;
    }

    const release = (await response.json()) as GitHubRelease;
    const assets = Array.isArray(release?.assets) ? release.assets : [];

    return {
      version: normalizeTag(release?.tag_name),
      mac: findAsset(assets, ".dmg"),
      windows: findAsset(assets, "-setup.exe"),
      windowsMsi: findAsset(assets, ".msi"),
    };
  } catch (error) {
    // A failed lookup is not a broken page: every link falls back to the
    // release page, which is one extra click and always correct.
    console.error("Could not read the latest release", error);
    return UNKNOWN;
  }
});
