with open('input.txt', 'r') as f:
    vals = map(int, f.readlines())

vals = sorted(vals)
for i in range(len(vals)):
    j, k = i + 1, len(vals) - 1
    while j < k:
        v = vals[i] + vals[j] + vals[k]
        print(v)
        if v < 2020:
            j += 1
        if v > 2020:
            k -= 1
        if v == 2020:
            print(vals[i], vals[j], vals[k])
            print(vals[i] * vals[j] * vals[k])
            exit()
