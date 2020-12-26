import sys

decks = [[], []]
with sys.stdin as f:
    for line in f:
        line = line.strip()
        if line == '': decks[0], decks[1] = decks[1], decks[0]
        elif line[0] != 'P': decks[-1].append(int(line))

while min(map(len, decks)) > 0:
    a, b = decks[0].pop(0), decks[1].pop(0)
    if a > b: decks[0].extend([a, b])
    else:     decks[1].extend([b, a])

deck = decks[0] + decks[1]
n = len(deck)
print(sum([(n-i)*v for i,v in enumerate(deck)]))
