import fs from 'fs'

const parseData = (data) => {
  return data.trim().split("\n").map(v => parseInt(v))
}

const countIncreases = (heights) => {
  let prevHeight = Infinity
  let increases = 0
  heights.forEach(height => {
    if (height > prevHeight)
      increases += 1
    prevHeight = height
  })
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
