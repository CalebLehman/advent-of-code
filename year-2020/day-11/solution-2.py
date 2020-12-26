import sys

def neighbors(i, j, grid):
    nhbrs = []
    R, C = len(grid), len(grid[0])

    directions = [(-1,0), (-1,1), (0,1), (1,1), (1,0), (1,-1), (0,-1), (-1,-1)]
    for di, dj in directions:
        i_ = i + di
        j_ = j + dj
        while i_ < R and i_ >= 0 and j_ < C and j_ >= 0:
            if grid[i_][j_] != '.':
                nhbrs.append(grid[i_][j_])
                break
            i_ += di
            j_ += dj
    return nhbrs

with sys.stdin as f:
    grid = list(map(lambda line: list(line.strip()), f.readlines()))
R, C = len(grid), len(grid[0])

changed = True
curr_grid = grid
while changed:
    changed = False
    prev_grid = curr_grid
    curr_grid = [[prev_grid[i][j] for j in range(C)] for i in range(R)]
    for i in range(R):
        for j in range(C):
            nhbrs = neighbors(i, j, prev_grid)
            if prev_grid[i][j] == 'L' and len([nhbr for nhbr in nhbrs if nhbr=='#']) == 0:
                curr_grid[i][j] = '#'
                changed = True
            if prev_grid[i][j] == '#' and len([nhbr for nhbr in nhbrs if nhbr=='#']) >= 5:
                curr_grid[i][j] = 'L'
                changed = True

print(len([seat for row in curr_grid for seat in row if seat == '#']))
