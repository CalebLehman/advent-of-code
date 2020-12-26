import sys

R = 6
with sys.stdin as f:
    lines = f.readlines()
    N = len(lines) + 2*(R+1)
    initial_state = [[[False for z in range(2*(R+1)+1)] for y in range(N)] for x in range(N)]
    for y, line in enumerate(lines):
        for x, c in enumerate(line):
            initial_state[x+R+1][y+R+1][R+1] = c == '#'

prev_state = [[[initial_state[x][y][z] for z in range(2*(R+1)+1)] for y in range(N)] for x in range(N)]
for _ in range(R):
    curr_state = [[[prev_state[x][y][z] for z in range(2*(R+1)+1)] for y in range(N)] for x in range(N)]
    for x in range(1, N-1):
        for y in range(1, N-1):
            for z in range(1, 2*(R+1)+1-1):
                alive = 0
                for x_ in [x-1,x,x+1]:
                    for y_ in [y-1,y,y+1]:
                        for z_ in [z-1,z,z+1]:
                            if prev_state[x_][y_][z_]:
                                alive += 1
                if prev_state[x][y][z]:
                    curr_state[x][y][z] = alive == 3 or alive == 4
                else:
                    curr_state[x][y][z] = alive == 3
    prev_state = curr_state

print(sum([s for yz in prev_state for z in yz for s in z if s]))
