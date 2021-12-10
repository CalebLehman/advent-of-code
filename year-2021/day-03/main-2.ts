import * as fs from 'fs'

type DiagnosticBit = 0 | 1
type DiagnosticValue = DiagnosticBit[]
type DiagnosticReport = DiagnosticValue[]

const invertDiagnosticBit = (bit: DiagnosticBit): DiagnosticBit => {
  return bit === 0 ? 1 : 0
}

const getConsensusBitAtIdx = (
  report: DiagnosticReport,
  idx: number,
  majority: boolean = true
): DiagnosticBit => {
  const majorityBit = report.reduce((count, value) => count + value[idx], 0) >= report.length / 2 ? 1 : 0
  return majority ? majorityBit : invertDiagnosticBit(majorityBit)
}

const filterReportByIdx = (
  report: DiagnosticReport,
  idx: number,
  majority: boolean = true
): DiagnosticReport => {
  if (report.length === 0) {
    return []
  }

  const consensusBit = getConsensusBitAtIdx(report, idx, majority)
  return report.filter(value => value[idx] === consensusBit)
}

const getGammaRate = (report: DiagnosticReport): number => {
  if (report.length === 0) {
    return 0
  }

  const n = report[0].length
  let gammaRate = 0;
  for (let idx = 0; idx < n; idx += 1) {
    gammaRate = gammaRate * 2 + getConsensusBitAtIdx(report, idx)
  }
  return gammaRate
}

const getEpsilonRate = (report: DiagnosticReport): number => {
  if (report.length === 0) {
    return 0
  }

  const n = report[0].length
  let epsilonRate = 0;
  for (let idx = 0; idx < n; idx += 1) {
    epsilonRate = epsilonRate * 2 + getConsensusBitAtIdx(report, idx, false)
  }
  return epsilonRate
}

const getOxygenGeneratorRating = (report: DiagnosticReport): number => {
  if (report.length === 0) {
    return 0
  }

  for (let idx = 0; report.length > 1; idx += 1) {
    report = filterReportByIdx(report, idx)
  }
  return parseInt(report[0].map(bit => bit.toString()).join(''), 2)
}

const getCO2ScrubberRating = (report: DiagnosticReport): number => {
  if (report.length === 0) {
    return 0
  }

  for (let idx = 0; report.length > 1; idx += 1) {
    report = filterReportByIdx(report, idx, false)
  }
  return parseInt(report[0].map(bit => bit.toString()).join(''), 2)
}

const processData = (data: string): DiagnosticReport => {
  return data.trim().split('\n').map(line => {
    return line.split('').map(character => character === '1' ? 1 : 0)
  })
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const report = processData(data)

  console.log(getOxygenGeneratorRating(report) * getCO2ScrubberRating(report))
})
