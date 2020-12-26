import sys

class Node:
    def __init__(self, label, n_idx):
        self.label = label
        self.n_idx = n_idx

N = int(sys.argv[1])
I = int(sys.argv[2])
n = 0
cups = []
with sys.stdin as f:
    cups = list(map(int, list(f.readline().strip())))
    n    = len(cups)
    cups = cups + range(n+1, N+1)
    cups = [Node(c, (i+1)%N) for i,c in enumerate(cups)]

def cups_idx(label):
    for i in range(n):
        if cups[i].label == label:
            return i
    return label - 1

def cups_slice(idx, k):
    s = [cups[idx]]
    while len(s) < k: s.append(cups[s[-1].n_idx])
    return s

curr = cups[0]
for i in range(I):
    picks      = cups_slice(curr.n_idx, 3)
    curr.n_idx = picks[-1].n_idx

    dest_label = (curr.label - 2) % N + 1
    while dest_label in [cup.label for cup in picks]: dest_label = (dest_label - 2) % N + 1
    dest_idx = cups_idx(dest_label)
    dest = cups[dest_idx]
    dest.n_idx, picks[-1].n_idx = cups_idx(picks[0].label), dest.n_idx

    curr = cups[curr.n_idx]
stars = cups_slice(cups_idx(1), 3)[1:]
print(stars[0].label * stars[1].label)
