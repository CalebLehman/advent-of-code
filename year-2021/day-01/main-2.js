import fs from 'fs'

const parseData = (data) => {
  return data.trim().split("\n").map(v => parseInt(v))
}

const countIncreases = (heights) => {
  let increases = 0
  for (let i = 3; i < heights.length; i += 1) {
    if (heights[i] > heights[i - 3])
      increases += 1
  }
  return increases
}

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const parsedData = parseData(data)
  console.log(countIncreases(parsedData))
})
