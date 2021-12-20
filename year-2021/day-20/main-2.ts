import * as fs from 'fs'

type Algorithm = string
interface Image {
  main: string[][]
  fill: string
}

const parseData = (data: string): [Algorithm, Image] => {
  const lines = data.trim().split('\n')
  const algorithm = lines[0]
  const image = {
    main: lines.slice(2).map(line => line.split('')),
    fill: '.',
  }
  return [algorithm, image]
}

const enhanceImage = (image: Image, algorithm: Algorithm): Image => {
  const rows = image.main.length
  const cols = image.main[0].length
  const getBit = (row: number, col: number): 0 | 1 => {
    if ((row < 0) || (row >= rows)) return image.fill === '#' ? 1 : 0
    if ((col < 0) || (col >= cols)) return image.fill === '#' ? 1 : 0
    return image.main[row][col] === '#' ? 1 : 0
  }

  const expansion = 2
  const enhancedImage = []
  for (let row = 0; row < rows + 2 * expansion; row += 1) {
    enhancedImage.push(Array(cols + 2 * expansion).fill(''))
  }

  for (let row = 0; row < rows + 2 * expansion; row += 1) {
    for (let col = 0; col < cols + 2 * expansion; col += 1) {
      let lookup = 0
      for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
          lookup = 2 * lookup + getBit(row + i - expansion, col + j - expansion)
        }
      }
      enhancedImage[row][col] = algorithm[lookup]
    }
  }

  return {
    main: enhancedImage,
    fill: image.fill === '#' ? algorithm[255] : algorithm[0]
  }
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  let algorithm: Algorithm, image: Image
  [algorithm, image] = parseData(data)

  const passes = 50
  for (let _ = 0; _ < passes; _ += 1) {
    image = enhanceImage(image, algorithm)
  }

  let lights = 0
  if (image.fill === '#') {
    lights = Infinity
  } else {
    lights = image.main
      .map(line => line.filter(s => s === '#').length)
      .reduce((acc, count) => acc + count, 0)
  }
  console.log(lights)
})
