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

  if [[ ! "$name" =~ -(light|dark)\.png$ ]]; then
    echo "SALTEADA  $name — falta el sufijo -light o -dark."
    continue
  fi

  cp "$file" "$DEST/$name"
  echo "OK        $name  ${width}x${height}"
  found=$((found + 1))
done

if [ "$found" -eq 0 ]; then
  echo "No se importó ninguna captura de $SRC" >&2
  exit 1
fi

echo
echo "$found capturas en $DEST"
echo "Recordá que cada pantalla necesita su par -light y -dark."
