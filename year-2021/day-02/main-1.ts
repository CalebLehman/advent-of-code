import * as fs from "fs"

interface Position {
  horizontal: number
  depth: number
}

const evalPosition = (position: Position): number => {
  return position.horizontal * position.depth
}

interface Action {
  direction: string
  count: number
}

const doAction = (position: Position, action: Action): Position => {
  switch (action.direction) {
    case "forward":
      position.horizontal += action.count
      break;
    case "down":
      position.depth += action.count
      break;
    case "up":
      position.depth -= action.count
      break;
    default:
      position.horizontal = NaN
      position.depth = NaN
  }

  return position
}

const parseActions = (data: string): Action[] => {
  return data.trim().split("\n").map(line => {
    const pieces: string[] = line.split(" ")
    return {
      direction: pieces[0],
      count: parseInt(pieces[1], 10)
    }
  })
}

fs.readFile("input.txt", "utf8", (err, data: string) => {
  if (err) {
    console.error(err)
    return
  }

  const actions = parseActions(data)
  const finalPosition = actions.reduce(doAction, { horizontal: 0, depth: 0 })
  console.log(evalPosition(finalPosition))
})
