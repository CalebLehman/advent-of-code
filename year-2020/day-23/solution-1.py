import sys

N = int(sys.argv[1])
cups = []
with sys.stdin as f:
    cups = list(map(int, list(f.readline().strip())))
n    = len(cups)
for _ in range(N):
    curr, picks, cups = cups[0], cups[1:4], cups[4:]
    dest = (curr - 2) % n + 1
    while dest in picks: dest = (dest - 2) % n + 1
    i = cups.index(dest)
    cups = cups[:i] + [cups[i]] + picks + cups[i+1:] + [curr]
i = cups.index(1)
order = ''.join(map(str, cups[i+1:] + cups[:i]))
print(order)
