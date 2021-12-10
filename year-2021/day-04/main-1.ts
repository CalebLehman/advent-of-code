import * as fs from 'fs'

type Board = number[][]
interface Game {
  numbers: number[]
  boards: Board[]
}

const hasBingo = (board: Board, numbers: number[]): boolean => {
  for (let i = 0; i < board.length; i += 1) {
    let bingo = true
    for (let j = 0; j < board[i].length; j += 1) {
      bingo = bingo && (numbers.includes(board[i][j]))
    }
    if (bingo) {
      return true
    }
  }

  for (let j = 0; j < board[0].length; j += 1) {
    let bingo = true
    for (let i = 0; i < board.length; i += 1) {
      bingo = bingo && (numbers.includes(board[i][j]))
    }
    if (bingo) {
      return true
    }
  }

  return false
}

const scoreBingo = (board: Board, numbers: number[]): number => {
  let score = 0
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if (!numbers.includes(board[i][j])) {
        score += board[i][j]
      }
    }
  }

  return score * numbers.at(-1)
}

const runGame = (game: Game): number => {
  for (let i = 0; i < game.numbers.length; i += 1) {
    const currentNumbers = game.numbers.slice(0, i + 1)
    for (let j = 0; j < game.boards.length; j += 1) {
      if (hasBingo(game.boards[j], currentNumbers)) {
        return scoreBingo(game.boards[j], currentNumbers)
      }
    }
  }
  return 0
}

const parseData = (data: string): Game => {
  const lines = data.trim().split('\n')

  const numbers = lines[0]
    .trim()
    .split(',')
    .map(s => parseInt(s, 10))

  const boards = []
  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i].trim()
    if (line === '') {
      boards.push([])
    } else {
      boards.at(-1).push(line.split(/[ ]+/).map(s => parseInt(s, 10)))
    }
  }

  return {
    numbers,
    boards,
  }
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const game = parseData(data)

  console.log(runGame(game))
})
