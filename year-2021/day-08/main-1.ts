import * as fs from 'fs'

type Display = string

interface PanelEvidence {
  patterns: Display[]
  outputs: Display[]
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

const numberOfSegments = [
  6, // 0 has 6 segments
  2, // 1 has 2 segments
  5, // 2 has 5 segments
  5, // 3 has 5 segments
  4, // 4 has 4 segments
  5, // 5 has 5 segments
  6, // 6 has 6 segments
  3, // 7 has 3 segments
  7, // 8 has 7 segments
  6, // 9 has 6 segments
]

const countOutputsWithUniqueSegments = (evidences: PanelEvidence[]): number => {
  return evidences.reduce((arr, evidence) => {
    return arr + evidence.outputs.filter(output => {
      return output.length === numberOfSegments[1]
        || output.length === numberOfSegments[4]
        || output.length === numberOfSegments[7]
        || output.length === numberOfSegments[8]
    }).length
  }, 0)
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const evidences = parseData(data)
  console.log(countOutputsWithUniqueSegments(evidences))
})
