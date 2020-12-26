import sys

def neighbors(i, j, grid):
    nhbrs = []
    R, C = len(grid), len(grid[0])
    for di in [-1, 0, 1]:
        for dj in [-1, 0, 1]:
            if i+di < R and i+di >= 0 and j+dj < C and j+dj >= 0:
                nhbrs.append(grid[i+di][j+dj])
    return nhbrs

with sys.stdin as f:
    grid = map(lambda line: list(line.strip()), f.readlines())
R, C = len(grid), len(grid[0])

changes = 1
curr_grid = grid
while changes != 0:
    changes = 0
    prev_grid = curr_grid
    curr_grid = [[prev_grid[i][j] for j in range(C)] for i in range(R)]
    for i in range(R):
        for j in range(C):
            nhbrs = neighbors(i, j, prev_grid)
            if prev_grid[i][j] == 'L' and len([nhbr for nhbr in nhbrs if nhbr=='#']) == 0:
                curr_grid[i][j] = '#'
                changes += 1
            if prev_grid[i][j] == '#' and len([nhbr for nhbr in nhbrs if nhbr=='#']) >= 5:
                curr_grid[i][j] = 'L'
                changes += 1

print(len([seat for row in curr_grid for seat in row if seat == '#']))
