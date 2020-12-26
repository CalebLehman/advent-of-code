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

total = 0
for ticket in tickets:
    for val in ticket:
        if not any(field.is_valid(val) for field in fields): total += val
print(total)
