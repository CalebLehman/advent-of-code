import * as fs from 'fs'

type Opener = '(' | '[' | '{' | '<'
type Closer = ')' | ']' | '}' | '>'
type Chunks = (Opener | Closer)[]
type Completion = Closer[]

const isOpener = (delimiter: Opener | Closer): delimiter is Opener => {
  return ['(', '[', '{', '<'].includes(delimiter)
}

const getMatch = (opener: Opener): Closer => {
  switch (opener) {
    case '(':
      return ')'
    case '[':
      return ']'
    case '{':
      return '}'
    case '<':
      return '>'
  }
}

const isMatch = (opener: Opener, closer: Closer): boolean => {
  return getMatch(opener) === closer
}

const getCompletionString = (chunks: Chunks): Completion | null => {
  const stack: Opener[] = []
  for (let i = 0; i < chunks.length; i += 1) {
    const delimiter = chunks[i]
    if (isOpener(delimiter)) {
      stack.push(delimiter)
    } else {
      const opener = stack.pop()
      if (!isMatch(opener, delimiter)) {
        return null
      }
    }
  }
  return stack.reverse().map(getMatch)
}

const scoreCloser = (closer: Closer): number => {
  switch (closer) {
    case ')':
      return 1
    case ']':
      return 2
    case '}':
      return 3
    case '>':
      return 4
  }
}

const scoreCompletions = (completions: Completion[]): number => {
  const scores = completions.map(completion => {
    return completion.reduce((acc, closer) => acc * 5 + scoreCloser(closer), 0)
  })
  return scores.sort((a, b) => a - b)[(scores.length - 1) / 2]
}

const parseData = (data: string): Chunks[] => {
  return data.trim().split('\n').map(line => line.split('') as Chunks)
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  }

  const parsedData = parseData(data)
  const completions = parsedData.map(getCompletionString).filter(closer => closer !== null)
  console.log(scoreCompletions(completions))
})
