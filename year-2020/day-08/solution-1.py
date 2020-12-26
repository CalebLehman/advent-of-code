import sys

def process_line(line):
    op, val = line.strip().split()
    val = int(val)
    return (op, val)

with sys.stdin as f:
    instructions = list(map(process_line, f))

executed = [False for _ in instructions]
acc, pc = 0, 0
while True:
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
print(acc)
