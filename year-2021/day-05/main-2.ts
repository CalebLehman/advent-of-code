import * as fs from 'fs'

interface Line {
  x1: number
  x2: number
  y1: number
  y2: number
}

const parseData = (data: string): Line[] => {
  const regex = /\d+/g
  return data.trim().split('\n').map(line => {
    const numbers = line.match(regex).map(n => parseInt(n, 10))
    return {
      x1: numbers[0],
      y1: numbers[1],
      x2: numbers[2],
      y2: numbers[3],
    }
  })
}

const countDanger = (lines: Line[]): number => {
  let xMin = +Infinity
  let xMax = -Infinity
  let yMin = +Infinity
  let yMax = -Infinity
  lines.forEach(line => {
    xMin = Math.min(xMin, line.x1, line.x2)
    xMax = Math.max(xMax, line.x1, line.x2)
    yMin = Math.min(yMin, line.y1, line.y2)
    yMax = Math.max(yMax, line.y1, line.y2)
  })

  const hits = []
  for (let y = 0; y < yMax - yMin + 1; y += 1) {
    hits.push(Array(xMax - xMin + 1).fill(0))
  }

  lines.forEach(line => {
    if (line.x1 === line.x2) {
      for (let y = 0; y < Math.abs(line.y1 - line.y2) + 1; y += 1) {
        hits[y + Math.min(line.y1, line.y2) - yMin][line.x1 - xMin] += 1
      }
    } else if (line.y1 === line.y2) {
      for (let x = 0; x < Math.abs(line.x1 - line.x2) + 1; x += 1) {
        hits[line.y1 - yMin][x + Math.min(line.x1, line.x2) - xMin] += 1
      }
    } else if ((line.y1 - line.y2) * (line.x1 - line.x2) > 0) {
      for (let y = 0; y < Math.abs(line.y1 - line.y2) + 1; y += 1) {
        hits[y + Math.min(line.y1, line.y2) - yMin][y + Math.min(line.x1, line.x2) - xMin] += 1
      }
    } else {
      for (let y = 0; y < Math.abs(line.y1 - line.y2) + 1; y += 1) {
        hits[y + Math.min(line.y1, line.y2) - yMin][Math.max(line.x1, line.x2) - y - xMin] += 1
      }
    }
  })

  return hits
    .map(row => row.filter(count => count > 1).length)
    .reduce((acc, line) => acc + line, 0)

}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  console.log(countDanger(parseData(data)))
})
