import sys

mandatory = set([
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    ])

def process(passport):
    # parse
    fields = [record.split(':')[0] for record in passport]

    # check for duplicates
    n = len(fields)
    fields = set(fields)
    if n > len(fields):
        return False

    # check fields
    for field in mandatory:
        if not field in fields: return False

    if len(fields) == len(mandatory): return True
    return len(fields) == len(mandatory) + 1 and 'cid' in fields

valid = 0
passport = []
with sys.stdin as f:
    for line in f:
        records = line.strip().split()
        if len(records) == 0:
            if process(passport): valid += 1
            passport = []
        passport.extend(records)
if process(passport): valid += 1
print(valid)
