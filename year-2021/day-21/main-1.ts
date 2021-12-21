import * as fs from 'fs'

const parseData = (data: string): number[] => {
  return data.trim().split('\n').map(line => parseInt(line.split(':')[1], 10))
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const positions = parseData(data)
  const scores = Array(positions.length).fill(0)

  let dieNext = 1
  let dieRolls = 0
  const goal = 1000
  while (scores.reduce((acc, score) => Math.max(acc, score)) < goal) {
    const position = 1 + (positions.shift() - 1 + 3 * dieNext + 3) % 10
    const score = scores.shift() + position
    positions.push(position)
    scores.push(score)
    dieNext = 1 + (dieNext - 1 + 3) % 100
    dieRolls += 3
  }

  const losingScore = scores.reduce((acc, score) => Math.min(acc, score))
  console.log(losingScore * dieRolls)
})
