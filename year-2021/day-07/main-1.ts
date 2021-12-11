import * as fs from 'fs'

const parseData = (data: string): number[] => {
  return data.trim().split(',').map(s => parseInt(s, 10))
}

const computeMedian = (nums: number[]): number => {
  const mid = Math.floor(nums.length / 2)
  const sorted = nums.sort((a, b) => a - b)
  if (sorted.length % 2 === 0) return Math.floor((sorted[mid - 1] + sorted[mid]) / 2)
  else return sorted[mid]
}

const computeCost = (positions: number[], target: number): number => {
  return positions.reduce((acc, position) => acc + Math.abs(target - position), 0)
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const positions = parseData(data)
  const median = computeMedian(positions)
  console.log(computeCost(positions, median))
})
