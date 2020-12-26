import sys

grid = []
with sys.stdin as f:
    for line in f:
        grid.append(list(line.strip()))

R, C = len(grid), len(grid[0])
dels_i, dels_j = [1,1,1,1,2], [1,3,5,7,1]

result = 1
for del_i, del_j in zip(dels_i, dels_j):
    i, j = 0, 0
    count = 0
    while i < R:
        if grid[i][j] == '#': count += 1
        i = i + del_i
        j = (j + del_j) % C
    result *= count
print(result)
