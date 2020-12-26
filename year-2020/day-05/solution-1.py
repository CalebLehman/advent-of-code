import sys

def process(seat):
    return int(seat.replace('F','0').replace('B','1').replace('L','0').replace('R','1'), 2)

with sys.stdin as f:
    print(max(map(process, f.readlines())))
