import sys
import re
import collections

class State:
    def __init__(self, N):
        self.N = N
        M = 2*(N + 1) + 1
        self.state = [[False for _ in range(M)] for _ in range(M)]
    def get(self, coord):
        return self.state[coord.x + N + 1][coord.y + N + 1]
    def flip(self, coord):
        self.state[coord.x + N + 1][coord.y + N + 1] ^= True
    def neighbors(self, coord):
        return sum([self.get(Coord(coord.x+delta.x, coord.y+delta.y)) for delta in deltas.values()])
    def count(self):
        return sum([self.get(Coord(x,y)) for x in range(-self.N, self.N+1) for y in range(-self.N, self.N+1)])

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
        x += delta.x
        y += delta.y
    return Coord(x, y)

D = int(sys.argv[1])
coords = []
with sys.stdin as f:
    for line in f:
        line  = line.strip()
        coords.append(get_coord(line))

n = max([max(abs(coord.x), abs(coord.y)) for coord in coords])
N = D + n
state = State(N)
for coord in coords:
    state.flip(coord)

for d in range(D):
    coords = []
    for x in range(-(n+d+1), (n+d+1)+1):
        for y in range(-(n+d+1), (n+d+1)+1):
            coord   = Coord(x, y)
            flipped = state.get(coord)
            nhbrs   = state.neighbors(coord)
            if flipped and (nhbrs < 1 or nhbrs > 2): coords.append(coord)
            if not flipped and nhbrs == 2:           coords.append(coord)
    for coord in coords: state.flip(coord)
    print('Day {}: {}'.format(d+1, state.count()))
print(state.count())
exit()
print(len(flipped))
print(flipped)
