import * as fs from 'fs'

const parseData = (data: string): number[] => {
  return data.trim().split(',').map(s => parseInt(s, 10))
}

const computeCost = (positions: number[], target: number): number => {
  return positions.reduce((acc, position) => {
    const delta = Math.abs(target - position)
    return acc + delta * (delta + 1) / 2
  }, 0)
}

const computeMinCost = (positions: number[]): number => {
  let minCost = Infinity
  const lo = Math.min(...positions)
  const hi = Math.max(...positions)
  for (let target = lo; target <= hi; target += 1) {
    minCost = Math.min(minCost, computeCost(positions, target))
  }
  return minCost
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const positions = parseData(data)
  console.log(computeMinCost(positions))
})
