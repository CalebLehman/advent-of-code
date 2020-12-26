import sys

def rotate(x, y, val):
    val = (val % 360) / 90
    while val > 0:
        x, y = -1 * y, x
        val -= 1
    return x, y

def process(x, y, line):
    line = line.strip()
    op, val = line[0], int(line[1:])
    if op == 'N': return (0, 0, x, y + val)
    if op == 'S': return (0, 0, x, y - val)
    if op == 'E': return (0, 0, x + val, y)
    if op == 'W': return (0, 0, x - val, y)
    if op == 'L': return (0, 0, *rotate(x, y, val))
    if op == 'R': return (0, 0, *rotate(x, y, -val))
    if op == 'F': return (x*val, y*val, x, y)

net_x, net_y, x, y = 0, 0, 10, 1
with sys.stdin as f:
    for line in f:
        dx, dy, x, y = process(x, y, line)
        net_x += dx
        net_y += dy
print(abs(net_x) + abs(net_y))
