interface TimerPromise extends Promise<void> {
  cancel: () => void
}

export function timer(duration: number, tick: (time: number) => void): TimerPromise {
  let frameId: number = requestAnimationFrame(frame)
  let startTime: number = performance.now()
  let resolve: () => void

  function frame(time: number) {
    time = (time - startTime) / duration

    try {
      tick(Math.max(0, Math.min(1, time)))
    } catch (error) {
      console.error(error)
    }

    if (time < 1) {
      frameId = requestAnimationFrame(frame)
    } else {
      resolve()
    }
  }

  const promise = new Promise<void>((res) => resolve = res) as TimerPromise
  promise.cancel = () => cancelAnimationFrame(frameId)

  return promise
}

type EasingFunction = (startValue: number, endValue: number, time: number) => number
interface CurriedEasingFunction {
  (startValue: number, endValue: number, time: number): number
  (startValue: number, endValue: number): (time: number) => number
  (startValue: number): (endValue: number, time: number) => number
}

function curry(fn: EasingFunction): CurriedEasingFunction {
  return function ease(startValue: number, endValue?: number, time?: number): any {
    if (typeof endValue === 'undefined') return fn.bind(null, startValue)
    if (typeof time === 'undefined') return fn.bind(null, startValue, endValue)
    return fn(startValue, endValue, time)
  }
}

export const quadIn = curry(
  function quadIn(startValue, endValue, time) {
    return (endValue - startValue) * time * time + startValue
  }
)

export const quadOut = curry(
  function quadOut(startValue, endValue, time) {
    return -(endValue - startValue) * time * (time - 2) + startValue
  }
)

export const quadInOut = curry(
  function quadInOut(startValue, endValue, time) {
    if ((time *= 2) < 1) return (endValue - startValue) / 2 * time * time + startValue
    return -(endValue - startValue) / 2 * ((--time) * (time - 2) - 1) + startValue
  }
)

export const cubicIn = curry(
  function cubicIn(startValue, endValue, time) {
    return (endValue - startValue) * time ** 3 + startValue
  }
)

export const cubicOut = curry(
  function cubicOut(startValue, endValue, time) {
    return (endValue - startValue) * ((time -= 1) * time * time + 1) + startValue
  }
)

export const cubicInOut = curry(
  function cubicInOut(startValue, endValue, time) {
    if ((time *= 2) < 1) return (endValue - startValue) / 2 * time ** 3 + startValue
    return (endValue - startValue) / 2 * ((time -= 2) * time * time + 2) + startValue
  }
)

export const quartIn = curry(
  function quartIn(startValue, endValue, time) {
    return (endValue - startValue) * time ** 4 + startValue
  }
)

export const quartOut = curry(
  function quartOut(startValue, endValue, time) {
    return -(endValue - startValue) * ((time -= 1) * time ** 3 - 1) + startValue
  }
)

export const quartInOut = curry(
  function quartInOut(startValue, endValue, time) {
    if ((time *= 2) < 1) return (endValue - startValue) / 2 * time ** 4 + startValue
    return -(endValue - startValue) / 2 * ((time -= 2) * time ** 3 - 2) + startValue
  }
)

export const quintIn = curry(
  function quintIn(startValue, endValue, time) {
    return (endValue - startValue) * time ** 5 + startValue
  }
)

export const quintOut = curry(
  function quintOut(startValue, endValue, time) {
    return (endValue - startValue) * ((time -= 1) * time ** 4 + 1) + startValue
  }
)

export const quintInOut = curry(
  function quintInOut(startValue, endValue, time) {
    if ((time *= 2) < 1) return (endValue - startValue) / 2 * time ** 5 + startValue
    return (endValue - startValue) / 2 * ((time -= 2) * time ** 4 + 2) + startValue
  }
)

export const sineIn = curry(
  function sineIn(startValue, endValue, time) {
    return -(endValue - startValue) * Math.cos(time * (Math.PI / 2)) + (endValue - startValue) + startValue
  }
)

export const sineOut = curry(
  function sineOut(startValue, endValue, time) {
    return (endValue - startValue) * Math.sin(time * (Math.PI / 2)) + startValue
  }
)

export const sineInOut = curry(
  function sineInOut(startValue, endValue, time) {
    return -(endValue - startValue) / 2 * (Math.cos(Math.PI * time) - 1) + startValue
  }
)

export const expoIn = curry(
  function expoIn(startValue, endValue, time) {
    if (time == 0) return startValue
    return (endValue - startValue) * Math.pow(2, 10 * (time - 1)) + startValue
  }
)

export const expoOut = curry(
  function expoOut(startValue, endValue, time) {
    if (time == 1) return endValue
    return (endValue - startValue) * (-Math.pow(2, -10 * time) + 1) + startValue
  }
)

export const expoInOut = curry(
  function expoInOut(startValue, endValue, time) {
    if (time == 0) return startValue
    if (time == 1) return endValue
    if ((time *= 2) < 1) return (endValue - startValue) / 2 * Math.pow(2, 10 * (time - 1)) + startValue
    return (endValue - startValue) / 2 * (-Math.pow(2, -10 * --time) + 2) + startValue
  }
)

export const circIn = curry(
  function circIn(startValue, endValue, time) {
    return -(endValue - startValue) * (Math.sqrt(1 - time ** 2) - 1) + startValue
  }
)

export const circOut = curry(
  function circOut(startValue, endValue, time) {
    return (endValue - startValue) * Math.sqrt(1 - (time -= 1) * time) + startValue
  }
)

export const circInOut = curry(
  function circInOut(startValue, endValue, time) {
    if ((time *= 2) < 1) return -(endValue - startValue) / 2 * (Math.sqrt(1 - time ** 2) - 1) + startValue
    return (endValue - startValue) / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + startValue
  }
)
