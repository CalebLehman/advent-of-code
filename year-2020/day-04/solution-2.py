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
    records = {record.split(':')[0]:record.split(':')[1].strip() for record in passport}

    # check for duplicates
    if len(fields) > len(records.keys()):
        return False

    # verify fields
    try:
        byr = records.get('byr', '')
        if len(byr) != 4: return False
        byr = int(byr)
        if byr < 1920 or byr > 2002: return False

        iyr = records.get('iyr', '')
        if len(iyr) != 4: return False
        iyr = int(iyr)
        if iyr < 2010 or iyr > 2020: return False

        eyr = records.get('eyr', '')
        if len(eyr) != 4: return False
        eyr = int(eyr)
        if eyr < 2020 or eyr > 2030: return False

        hgt = records.get('hgt', '')
        if hgt.endswith('cm'):
            hgt = int(hgt[:-2])
            if hgt < 150 or hgt > 193: return False
        elif hgt.endswith('in'):
            hgt = int(hgt[:-2])
            if hgt < 59 or hgt > 76: return False
        else:
            return False

        hcl = records.get('hcl', '')
        if not hcl.startswith('#'): return False
        if len(hcl) != 7: return False
        for c in hcl[1:]:
            if not c in '0123456789abcdef': return False

        ecl = records.get('ecl', '')
        if ecl not in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']: return False

        pid = records.get('pid', '')
        if len(pid) != 9: return False
        for c in pid:
            if not c in '0123456789': return False
    except:
        return

    if len(fields) == 7: return True
    return len(fields) == 8 and 'cid' in fields

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
