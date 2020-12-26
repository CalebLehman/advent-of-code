import sys

def process_line(line):
    op, val = line.strip().split()
    val = int(val)
    return (op, val)

def execute(instructions):
    executed = [False for _ in instructions]
    acc, pc = 0, 0
    while pc < len(instructions):
        if executed[pc]: break
        executed[pc] = True
        op, val = instructions[pc]
        if op == 'acc':
            acc += val
            pc  += 1
        elif op == 'jmp':
            pc += val
        elif op == 'nop':
            pc += 1
    else:
        return (True, acc)
    return (False, None)

with sys.stdin as f:
    instructions = list(map(process_line, f))

acc = None
for i, (op, val) in enumerate(instructions):
    if op == 'jmp':
        instructions[i] = ('nop', val)
    if op == 'nop':
        instructions[i] = ('jmp', val)
    success, acc = execute(instructions)
    if success: break
    instructions[i] = (op, val)
print(acc)
