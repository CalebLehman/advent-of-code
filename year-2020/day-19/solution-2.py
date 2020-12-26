import sys
import re
import itertools

LIT, AND, OR, NOP = range(4)
lit_regex = re.compile(r'^(\d+): "([ab])"$')
and_regex = re.compile(r'(\d+): ([ \d].*)')
or_regex  = re.compile(r'(\d+): ([ \d].*) \| ([ \d].*)') 
def process_rule(line):
    or_match  = or_regex.match(line)
    if or_match:
        rule = int(or_match.groups()[0])
        lhs  = [int(n) for n in or_match.groups()[1].split()]
        rhs  = [int(n) for n in or_match.groups()[2].split()]
        return [OR, rule, lhs, rhs]
    and_match = and_regex.match(line)
    if and_match:
        rule = int(and_match.groups()[0])
        ns   = [int(n) for n in and_match.groups()[1].split()]
        return [AND, rule, ns]
    lit_match = lit_regex.match(line)
    if lit_match:
        rule = int(lit_match.groups()[0])
        lits = set(lit_match.groups()[1])
        return [LIT, rule, lits]

lits = {}
rules = []
patterns = []
with sys.stdin as f:
    for line in f:
        line = line.strip()
        if line == '': break
        rules.append(process_rule(line))

    for line in f:
        line = line.strip()
        patterns.append(line)

done = False
while not done:
    done = True
    for i, rule in enumerate(rules):
        if rule[0] == LIT:
            lits[rule[1]] = rule[2]
            rules[i] = (NOP,)
        if rule[0] == AND:
            if all((n in lits) for n in rule[2]):
                possibilities = map(lambda i: lits[i], rule[2])
                lits[rule[1]] = set([''.join(s) for s in itertools.product(*possibilities)])
                rules[i] = (NOP,)
            done = False
        if rule[0] == OR:
            if all((n in lits) for n in rule[2]) and all((n in lits) for n in rule[3]):
                possibilities = map(lambda i: lits[i], rule[2])
                one = set([''.join(s) for s in itertools.product(*possibilities)])
                possibilities = map(lambda i: lits[i], rule[3])
                two = set([''.join(s) for s in itertools.product(*possibilities)])
                lits[rule[1]] = one.union(two)
                rules[i] = (NOP,)
            done = False

matches = 0
for pattern in patterns:
    if len(pattern) < 24: continue
    ante = 0
    while pattern[:8] in lits[42]:
        pattern = pattern[8:]
        ante += 1
    post = 0
    while pattern[:8] in lits[31]:
        pattern = pattern[8:]
        post += 1
    if len(pattern) == 0 and ante > post and post >= 1:
        matches += 1

print(matches)
