# Capturas de la app

Cómo se generan las capturas de `public/screenshots` sin usar datos reales.

## Por qué existe esto

Las capturas son la pieza visual más grande del sitio: el hero muestra una a
1376 px de ancho CSS, que en una pantalla Retina pide unos 2750 px de origen.
Una captura de 2048 px se ve blanda ahí, por más que alcance en el resto de la
página. De ahí el mínimo de 2400 px que verifica `import.sh`.

Y las capturas muestran finanzas. Las de un dueño de proyecto son las suyas, así
que hace falta una base con datos inventados pero coherentes: sueldos que suben
por escalones como suben en pesos, cuentas que alguien repone en vez de hundirse
en negativo, y compromisos pendientes que todavía no estén registrados como
gasto.

## Los tres pasos

```bash
tools/screenshots/demo-on.sh     # aparta tu base real, deja una de prueba
# … sacás las capturas …
tools/screenshots/import.sh ~/Desktop/capturas
tools/screenshots/demo-off.sh    # devuelve tu base real
```

`demo-on.sh` nunca sobrescribe tu base: la renombra a `vault-ai.db.hold` y
guarda su checksum. `demo-off.sh` lo verifica antes de borrar nada, y si no
coincide se detiene sin tocar el archivo.

## Sacar las capturas

Los clics en segundo plano no llegan al webview de Tauri, así que la app tiene
que estar al frente mientras se navega. Con Vault abierto, para cada pantalla:

```bash
screencapture -w -o ~/Desktop/capturas/estadisticas-light.png
```

El cursor se convierte en una cámara: hacés clic en la ventana de Vault y la
captura sale a resolución nativa — 2880x1784 con la ventana en 1440x892 puntos.
`-o` deja afuera la sombra, no la ventana: los semáforos quedan, y eso es a
propósito. Son la ventana real y dicen «app de escritorio» mejor que un marco
dibujado, así que `AppShot` no dibuja uno propio.

Nombres de archivo, que son los que el sitio busca:

| pantalla      | archivo                              |
| ------------- | ------------------------------------ |
| Estadísticas › Análisis | `estadisticas-light.png` / `-dark` |
| Transacciones | `transacciones-light.png` / `-dark`  |
| Estadísticas › Resumen | `resumen-light.png` / `-dark`      |
| Compromisos   | `compromisos-light.png` / `-dark`    |
| Ahorros       | `ahorros-light.png` / `-dark`        |

La del hero es la pestaña **Análisis** de Estadísticas, que es donde están los
gráficos; `resumen-*.png` es la pestaña **Resumen** de la misma pantalla.

Hacen falta las dos versiones de cada una: el sitio sigue el tema del visitante,
y una captura clara sobre una página oscura se lee como un error. El tema de la
app arranca en «system», así que se cambia desde Ajustes o cambiando la
apariencia de macOS.

## Regenerar los datos

`data.mjs` tiene el perfil (sueldos, alquiler, categorías, comercios) y
`seed.mjs` arma los movimientos a partir de él. La variación es determinista:
la misma semilla da la misma base, así que una captura se puede repetir más
adelante y coincidir con las que ya están.

`seed.mjs` siembra una base **que la app ya creó**. Armar el esquema por fuera
funciona, pero deja vacía la tabla de control de sqlx: en el arranque siguiente
sqlx reintenta la primera migración sobre tablas que ya existen, aborta, y la
app abre con todos los números en cero. Por eso `demo-on.sh` abre Vault una vez
antes de sembrar.
