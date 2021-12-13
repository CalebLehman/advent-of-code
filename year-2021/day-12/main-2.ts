import * as fs from 'fs'

type Path = string
type Cave = string
type Map = Record<Cave, Cave[]>

const parseData = (data: string): Map => {
  const map = {}
  data.trim().split('\n').forEach(line => {
    const [a, b] = line.trim().split('-').slice(0, 2)
    map[a] = map[a] ?? []
    map[a].push(b)
    map[b] = map[b] ?? []
    map[b].push(a)
  })
  return map
}

const isBig = (cave: Cave): boolean => {
  return cave === cave.toUpperCase()
}

const canVisit = (cave: Cave, path: Path): boolean => {
  if (cave === 'start') return false
  if (isBig(cave)) return true
  if (!path.includes(cave)) return true

  const smallCaves = path.split(',').filter(cave => !isBig(cave))
  return smallCaves.length === (new Set(smallCaves)).size
}

const countPaths = (map: Map): number => {
  const countPathsHelper = (path: Path, map: Map): number => {
    const cave = path.split(',').at(-1)
    if (cave === 'end') {
      return 1
    } else {
      return map[cave].reduce((acc, neighbor) => {
        if (canVisit(neighbor, path)) return acc + countPathsHelper(path + ',' + neighbor, map)
        else return acc
      }, 0)
    }
  }

  return countPathsHelper('start', map)
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const map = parseData(data)
  console.log(countPaths(map))
})
