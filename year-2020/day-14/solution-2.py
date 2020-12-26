import sys
import re

def apply(address, mask):
    set_mask = int(mask.replace('X','0'), 2)
    address  = address | set_mask
    expanded_addresses = []
    num_xs = len([bit for bit in mask if bit == 'X'])
    base_address = '{0:036b}'.format(address)
    for n in range(2**num_xs):
        curr_address = list(base_address)
        i = 0
        for k in range(num_xs):
            while mask[i] != 'X': i += 1
            curr_address[i] = str((n >> k) & 1)
            i += 1
        expanded_addresses.append(''.join(curr_address))
    return expanded_addresses

mask_regex = re.compile(r'mask = ([X01]+)')
init_regex = re.compile(r'mem\[(\d+)\] = (\d+)')

mask, set_mask, clear_mask = None, None, None
mem = {}
with sys.stdin as f:
    for line in f:
        mask_match = mask_regex.match(line)
        if mask_match:
            mask = mask_match.group(1)
        else:
            address, val = map(int, init_regex.match(line).groups())
            for expanded_address in apply(address, mask):
                mem[expanded_address] = int(val)
print(sum(mem.values()))
