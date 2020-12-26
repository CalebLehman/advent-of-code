import sys

def rotate(bearing, val):
    bearings = zip([1,0,-1,0], [0,1,0,-1])
    val = (val % 360) / 90
    return bearings[(bearings.index(bearing) + val) % 4]

def process(x, y, bearing, line):
    line = line.strip()
    op, val = line[0], int(line[1:])
    if op == 'N': return x, y + val, bearing
    if op == 'S': return x, y - val, bearing
    if op == 'E': return x + val, y, bearing
    if op == 'W': return x - val, y, bearing
    if op == 'L': return x, y, rotate(bearing, val)
    if op == 'R': return x, y, rotate(bearing, -val)
    if op == 'F': return x + val*bearing[0], y + val*bearing[1], bearing

x, y, bearing = 0, 0, (1, 0)
with sys.stdin as f:
    for line in f:
        x, y, bearing = process(x, y, bearing, line)
print(abs(x) + abs(y))
