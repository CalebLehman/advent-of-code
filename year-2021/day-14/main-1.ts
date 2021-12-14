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

const applyRules = (template: Template, rules: Rules): Template => {
  if (template.length === 0) return ''

  const result = [template[0]]
  for (let i = 1; i < template.length; i++) {
    const key = template.slice(i - 1, i + 1)
    if (key in rules) {
      result.push(rules[key])
    }
    result.push(key[1])
  }
  return result.join('')
}

const countFrequency = (template: Template): [string, number][] => {
  const counts = {}
  template.split('').forEach(symbol => counts[symbol] = (counts[symbol] ?? 0) + 1)
  const frequencies = []
  for (const symbol in counts) {
    frequencies.push([
      symbol,
      counts[symbol]
    ])
  }
  return frequencies
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const [template, rules] = parseData(data)
  let final = template
  for (let i = 0; i < 10; i += 1) {
    final = applyRules(final, rules)
  }

  const frequencies = countFrequency(final)
  const max = Math.max(...frequencies.map(freq => freq[1]))
  const min = Math.min(...frequencies.map(freq => freq[1]))
  console.log(max - min)
})
