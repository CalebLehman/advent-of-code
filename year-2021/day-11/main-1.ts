import * as fs from 'fs'

class Grid {
  private static readonly MAX = 10
  constructor(private grid: number[][]) { }
  increment(i: number, j: number): number {
    if (i < 0 || i >= this.grid.length) return NaN
    if (j < 0 || j >= this.grid[i].length) return NaN
    this.grid[i][j] += 1
    return this.grid[i][j]
  }
  step(): number {
    const full = []
    for (let i = 0; i < this.grid.length; i += 1) {
      for (let j = 0; j < this.grid[i].length; j += 1) {
        if (this.increment(i, j) === Grid.MAX) {
          full.push({ row: i, col: j })
        }
      }
    }

    const clears = []
    let flashes = 0
    while (full.length > 0) {
      const { row: i, col: j } = full.pop()
      clears.push({ row: i, col: j })
      flashes += 1
      for (let iDelta = -1; iDelta <= 1; iDelta += 1) {
        for (let jDelta = -1; jDelta <= 1; jDelta += 1) {
          if (this.increment(i + iDelta, j + jDelta) === Grid.MAX) {
            full.push({ row: i + iDelta, col: j + jDelta })
          }
        }
      }
    }

    while (clears.length > 0) {
      const { row: i, col: j } = clears.pop()
      this.grid[i][j] = 0
    }

    return flashes
  }
}

const parseData = (data: string): Grid => {
  return new Grid(
    data.trim().split('\n').map(line => {
      return line.trim().split('').map(s => parseInt(s, 10))
    })
  )
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const grid = parseData(data)
  let flashes = 0
  for (let i = 0; i < 100; i += 1) {
    flashes += grid.step()
  }
  console.log(flashes)
})
