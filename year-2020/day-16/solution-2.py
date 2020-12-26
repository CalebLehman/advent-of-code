import sys
import re

class Field:
    def __init__(self, name, a, b, c, d):
        self.name = name
        self.a = a
        self.b = b
        self.c = c
        self.d = d
    def is_valid(self, val):
        return ((self.a <= val) and (val <= self.b)) or ((self.c <= val) and (val <= self.d))

field_regex = re.compile(r'(.*): (\d+)-(\d+) or (\d+)-(\d+)')

FIELDS, NOP_1, MY_TICKET, NOP_2, NEARBY_TICKETS = range(5)
mode = 0
fields = []
my_ticket = None
tickets = []
with sys.stdin as f:
    for line in f:
        line = line.strip()
        if line == '':
            mode += 1
        elif mode == FIELDS:
            groups = field_regex.match(line).groups()
            name = groups[0]
            vals = [int(val) for val in groups[1:]]
            fields.append(Field(name, *vals))
        elif mode == NOP_1:
            mode += 1
        elif mode == MY_TICKET:
            my_ticket = list(map(int, line.split(',')))
        elif mode == NOP_2:
            mode += 1
        elif mode == NEARBY_TICKETS:
            tickets.append(list(map(int, line.split(','))))

valid_tickets = []
for ticket in tickets:
    for val in ticket:
        if not any(field.is_valid(val) for field in fields):
            break
    else:
        valid_tickets.append(ticket)

n = len(my_ticket)
possible_fields = [[] for _ in range(n)]
for i in range(n):
    for field in fields:
        for ticket in valid_tickets:
            if not field.is_valid(ticket[i]):
                break
        else:
            possible_fields[i].append(field.name)

fields = [None] * n
assigned = set()
while len(assigned) < n:
    for i, possibilities in enumerate(possible_fields):
        updated = set(possibilities).difference(assigned)
        if len(updated) == 1:
            updated = list(updated)
            assigned.add(updated[0])
            fields[i] = updated[0]
            break

total = 1
for i, field in enumerate(fields):
    if field.startswith('departure'): total *= my_ticket[i]
print(total)
