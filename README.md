
# Easy Animations

A minimal JavaScript animation library with simple timers and Robert Penner's easing functions.

**Goals:**
- Easy way to do JavaScript animations
- Promise-based API for chaining
- Separate easing functions and timers
- Curried easing functions for clean, readable code

**Non-goals:**
- Change or interpret CSS values

With this library, you can animate anything: CSS values, numbers in the DOM,
scroll position, Canvas things, etc.

Zero dependencies! Weighing in at 3.9kb (1kb gziped).

## Installation

```bash
npm install @hot-page/easy
```

## Quick Start

```javascript
import { timer, cubicOut } from '@hot-page/easy'

const ease = cubicOut(0, 100)
timer(300, time => {
  el.style.opacity = ease(time)
}).then(() => console.log('Animation complete!'))
```

## API

### `timer(duration, tick)`

Creates an animation timer that runs for the specified duration.

**Parameters:**
- `duration` (number): Animation duration in milliseconds
- `tick` (function): Callback function called on each frame with normalized time (0-1)

**Returns:** Promise with `.cancel()` method

**Example:**
```javascript
const t = timer(1000, time => {
  console.log(time) // 0 to 1
})

await t // Wait for completion
```

### Timer Methods

#### `.cancel()`
Stop the animation immediately.

```javascript
const t = timer(300, time => console.log(time))
setTimeout(() => t.cancel(), 100)
```

#### `.then()`, `.finally()`
Standard Promise methods for handling completion.

```javascript
timer(300, time => animate(time))
  .then(() => console.log('Done!'))
  .finally(() => cleanup())
```

## Easing Functions

All easing functions are **curried** - you can partially apply them with start and end values, then use them with just a time value.

### Available Easings

- **Quad:** `quadIn`, `quadOut`, `quadInOut`
- **Cubic:** `cubicIn`, `cubicOut`, `cubicInOut`
- **Quart:** `quartIn`, `quartOut`, `quartInOut`
- **Quint:** `quintIn`, `quintOut`, `quintInOut`
- **Sine:** `sineIn`, `sineOut`, `sineInOut`
- **Expo:** `expoIn`, `expoOut`, `expoInOut`
- **Circ:** `circIn`, `circOut`, `circInOut`

### Easing Signature

```javascript
easing(startValue, endValue, time) → interpolated value
easing(startValue, endValue) → function(time)
easing(startValue) → function(endValue, time)
```

### Examples

**Direct usage:**
```javascript
import { quadOut } from '@hot-page/easy'

const value = quadOut(0, 100, 0.5) // 75
```

**Curried (recommended):**
```javascript
const ease = cubicOut(100, 300)
timer(300, time => {
  el.style.transform = `translateX(${ease(time)}px)`
})
```

**Multiple properties:**
```javascript
const x = cubicOut(0, 200)
const y = quadOut(0, 300)
const opacity = sineOut(0, 1)

timer(500, time => {
  el.style.transform = `translate(${x(time)}px, ${y(time)}px)`
  el.style.opacity = opacity(time)
})
```

## Chaining Animations

Use `async/await` or `.then()` to chain animations:

```javascript
async function slideAndFade(el) {
  const slideIn = cubicOut(100, 300)
  await timer(300, time => {
    el.style.transform = `translateX(${slideIn(time)}px)`
  })

  const fadeOut = quadOut(1, 0)
  await timer(200, time => {
    el.style.opacity = fadeOut(time)
  })
}
```

## Easing Types Explained

- **In**: Starts slow, accelerates toward the end
- **Out**: Starts fast, decelerates toward the end (most common for UI)
- **InOut**: Starts slow, accelerates in the middle, decelerates at the end

**Visual comparison at t=0.5:**
- `quadIn(0, 1, 0.5)` → 0.25 (still slow)
- `quadOut(0, 1, 0.5)` → 0.75 (already fast)
- `quadInOut(0, 1, 0.5)` → 0.5 (halfway)


## A Hot Page Project

This open-source project is built by the engineeers at [Hot Page](https://hot.page),
a tool for web design and development.

&nbsp;

<p align="center">
  <a href="https://hot.page" target="_blank">
    <img width="250" src="https://static.hot.page/logo.png">
  </a>
</p>

&nbsp;
