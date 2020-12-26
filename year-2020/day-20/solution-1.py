import sys

class Tile:
    def __init__(self, i, t, r, b, l):
        self.i = i
        self.t = t
        self.r = r
        self.b = b
        self.l = l

tiles = [Tile(None, None, None, None, None)]
with sys.stdin as f:
    for line in f:
        line = line.strip()
        if line == '':
            tiles.append(Tile(None,None,None,None,None))
        elif line[0] == 'T':
            tiles[-1].i = int(line[:-1].split()[1])
        elif tiles[-1].t is None:
            tiles[-1].t = line
            tiles[-1].r = line[-1]
            tiles[-1].l = line[0]
            tiles[-1].b = line
        else:
            tiles[-1].r += line[-1]
            tiles[-1].l += line[0]
            tiles[-1].b  = line

has_nhbr = [(0,)*4] * len(tiles)
for i, tile_i in enumerate(tiles):
    t,r,b,l = (0,)*4
    for j, tile_j in enumerate(tiles):
        if i == j: continue
        if tile_i.t in [tile_j.t,tile_j.r,tile_j.b,tile_j.l] or tile_i.t[::-1] in [tile_j.t,tile_j.r,tile_j.b,tile_j.l]:
           t += 1
        if tile_i.r in [tile_j.t,tile_j.r,tile_j.b,tile_j.l] or tile_i.r[::-1] in [tile_j.t,tile_j.r,tile_j.b,tile_j.l]:
           r += 1
        if tile_i.b in [tile_j.t,tile_j.r,tile_j.b,tile_j.l] or tile_i.b[::-1] in [tile_j.t,tile_j.r,tile_j.b,tile_j.l]:
           b += 1
        if tile_i.l in [tile_j.t,tile_j.r,tile_j.b,tile_j.l] or tile_i.l[::-1] in [tile_j.t,tile_j.r,tile_j.b,tile_j.l]:
           l += 1
    has_nhbr[i] = (t,r,b,l)

total = 1
for t, h in zip(tiles, has_nhbr):
    if sum(h) == 2:
        total *= t.i
print(total)
