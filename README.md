# Couple Weekly Challenge — Levels 1 to 3

Proyecto único mobile-first con flujo continuo:

```text
HOME
  ↓
LEVEL 01 — Catch the good
  ↓
LEVEL 02 — Do you know us?
  ↓
LEVEL 03 — Words I see in you
  ↓
PARTIAL SCORE
```

## Archivos

```text
couple_weekly_challenge_levels_1_to_3/
├── index.html
├── styles.css
├── app.js
├── README.md
└── assets/
```

## Nivel 1
Arcade táctil:
- objetos positivos y negativos
- combo
- objetos raros
- mensajes secretos
- score acumulable

## Nivel 2
Quiz:
- 5 preguntas
- 15 segundos por pregunta
- +500 por respuesta correcta
- hasta +300 por velocidad
- bonus por streak

## Nivel 3
Mini crossword/palabras:
- 5 palabras bonitas
- +700 por palabra
- +200 si no usa pista
- -100 al pedir pista
- -50 por intento incorrecto

Las palabras se editan en `app.js`, arreglo:

```js
const WORDS = [
  {
    word: "FUERTE",
    clue: "Pista...",
    hint: "Ayuda..."
  }
];
```

## Progreso

Se guarda en:

```js
localStorage.getItem("coupleChallenge.progress")
```

## GitHub Pages

Sube **el contenido de esta carpeta a la raíz del repositorio** y activa:

Settings → Pages → Deploy from a branch → `main` → `/root`


## Ajustes de esta versión

- Interfaz visible traducida al español.
- Nivel 3 con pistas principales más explícitas.
- Botón **Dame una pista** corregido.
- Cada palabra tiene dos pistas progresivas.
- La primera ayuda cambia el botón a **Otra pista**.
- Cada pista adicional descuenta 100 puntos.


## Nivel 4 — MATCH

- 6 decisiones de pareja.
- Respuestas ocultas de Sebastián: A, B, B, A, A, A.
- +600 puntos por MATCH.
- +250 puntos cuando piensan diferente.
- Indicador de sincronía.
- Corazones flotantes durante todo el nivel.
- Explosión de corazones en cada MATCH.
- Interfaz romántica integrada con el tema oscuro general.

## Nombre del jugador

El nombre se solicita al inicio y se guarda en:

```js
localStorage.getItem("coupleChallenge.playerName")
```

Si la persona vuelve a abrir el juego en el mismo navegador, el nombre se recupera automáticamente.


# VERSIÓN FINAL — NIVEL 5

El Nivel 5 es una caja fuerte con cuatro minijuegos.

Cada reto revela automáticamente un dígito y lo coloca en el marcador superior:
1. Encontrar el corazón → 2
2. Repetir una secuencia → 6
3. Encontrar parejas → 0
4. Atrapar la llave → 3

Código final: **2603 / 26-03**.

El juego explica al final que 26/03 fue el primer día en que él indicó dónde estaba el aula especial XI y esa interacción fue el primer contacto entre ambos.

La pantalla final muestra:
- nombre del jugador
- puntuación total
- puntuación de cada uno de los cinco niveles
- instrucción explícita de tomar un pantallazo
- premio: un masaje relajante para quien obtenga la puntuación más alta

El nombre y el resultado se guardan en localStorage.


## Nivel 3 rehecho

Se eliminó por completo la versión con scroll interno.

La nueva versión:
- vuelve al diseño fijo similar a la primera versión;
- nunca muestra introducción y juego al mismo tiempo;
- no usa scroll interno;
- teclado compacto de 9 columnas;
- botones siempre visibles;
- pistas temporales flotantes tipo toast;
- pistas, errores y aciertos no modifican el layout.


## Ventana flotante para pistas

Las pistas del Nivel 3 ahora se muestran en un modal:
- oscurece el juego sin cambiar el layout;
- muestra PISTA 1 / PISTA 2;
- permanece abierto hasta pulsar **Entendido**;
- también puede cerrarse tocando el fondo;
- errores y aciertos usan la misma ventana.
