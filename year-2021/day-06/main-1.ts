import * as fs from 'fs'

const parseData = (data: string): number[] => {
  return data.trim().split(',').map(s => parseInt(s, 10))
}

const computeLineage = (
  daysUntilSpawn: number[],
  days: number,
  adultRespawn: number,
  childRespawn: number,
): number => {
  if (days < 0) return NaN

  const dp = Array(days + 1).fill(0)
  const helper = (daysUntilSpawn: number, days: number): number => {
    if (days <= 0) return 1
    if (daysUntilSpawn > 0) return helper(0, days - daysUntilSpawn)

    if (dp[days] === 0) dp[days] = helper(childRespawn, days - 1) + helper(adultRespawn, days - 1)
    return dp[days]
  }

  return daysUntilSpawn.reduce((acc, fish) => acc + helper(fish, days), 0)
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const fish = parseData(data)

  const days = 80
  const adultRespawn = 6
  const childRespawn = 8
  console.log(computeLineage(
    fish,
    days,
    adultRespawn,
    childRespawn
  ))
})
