import * as fs from 'fs'

type Elevation = number
type HeightMap = Elevation[][]

const parseData = (data: string): HeightMap => {
  return data.trim().split('\n').map(line => {
    return line.split('').map(s => parseInt(s, 10))
  })
}

const getHeight = (heightMap: HeightMap, row: number, col: number): Elevation => {
  if ((row < 0) || (row >= heightMap.length)) return Infinity
  if ((col < 0) || (col >= heightMap[row].length)) return Infinity
  return heightMap[row][col]
}

const getBasins = (heightMap: HeightMap): number[] => {
  const basins = []
  for (let row = 0; row < heightMap.length; row += 1) {
    for (let col = 0; col < heightMap[row].length; col += 1) {
      let basin = 0
      const level = [{ r: row, c: col }]
      while (level.length > 0) {
        const { r, c } = level.pop()
        if (getHeight(heightMap, r, c) < 9) {
          heightMap[r][c] = 9
          basin += 1
          level.push(
            { r: r + 1, c: c },
            { r: r - 1, c: c },
            { r: r, c: c + 1 }, { r: r, c: c - 1 }
          )
        }
      }
      basins.push(basin)
    }
  }
  return basins
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const heightMap = parseData(data)
  const basins = getBasins(heightMap)
  const product = basins
    .sort((a, b) => a - b)
    .slice(basins.length - 3, basins.length)
    .reduce((acc, basin) => acc * basin, 1)
  console.log(product)
})
