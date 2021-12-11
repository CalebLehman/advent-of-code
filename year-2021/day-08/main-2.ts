import * as fs from 'fs'

type Display = string

interface PanelEvidence {
  patterns: Display[]
  outputs: Display[]
}

interface SymbolDecoder {
  a: string | null
  b: string | null
  c: string | null
  d: string | null
  e: string | null
  f: string | null
  g: string | null
}

const parseData = (data: string): PanelEvidence[] => {
  return data.trim().split('\n').map(line => {
    const patterns = line.split(' | ')[0].split(' ')
    const outputs = line.split(' | ')[1].split(' ')
    return {
      patterns,
      outputs,
    }
  })
}

const computeDecoder = (evidence: PanelEvidence): SymbolDecoder => {
  // get counts of each symbol
  const counts = {}
  evidence.patterns.forEach(pattern => {
    pattern.split('').forEach(symbol => {
      counts[symbol] = 1 + (symbol in counts ? counts[symbol] : 0)
    })
  })

  // the 'e', 'b', and 'f' wires appear a unique amount of times across all digits
  const decoder: SymbolDecoder = { a: null, b: null, c: null, d: null, e: null, f: null, g: null, }
  Object.keys(counts).forEach(symbol => {
    switch (counts[symbol]) {
      case 4:
        decoder[symbol] = 'e'
        break
      case 6:
        decoder[symbol] = 'b'
        break
      case 9:
        decoder[symbol] = 'f'
        break
      default:
    }
  })

  // 'c' occurrs in the digit with 2 segments (1), and is not something we have computed yet
  const cSymbol = evidence.patterns
    .filter(pattern => pattern.length === 2)[0]
    .split('')
    .filter(symbol => decoder[symbol] === null)[0]
  decoder[cSymbol] = 'c'

  // 'a' occurrs in the digit with 3 segments (7), and is not something we have computed yet
  const aSymbol = evidence.patterns
    .filter(pattern => pattern.length === 3)[0]
    .split('')
    .filter(symbol => decoder[symbol] === null)[0]
  decoder[aSymbol] = 'a'

  // 'd' occurrs in the digit with 4 segments (4), and is not something we have computed yet
  const dSymbol = evidence.patterns
    .filter(pattern => pattern.length === 4)[0]
    .split('')
    .filter(symbol => decoder[symbol] === null)[0]
  decoder[dSymbol] = 'd'

  // 'g' occurrs in the digit with 7 segments (8), and is not something we have computed yet
  const gSymbol = evidence.patterns
    .filter(pattern => pattern.length === 7)[0]
    .split('')
    .filter(symbol => decoder[symbol] === null)[0]
  decoder[gSymbol] = 'g'

  return decoder
}

const evaluateOuput = (evidence: PanelEvidence, decoder: SymbolDecoder): number => {
  let output = 0
  evidence.outputs.forEach(pattern => {
    switch (pattern.split('').map(symbol => decoder[symbol]).sort().join('')) {
      case 'abcefg':
        output = output * 10 + 0
        break
      case 'cf':
        output = output * 10 + 1
        break
      case 'acdeg':
        output = output * 10 + 2
        break
      case 'acdfg':
        output = output * 10 + 3
        break
      case 'bcdf':
        output = output * 10 + 4
        break
      case 'abdfg':
        output = output * 10 + 5
        break
      case 'abdefg':
        output = output * 10 + 6
        break
      case 'acf':
        output = output * 10 + 7
        break
      case 'abcdefg':
        output = output * 10 + 8
        break
      case 'abcdfg':
        output = output * 10 + 9
        break
      default:
        output = NaN
    }
  })

  return output
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const evidences = parseData(data)
  const total = evidences.reduce((acc, evidence) => {
    return acc + evaluateOuput(evidence, computeDecoder(evidence))
  }, 0)
  console.log(total)
})
