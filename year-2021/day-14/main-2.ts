import * as fs from 'fs'

type Rules = Record<string, string>
type Template = string

const parseData = (data: string): [Template, Rules] => {
  const lines = data.trim().split('\n')
  const initial = lines[0]
  const rules = {}
  lines.slice(2).forEach(line => {
    const [key, val] = line.split(' -> ').slice(0, 2)
    rules[key] = val
  })
  return [initial, rules]
}

const getFrequencies = (template: Template, rules: Rules, iterations: number): Record<Template, number> => {
  const flag: Record<Template, boolean[]> = {}
  const memo: Record<Template, Record<Template, number>[]> = {}
  for (const pair in rules) {
    memo[pair] = []
    for (let i = 0; i <= iterations; i += 1) memo[pair].push({})
    flag[pair] = Array(iterations + 1).fill(false)
    flag[pair][0] = true
  }

  const getInnerFrequencies = (pair: Template, rules: Rules, iterations: number): Record<Template, number> => {
    if (!(pair in rules)) return {}
    if (flag[pair][iterations]) return memo[pair][iterations]

    const middle = rules[pair]
    const leftInnerFrequencies = getInnerFrequencies(pair[0] + middle, rules, iterations - 1)
    const rightInnerFrequencies = getInnerFrequencies(middle + pair[1], rules, iterations - 1)
    const totalInnerFrequencies = memo[pair][iterations]
    for (const symbol in leftInnerFrequencies) {
      totalInnerFrequencies[symbol] = leftInnerFrequencies[symbol]
    }
    for (const symbol in rightInnerFrequencies) {
      if (!(symbol in totalInnerFrequencies)) totalInnerFrequencies[symbol] = 0
      totalInnerFrequencies[symbol] += rightInnerFrequencies[symbol]
    }
    if (!(middle in totalInnerFrequencies)) totalInnerFrequencies[middle] = 0
    totalInnerFrequencies[middle] += 1

    flag[pair][iterations] = true
    return totalInnerFrequencies
  }

  const frequencies = {}
  frequencies[template[0]] = 1
  for (let i = 1; i < template.length; i += 1) {
    const pair = template.slice(i - 1, i + 1)
    const innerFrequencies = getInnerFrequencies(pair, rules, iterations)
    for (const symbol in innerFrequencies) {
      if (!(symbol in frequencies)) frequencies[symbol] = 0
      frequencies[symbol] += innerFrequencies[symbol]
    }
    if (!(pair[1] in frequencies)) frequencies[pair[1]] = 0
    frequencies[pair[1]] += 1
  }
  return frequencies
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const [template, rules] = parseData(data)
  const iterations = 40
  const frequencies = getFrequencies(template, rules, iterations)

  let max = -Infinity
  let min = Infinity
  for (const symbol in frequencies) {
    max = Math.max(frequencies[symbol], max)
    min = Math.min(frequencies[symbol], min)
  }
  console.log(max - min)
})
