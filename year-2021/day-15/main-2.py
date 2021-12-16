# didn't feel like writing a heap in js
from heapq import heappush, heappop

def parseInput(file):
    grid = []
    with open(file, 'r') as handle:
        for line in handle:
            grid.append([int(c) for c in line.strip()])
    return grid

def expandGrid(grid):
    factor = 5
    rows = len(grid)
    cols = len(grid[0])

    bigGrid = []
    for row in range(factor * rows):
        bigGrid.append([0] * factor * cols)

    for row in range(rows):
        for col in range(cols):
            for i in range(factor):
                for j in range(factor):
                    bigGrid[row + i * rows][col + j * cols] = 1 + (grid[row][col] + i + j - 1) % 9

    return bigGrid

def minPath(grid):
    rows = len(grid)
    cols = len(grid[0])

    unvisited = set()
    distance = []
    for row in range(rows):
        distance.append([10 * (rows + cols)] * cols)
        for col in range(cols):
            unvisited.add((row, col))

    heap = [(0, 0, 0)]
    while (len(heap) > 0):
        d, row, col = heappop(heap)
        unvisited.remove((row, col))
        distance[row][col] = d

        neighbors = [
            (row - 1, col),
            (row + 1, col),
            (row, col - 1),
            (row, col + 1),
        ]
        for neighborRow, neighborCol in neighbors:
            if (neighborRow >= 0) and (neighborRow < rows) and (neighborCol >= 0) and (neighborCol < cols):
                neighborD = d + grid[neighborRow][neighborCol]
                if neighborD < distance[neighborRow][neighborCol]:
                    distance[neighborRow][neighborCol] = neighborD
                    heappush(heap, (neighborD, neighborRow, neighborCol))

    return distance[rows - 1][cols - 1]

if __name__ == '__main__':
    grid = parseInput('input.txt')
    bigGrid = expandGrid(grid)
    print(minPath(bigGrid))
