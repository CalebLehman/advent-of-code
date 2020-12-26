import sys

with sys.stdin as f:
    starting_nums = list(map(int, f.readline().strip().split(',')))

most_recent_turn = {}
prev = starting_nums[0]
for i, n in enumerate(starting_nums[1:]):
    curr = n
    most_recent_turn[prev] = i
    prev = curr

for turn in range(len(starting_nums), 2020):
    curr = turn-1 - most_recent_turn.get(prev, turn-1)
    most_recent_turn[prev] = turn - 1
    prev = curr
print(prev)
