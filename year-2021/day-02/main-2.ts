import * as fs from "fs"

interface State {
  horizontal: number
  depth: number
  aim: number
}

const evalState = (state: State): number => {
  return state.horizontal * state.depth
}

interface Action {
  direction: string
  count: number
}

const doAction = (state: State, action: Action): State => {
  switch (action.direction) {
    case "forward":
      state.horizontal += action.count
      state.depth += state.aim * action.count
      break;
    case "down":
      state.aim += action.count
      break;
    case "up":
      state.aim -= action.count
      break;
    default:
      state.horizontal = NaN
      state.depth = NaN
      state.aim = NaN
  }

  return state
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
  const finalPosition = actions.reduce(doAction, { horizontal: 0, depth: 0, aim: 0 })
  console.log(evalState(finalPosition))
})
