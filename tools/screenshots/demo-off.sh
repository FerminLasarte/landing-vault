#!/usr/bin/env bash
# Devuelve tu base real a su lugar y borra la de prueba.
set -euo pipefail

DIR="$HOME/Library/Application Support/com.ferminlasarte.vault-ai"
REAL="$DIR/vault-ai.db"
HELD="$DIR/vault-ai.db.hold"
STATE="$DIR/.window-state.json"
SUM="$DIR/.real-db.sha256"

if [ ! -f "$HELD" ]; then
  echo "No hay ninguna base apartada: ya estás usando la real."
  exit 0
fi

osascript -e 'quit app "Vault"' 2>/dev/null || true
sleep 3

# Se verifica ANTES de borrar nada. Si el archivo apartado no es el que se
# guardó, el script para y no toca nada más.
if [ -f "$SUM" ]; then
  actual="$(shasum -a 256 "$HELD" | awk '{print $1}')"
  expected="$(cat "$SUM")"
  if [ "$actual" != "$expected" ]; then
    echo "ALTO: la base apartada no coincide con la que se guardó." >&2
    echo "  esperado: $expected" >&2
    echo "  actual:   $actual" >&2
    echo "No se borró nada. Revisá $HELD a mano." >&2
    exit 1
  fi
fi

rm -f "$REAL" "$REAL-wal" "$REAL-shm"
mv "$HELD" "$REAL"
rm -f "$STATE"
[ -f "$STATE.hold" ] && mv "$STATE.hold" "$STATE"
rm -f "$SUM"

echo "Tu base real volvió a su lugar:"
shasum -a 256 "$REAL"
