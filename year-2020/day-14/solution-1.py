import sys
import re

mask_regex = re.compile(r'mask = ([X01]+)')
init_regex = re.compile(r'mem\[(\d+)\] = (\d+)')

mask, set_mask, clear_mask = None, None, None
mem = {}
with sys.stdin as f:
    for line in f:
        mask_match = mask_regex.match(line)
        if mask_match:
            mask       = mask_match.group(1)
            set_mask   = int(mask.replace('X','0'), 2)
            clear_mask = int(mask.replace('X','1'), 2)
        else:
            address, val = init_regex.match(line).groups()
            mem[address] = (int(val) | set_mask) & clear_mask
print(sum(mem.values()))
