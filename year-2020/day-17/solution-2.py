import sys
import itertools, copy

class State:
    def __init__(self, d, n):
        self.d = d
        self.n = n
        self.state = False
        for _ in range(d):
            self.state = [copy.deepcopy(self.state) for _ in range(n)]

    def get(self, ind):
        elem = self.state
        for i in ind:
            elem = elem[i]
        return elem

    def set(self, ind, val):
        elem = self.state
        for i in ind[:-1]:
            elem = elem[i]
        elem[ind[-1]] = val

    def will_live(self, ind):
        alive = 0
        for d_ind in itertools.product([-1,0,1], repeat=self.d):
            ind_ = [i+d_i for i,d_i in zip(ind,d_ind)]
            if self.get(ind_): alive += 1
        elem = self.get(ind)
        if elem: return alive == 3 or alive == 4
        else:    return alive == 3

    def count(self):
        alive = 0
        for ind in itertools.product(range(N), repeat=self.d):
            if self.get(ind): alive += 1
        return alive

D = int(sys.argv[1])
R = int(sys.argv[2])
with sys.stdin as f:
    lines = f.readlines()
    N = len(lines) + 2*(R+1)
    initial_state = State(D, N)
    for y, line in enumerate(lines):
        for x, c in enumerate(line):
            if c == '#':
                ind = [R+1]*D
                ind[0] += x
                ind[1] += y
                initial_state.set(ind, True)

prev_state = initial_state
for _ in range(R):
    print(prev_state.count())
    curr_state = State(D, N)
    for ind in itertools.product(range(1, N-1), range(1, N-1), range(0,2*R+2), range(0,2*R+2)):
        curr_state.set(ind, prev_state.will_live(ind))
    prev_state = curr_state
print(prev_state.count())
