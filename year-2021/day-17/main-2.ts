// Note: Makes some assumptions about the target range being below the horizontal
import * as fs from "fs"

interface Range {
  lo: number
  hi: number
}

const parseRange = (s: string) => {
  const [lo, hi] = s.split('..').slice(0, 2)
  return {
    lo: parseInt(lo, 10),
    hi: parseInt(hi, 10),
  }
}

const parseData = (data: string): [Range, Range] => {
  const xRange = parseRange(data.slice(15).split(',')[0])
  const yRange = parseRange(data.split(',')[1].slice(3))
  return [xRange, yRange]
}

const computeHorizontalPosition = (initialVelocity: number, step: number): number => {
  if (initialVelocity < 0) return -1 * computeHorizontalPosition(-1 * initialVelocity, step)
  step = Math.min(step, initialVelocity)
  return initialVelocity * step - step * (step - 1) / 2
}

const countValidShots = (xRange: Range, yRange: Range): number => {
  let count = 0
  for (let ySpeed = yRange.lo; ySpeed <= xRange.hi; ySpeed += 1) {
    const minStep = Math.ceil((2 * ySpeed + 1 + Math.sqrt((2 * ySpeed + 1) * (2 * ySpeed + 1) - 8 * yRange.hi)) / 2)
    const maxStep = Math.floor((2 * ySpeed + 1 + Math.sqrt((2 * ySpeed + 1) * (2 * ySpeed + 1) - 8 * yRange.lo)) / 2)
    for (let xSpeed = Math.ceil((-1 + Math.sqrt(1 + 8 * xRange.lo)) / 2); xSpeed <= xRange.hi; xSpeed += 1) {
      for (let step = minStep; step <= maxStep; step += 1) {
        const x = computeHorizontalPosition(xSpeed, step)
        if ((x >= xRange.lo) && (x <= xRange.hi)) {
          count += 1
          break
        }
      }
    }
  }
  return count
}

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err)
  }

  const [xRange, yRange] = parseData(data)
  const shots = countValidShots(xRange, yRange)
  console.log(shots)
})
