import sys, re

bags_containing = {}
regex = re.compile(r'(.*) bags contain (.*)\.')
with sys.stdin as f:
    for line in f:
        outer, inners = regex.match(line.strip()).groups()
        if not inners.startswith('no'):
            for bag in [' '.join(inner.strip().split()[1:-1]) for inner in inners.split(',')]:
                if not bag in bags_containing: bags_containing[bag] = []
                bags_containing[bag].append(outer)

visited = set()
curr_level = ['shiny gold']
while len(curr_level) > 0:
    next_level = []
    for bag in curr_level:
        visited.add(bag)
        containers = [b for b in bags_containing.get(bag, []) if not b in visited]
        next_level.extend(containers)
    curr_level = next_level

print(len(visited) - 1)
