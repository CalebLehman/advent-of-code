import * as fs from 'fs'

type Point = string
type Fold = string

const parseData = (data: string): [Point[], Fold[]] => {
  const lines = data.trim().split('\n')
  const points = lines.filter(line => !(line.startsWith('fold along') || line === ''))
  const folds = lines.filter(line => line.startsWith('fold along'))
  return [points, folds]
}

const applyFold = (points: Point[], fold: Fold): Point[] => {
  const [axis, value] = fold.split('=').slice(0, 2)
  const foldX = axis.endsWith('x') ? parseInt(value, 10) : Infinity
  const foldY = axis.endsWith('y') ? parseInt(value, 10) : Infinity
  return points.map(point => {
    const [x, y] = point.split(',').map(v => parseInt(v, 10)).slice(0, 2)
    return [
      2 * Math.min(x, foldX) - x,
      2 * Math.min(y, foldY) - y
    ].join(',')
  })
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const [points, folds] = parseData(data)
  const folded = folds.slice(0, 1).reduce((acc, fold) => applyFold(acc, fold), points)
  console.log((new Set(folded)).size)
})
