import sys

def process(group):
    questions = [chr(ord('a')+i) for i in range(26)]
    count_yes = [0] * 26
    for person in group:
        for q in person:
            count_yes[ord(q) - ord('a')] += 1
    return sum(count == len(group) for count in count_yes)

counts = 0
group = []
with sys.stdin as f:
    for line in f:
        line = line.strip()
        if line == '':
            counts += process(group)
            group = []
        else:
            group.append(line.strip())
counts += process(group)
print(counts)
