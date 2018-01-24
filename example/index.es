import { rose as lookup } from '../index.mjs'

const canvas = document.querySelector('canvas')
const target = canvas.getContext('2d')

target.strokeStyle = '#888'
target.lineWidth = 1.5

const step = { x: canvas.width / 4, y: canvas.height / 3 }
const cell = { x: step.x * 0.5, y: step.y * 0.5 }
const size = cell.y * 0.75

const grid = (v, i) => ({ x: i % 4, y: Math.floor(i / 4) })

Array.from({ length: 4 * 3 }).map(grid).forEach((v) => {
  const x = (v.x * step.x) + cell.x
  const y = (v.y * step.y) + cell.y

  const n = 5 + (2 * (v.y - 2))
  const g = v.x + 1
  const d = g === n ? 5 : g

  const points = lookup(size, n, d)
  const border = points.length * (n % 2 === d % 2 ? 0.5 : 1)

  target.save()
  target.translate(x, y)
  target.beginPath()

  points.slice(0, border).forEach((p) => {
    target.lineTo(p.x, p.y)
  })

  target.closePath()
  target.stroke()
  target.restore()
})
