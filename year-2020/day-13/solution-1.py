import sys

with sys.stdin as f:
    n  = int(f.readline().strip())
    ks = [int(k) for k in f.readline().strip().split(',') if k != 'x']

minimum = (float('inf'), None)
for k in ks:
    minimum = min(minimum, (k*((n+k-1)//k) - n, k))
print(minimum[0] * minimum[1])
