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

const getValleys = (heightMap: HeightMap): Elevation[] => {
  const valleys = []
  for (let row = 0; row < heightMap.length; row += 1) {
    for (let col = 0; col < heightMap[row].length; col += 1) {
      const elevation = heightMap[row][col]
      if (elevation < getHeight(heightMap, row + 1, col)
        && elevation < getHeight(heightMap, row - 1, col)
        && elevation < getHeight(heightMap, row, col + 1)
        && elevation < getHeight(heightMap, row, col - 1)) {
        valleys.push(elevation)
      }
    }
  }
  return valleys
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const heightMap = parseData(data)
  const valleys = getValleys(heightMap)
  console.log(valleys.reduce((acc, elevation) => acc + elevation + 1, 0))
})
