import { TAU, rad } from '@thewhodidthis/arithmetics'
import pol2car from 'poltocar'

// https://en.wikipedia.org/wiki/Regular_polygon
export const poly = (radius = 0, n = 3) => {
  const sector = TAU / n

  return Array.from({ length: n }).map((v, i) => pol2car(sector * i, radius))
}

// https://en.wikipedia.org/wiki/Archimedean_spiral
export const coil = (radius = 0, n = 0, a = 0, b = 1, c = 1) => {
  const l = Math.max(radius, 180) * n * 2
  const k = 1 / c

  return Array.from({ length: l }).map((v, i) => {
    const angle = rad(i)
    const reach = a + (b * Math.pow(angle, k))

    return pol2car(angle, reach)
  })
}

// https://en.wikipedia.org/wiki/Rose_(mathematics)
export const rose = (radius = 0, n = 2, d = 3, offset = 0) => {
  const l = Math.max(radius, 180) * d * 2
  const k = n / d

  return Array.from({ length: l }).map((v, i) => {
    const angle = rad(i)
    const reach = radius * Math.cos(k * angle)

    return pol2car(angle, reach + offset)
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

    return abs(reach) ? pol2car(angle, radius / reach) : { x: 0, y: 0 }
  })
}
