import re

count = 0
with open('input.txt', 'r') as f:
    for line in f:
        rule, password = line.split(':')
        password = password.strip()
        i, j = map(int, re.findall(r'\d+', rule))
        c = rule[-1]
        val = len(re.findall(c, password[i-1] + password[j-1]))
        if val == 1:
            count += 1
print(count)
