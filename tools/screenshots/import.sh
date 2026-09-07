#!/usr/bin/env bash
# Lleva las capturas crudas de la app a public/screenshots, verificando que
# tengan resolución suficiente.
#
# Uso:  ./import.sh ~/Desktop/capturas
#
# No se recorta nada. Las capturas incluyen la ventana real de macOS —
# semáforos incluidos — y eso es deseable: dicen "app de escritorio" mejor que
# cualquier marco dibujado, y el componente AppShot no dibuja uno propio
# justamente para no apilar una ventana falsa sobre una real. Sus esquinas son
# transparentes y redondeadas, y el marco del sitio las recorta con su propio
# radio.
set -euo pipefail

SRC="${1:?uso: ./import.sh <carpeta-con-capturas>}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$(cd "$HERE/../.." && pwd)/public/screenshots"

# El hero muestra una captura a 1376 px CSS; en una pantalla Retina eso pide
# unos 2750 px de origen. Por debajo se ve blanda, que era el problema de las
# capturas anteriores (2048 px estirados).
MIN_WIDTH=2400

mkdir -p "$DEST"
shopt -s nullglob
found=0

for file in "$SRC"/*.png; do
  name="$(basename "$file")"
  width="$(sips -g pixelWidth "$file" | awk '/pixelWidth/{print $2}')"
  height="$(sips -g pixelHeight "$file" | awk '/pixelHeight/{print $2}')"

  if [ "$width" -lt "$MIN_WIDTH" ]; then
    echo "SALTEADA  $name — ${width}px de ancho, por debajo del mínimo de ${MIN_WIDTH}."
    continue
  fi

  if [[ ! "$name" =~ ^(.+)-(light|dark)\.png$ ]]; then
    echo "SALTEADA  $name — falta el sufijo -light o -dark."
    continue
  fi

  screen="${BASH_REMATCH[1]}"
  theme="${BASH_REMATCH[2]}"

  # El nombre lleva un hash del contenido. Reemplazar una captura conservando el
  # nombre deja la URL igual, y toda caché que ya respondió por esa URL sigue
  # respondiendo con los bytes viejos: la del navegador, y en producción la del
  # CDN, que es la que importa — se deployea una captura nueva y los visitantes
  # siguen viendo la anterior. Borrar el archivo viejo no cambia nada, porque la
  # copia rancia no está en el disco. Un nombre distinto es una URL distinta.
  hash="$(shasum -a 256 "$file" | cut -c1-8)"
  target="$screen-$theme.$hash.png"

  # Fuera las versiones anteriores de esta misma pantalla, o se acumularían.
  find "$DEST" -maxdepth 1 -name "$screen-$theme.*.png" -delete
  rm -f "$DEST/$screen-$theme.png"

  cp "$file" "$DEST/$target"
  echo "OK        $target  ${width}x${height}"
  found=$((found + 1))
done

if [ "$found" -eq 0 ]; then
  echo "No se importó ninguna captura de $SRC" >&2
  exit 1
fi

echo
echo "$found capturas en $DEST"
echo "Recordá que cada pantalla necesita su par -light y -dark."
