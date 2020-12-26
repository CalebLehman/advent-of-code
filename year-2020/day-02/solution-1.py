import re

count = 0
with open('input.txt', 'r') as f:
    for line in f:
        rule, password = line.split(':')
        lo, hi = map(int, re.findall(r'\d+', rule))
        c = rule[-1]
        val = len(re.findall(c, password))
        if (lo <= val) and (val <= hi):
            count += 1
print(count)
