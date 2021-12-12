import * as fs from 'fs'

type Opener = '(' | '[' | '{' | '<'
type Closer = ')' | ']' | '}' | '>'
type Chunks = (Opener | Closer)[]

const isOpener = (delimiter: Opener | Closer): delimiter is Opener => {
  return ['(', '[', '{', '<'].includes(delimiter)
}

const isMatch = (opener: Opener, closer: Closer): boolean => {
  return (opener === '(' && closer === ')')
    || (opener === '[' && closer === ']')
    || (opener === '{' && closer === '}')
    || (opener === '<' && closer === '>')
}

const getFirstInvalidCloser = (chunks: Chunks): Closer | null => {
  const stack: Opener[] = []
  for (let i = 0; i < chunks.length; i += 1) {
    const delimiter = chunks[i]
    if (isOpener(delimiter)) {
      stack.push(delimiter)
    } else {
      const opener = stack.pop()
      if (!isMatch(opener, delimiter)) {
        return delimiter
      }
    }
  }
  return null
}

const scoreCloser = (closer: Closer): number => {
  switch (closer) {
    case ')':
      return 3
    case ']':
      return 57
    case '}':
      return 1197
    case '>':
      return 25137
  }
}

const parseData = (data: string): Chunks[] => {
  return data.trim().split('\n').map(line => line.split('') as Chunks)
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const parsedData = parseData(data)
  const invalidClosers = parsedData.map(getFirstInvalidCloser).filter(closer => closer !== null)
  console.log(invalidClosers.reduce((acc, closer) => acc + scoreCloser(closer), 0))
})
