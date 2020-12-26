import sys

with sys.stdin as f:
    adapters = sorted(map(int, f.readlines()))

adapters    = [0] + adapters + [adapters[-1] + 3]
arrangments = [0] * len(adapters)
arrangments[0] = 1

for i in range(1, len(adapters)):
    j = i-1
    while j >= 0 and adapters[i] - adapters[j] <= 3:
        arrangments[i] += arrangments[j]
        j -= 1
print(arrangments[-1])
