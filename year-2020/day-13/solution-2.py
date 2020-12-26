import sys

def mod_inv(k, n):
    # x a + y b = gcd
    a, b = k, n
    x_a, y_a = 1, 0
    x_b, y_b = 0, 1
    while a > 0:
        q, r = b//a, b%a
        b, a = a, r
        x_b, y_b, x_a, y_a = x_a, y_a, x_b - q*x_a, y_b - q*y_a
    return x_b % n

def chinese_rem(ns, rs):
    N = 1
    for n in ns:
        N *= n
    xs = [(N//n)*mod_inv(N//n, n) % N for n in ns]
    return sum([(x*r) % N for x,r in zip(xs, rs)]) % N

with sys.stdin as f:
    N   = int(f.readline())
    ids = [i for i in enumerate(f.readline().strip().split(',')) if i[1] != 'x']
ns = [int(i[1]) for i in ids]
rs = [-1*i[0] for i in ids]
print(chinese_rem(ns, rs))
