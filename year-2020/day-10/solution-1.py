import sys

with sys.stdin as f:
    adapters = sorted(map(int, f.readlines()))

adapters = [0] + adapters + [adapters[-1] + 3]
counts = [0] * 3
for lo, hi in zip(adapters, adapters[1:]):
    counts[hi - lo - 1] += 1
print(counts[0] * counts[2])
