import { TAU, rad } from '@thewhodidthis/arithmetics'
import point from 'poltocar'

// https://en.wikipedia.org/wiki/Regular_polygon
export const poly = (radius = 0, sides = 3) => {
  // Theta increment, compute once
  const d = TAU / sides

  return Array.from({ length: sides }).map((v, i) => point(d * i, radius))
}

// https://en.wikipedia.org/wiki/Archimedean_spiral
export const coil = (radius = 0, turns = 1, phase = 1, c = 1) => {
  // Decides type of spiral (eg. with Fermat's,  c = 2)
  const k = 1 / c

  // Compute distance between turns
  const d = radius / (TAU * turns)

  return Array.from({ length: 360 * turns }).map((v, i) => {
    const angle = rad(i)
    const reach = phase + (d * Math.pow(angle, k))

    return point(angle, reach)
  })
}

// https://en.wikipedia.org/wiki/Rose_(mathematics)
export const rose = (radius = 0, a = 2, b = 3, offset = 0) => {
  // Decides number of lobes
  const k = a / b

  // For calculating how many iterations produce a closed curve, assuming k is rational
  const c = 2 - ((b * a) % 2)

  return Array.from({ length: 180 * c * b }).map((v, i) => {
    const angle = rad(i)
    const reach = radius * Math.cos(k * angle)

    return point(angle, reach + offset)
  })
}

// https://en.wikipedia.org/wiki/Superformula
export const foxy = (radius = 0, m1 = 0, n1, n2, n3, a = 1, b = a, m2 = m1) => {
  const { cos, pow, abs } = Math

  const input = [a, b, m1, m2, n2, n3]
  const shift = TAU * 0.25

  const score = (phi, t1 = 0, id = 0) => {
    const [k, m, n] = input.filter((v, i) => ((i + id) % 2 ? 0 : v))

    let q = m * phi * 0.25

    // Turn cos into sin
    q += id ? shift : 0

    let t2 = cos(q) / k

    t2 = abs(t2)
    t2 = pow(t2, n)

    if (id === 1) {
      return t1 + t2
    }

    return score(phi, t2, id + 1)
  }

  return Array.from({ length: 360 }).map((v, i) => {
    const angle = rad(i)
    const t = score(angle)
    const reach = pow(t, 1 / n1)

    return abs(reach) ? point(angle, radius / reach) : { x: 0, y: 0 }
  })
}
