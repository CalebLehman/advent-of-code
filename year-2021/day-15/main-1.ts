import * as fs from 'fs'

interface Point {
  row: number
  col: number
}

const stringify = (point: Point): string => {
  return point.row + ',' + point.col
}

const parseData = (data: string): number[][] => {
  return data.trim().split('\n').map(line => {
    return line.split('').map(s => parseInt(s, 10))
  })
}

const minPath = (grid: number[][]): number => {
  const rows = grid.length
  const cols = grid[0].length

  const unvisited = {}
  const distance = {}
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const point = stringify({ row, col })
      distance[point.toString()] = Infinity
      unvisited[point.toString()] = true
    }
  }
  distance[stringify({ row: 0, col: 0 })] = 0

  while (unvisited[stringify({ row: rows - 1, col: cols - 1 })]) {

    let minPoint = ''
    let minDistance = Infinity
    for (const point in unvisited) {
      if (unvisited[point] && distance[point] < minDistance) {
        minPoint = point
        minDistance = distance[point]
      }
    }

    const row = parseInt(minPoint.split(',')[0], 10)
    const col = parseInt(minPoint.split(',')[1], 10)
    const neighbors = [
      { row: row - 1, col: col },
      { row: row + 1, col: col },
      { row: row, col: col - 1 },
      { row: row, col: col + 1 },
    ]
    neighbors.forEach(point => {
      const s = stringify(point)
      if (unvisited[s]) {
        distance[s] = Math.min(distance[s], distance[minPoint] + grid[point.row][point.col])
      }
    })

    unvisited[minPoint] = false
  }


  return distance[stringify({ row: rows - 1, col: cols - 1 })]
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const grid = parseData(data)
  console.log(minPath(grid))
})
