#!/usr/bin/env bash
# Aparta la base real de Vault y deja en su lugar una con datos de prueba.
#
# El archivo real NUNCA se sobrescribe ni se copia encima: se renombra a
# vault-ai.db.hold y se queda ahí hasta que demo-off.sh lo devuelve. Su checksum
# se registra antes y se verifica después, así que si algo sale mal se nota acá
# y no dentro de la app.
set -euo pipefail

DIR="$HOME/Library/Application Support/com.ferminlasarte.vault-ai"
REAL="$DIR/vault-ai.db"
HELD="$DIR/vault-ai.db.hold"
STATE="$DIR/.window-state.json"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -f "$HELD" ]; then
  echo "Ya estás en modo demo: la base real está en vault-ai.db.hold."
  echo "Si querés volver, corré demo-off.sh."
  exit 1
fi

if [ ! -f "$REAL" ]; then
  echo "No encontré $REAL" >&2
  exit 1
fi

osascript -e 'quit app "Vault"' 2>/dev/null || true
sleep 3

shasum -a 256 "$REAL" | awk '{print $1}' > "$DIR/.real-db.sha256"
echo "checksum de tu base real: $(cat "$DIR/.real-db.sha256")"

mv "$REAL" "$HELD"
[ -f "$STATE" ] && mv "$STATE" "$STATE.hold"

# La ventana, en puntos lógicos por dos: 1440x900 da capturas de 2880x1800 en
# una pantalla Retina, que es lo que la web necesita para el hero.
cat > "$STATE" <<'JSON'
{"main":{"width":2880,"height":1800,"x":120,"y":120,"prev_x":120,"prev_y":120,"maximized":false,"visible":true,"decorated":true,"fullscreen":false}}
JSON

# La app tiene que crear la base ella misma: si el esquema se arma por fuera,
# la tabla de control de sqlx queda vacía, en el próximo arranque sqlx reintenta
# la primera migración sobre tablas que ya existen, aborta, y la app abre con
# todos los números en cero.
echo "Abriendo Vault para que cree una base limpia…"
open -a Vault
sleep 10
osascript -e 'quit app "Vault"' 2>/dev/null || true
sleep 3

node "$HERE/seed.mjs" "$REAL"

echo
echo "Listo. Abrí Vault: tiene doce meses de datos de prueba."
echo "Cuando termines de capturar, corré:  $HERE/demo-off.sh"
