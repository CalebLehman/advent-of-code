import sys

def process(seat):
    return int(seat.replace('F','0').replace('B','1').replace('L','0').replace('R','1'), 2)

with sys.stdin as f:
    seats = sorted(map(process, f.readlines()))

missing = None
for i in range(1, len(seats)):
    if seats[i-1] + 1 != seats[i]: missing = seats[i] - 1
print(missing)
