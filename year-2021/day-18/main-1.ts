import * as fs from 'fs'

type Number = Pair | Plain

interface Plain {
  value: number
  parent: Pair | null
}

interface Pair {
  left: Number
  right: Number
  parent: Pair | null
}

const isPlain = (number: Number): number is Plain => {
  return 'value' in number
}

const parseNumber = (s: string): [Number, string] => {
  if (s[0] === '[') {
    let left: Number
    let right: Number

    s = s.slice(1)
      ;[left, s] = parseNumber(s)
    s = s.slice(1)
      ;[right, s] = parseNumber(s)
    s = s.slice(1)

    const number = {
      left: left,
      right: right,
      parent: null,
    }
    left.parent = number
    right.parent = number
    return [number, s]
  } else {
    const idx = s.search(/[^\d]/)
    if (idx === -1) {
      const number = {
        value: parseInt(s, 10),
        parent: null,
      }
      return [number, '']
    } else {
      const number = {
        value: parseInt(s.slice(0, idx), 10),
        parent: null,
      }
      return [number, s.slice(idx)]
    }
  }
}

const findExplodable = (number: Number): Number | null => {
  const findExplodableHelper = (number: Number, depth: number): Number | null => {
    if (isPlain(number)) return null
    if (depth >= 4 && isPlain(number.left) && isPlain(number.right)) return number

    const leftTarget = findExplodableHelper(number.left, depth + 1)
    if (leftTarget !== null) return leftTarget
    return findExplodableHelper(number.right, depth + 1)
  }

  return findExplodableHelper(number, 0)
}

const explode = (number: Number) => {
  const leftValue = ((number as Pair).left as Plain).value
  const rightValue = ((number as Pair).right as Plain).value

  let current = number
  while ((current.parent !== null) && (current.parent.left === current)) current = current.parent
  if (current.parent !== null) {
    current = current.parent.left
    while (!isPlain(current)) current = current.right
    current.value += leftValue
  }

  current = number
  while ((current.parent !== null) && (current.parent.right === current)) current = current.parent
  if (current.parent !== null) {
    current = current.parent.right
    while (!isPlain(current)) current = current.left
    current.value += rightValue
  }

  if (number.parent.right === number) number.parent.right = { value: 0, parent: number.parent }
  else number.parent.left = { value: 0, parent: number.parent }
}

const findSplittable = (number: Number): Number | null => {
  if (isPlain(number)) return number.value >= 10 ? number : null

  const leftTarget = findSplittable(number.left)
  if (leftTarget !== null) return leftTarget
  else return findSplittable(number.right)
}

const split = (number: Number) => {
  const value = (number as Plain).value

  const left = { value: Math.floor(value / 2), parent: null }
  const right = { value: Math.ceil(value / 2), parent: null }
  const split = {
    left: left,
    right: right,
    parent: number.parent
  }

  left.parent = split
  right.parent = split
  if (number.parent.right === number) number.parent.right = split
  else number.parent.left = split
}

const reduce = (number: Number): Number => {
  while (true) {
    const explodable = findExplodable(number)
    if (explodable !== null) {
      explode(explodable)
      continue
    }

    const splittable = findSplittable(number)
    if (splittable !== null) {
      split(splittable)
      continue
    }

    return number
  }
}

const add = (left: Number, right: Number): Number => {
  const parent = {
    left: left,
    right: right,
    parent: null,
  }
  left.parent = parent
  right.parent = parent
  return reduce(parent)
}

const computeMagnitude = (number: Number): number => {
  if (isPlain(number)) return number.value
  else return 3 * computeMagnitude(number.left) + 2 * computeMagnitude(number.right)
}

const parseData = (data: string): Number[] => {
  return data.trim().split('\n').map(line => parseNumber(line)[0])
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const numbers = parseData(data)
  const sum = numbers.slice(1).reduce((acc, number) => add(acc, number), numbers[0])
  console.log(computeMagnitude(sum))
})
