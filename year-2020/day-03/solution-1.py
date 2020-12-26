import sys

grid = []
with sys.stdin as f:
    for line in f:
        grid.append(list(line.strip()))

R, C = len(grid), len(grid[0])
i, j = 0, 0
del_i, del_j = 1, 3

count = 0
while i < R:
    if grid[i][j] == '#': count += 1
    i = i + del_i
    j = (j + del_j) % C
print(count)
