import * as fs from 'fs'

const parseData = (data: string): number[] => {
  return data.trim().split('\n').map(line => parseInt(line.split(':')[1], 10))
}

const computeWins = (positions: number[], scores: number[], goal: number): number[] => {
  const combinations = { 3: 1, 4: 3, 5: 6, 6: 7, 7: 6, 8: 3, 9: 1, }
  const memo = {}
  const computeWinsHelper = (positions: number[], scores: number[], goal: number): number[] => {
    const key = positions.join(',') + ',' + scores.join(',')
    if (key in memo) return memo[key]

    const wins = Array(scores.length).fill(0)
    if (scores[scores.length - 1] >= goal) {
      wins[wins.length - 1] = 1
    } else {
      const position = positions.shift()
      const score = scores.shift()
      for (let die = 3; die <= 9; die += 1) {
        const quantumPosition = 1 + (position - 1 + die) % 10
        const quantumScore = score + quantumPosition
        positions.push(quantumPosition)
        scores.push(quantumScore)

        computeWinsHelper(positions, scores, goal).forEach((win, idx) => wins[(idx + 1) % wins.length] += win * combinations[die])

        positions.pop()
        scores.pop()
      }
      positions.unshift(position)
      scores.unshift(score)
    }
    memo[key] = wins
    return wins
  }

  return computeWinsHelper(positions, scores, goal)
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const positions = parseData(data)
  const scores = Array(positions.length).fill(0)
  const goal = 21

  const wins = computeWins(positions, scores, goal)
  console.log(wins.reduce((acc, win) => Math.max(acc, win)))
})
