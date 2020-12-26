import sys
import re
import collections

Coord = collections.namedtuple('Coord', 'x y')
deltas = {
    'e':  Coord( 1, 0),
    'se': Coord( 1,-1),
    'sw': Coord( 0,-1),
    'w':  Coord(-1, 0),
    'nw': Coord(-1, 1),
    'ne': Coord( 0, 1),
    }
def get_coord(steps):
    x, y = 0, 0
    i = 0
    while i < len(steps):
        delta = None
        if steps[i] in deltas:
            delta = deltas[steps[i:i+1]]
            i    += 1
        else:
            delta = deltas[steps[i:i+2]]
            i    += 2
        x    += delta.x
        y    += delta.y
    return Coord(x, y)

flipped = set()
with sys.stdin as f:
    for line in f:
        line  = line.strip()
        coord = get_coord(line)
        flipped = flipped.symmetric_difference(set([coord]))
print(len(flipped))
