import re
from collections import namedtuple, Counter

Cuboid = namedtuple('Cuboid', 'xl xh yl yh zl zh')
Instruction = namedtuple('Instruction', 'turn_on cuboid')

def parse_data(data):
    instructions = []
    for line in data:
        cuboid = Cuboid(*[int(s) for s in re.findall(r'-?\d+', line)])
        instruction = Instruction(line.startswith('on'), cuboid)
        instructions.append(instruction)
    return instructions

def intersect(cuboid_a, cuboid_b):
    coordinates = []
    return Cuboid(
        max(cuboid_a.xl, cuboid_b.xl),
        min(cuboid_a.xh, cuboid_b.xh),
        max(cuboid_a.yl, cuboid_b.yl),
        min(cuboid_a.yh, cuboid_b.yh),
        max(cuboid_a.zl, cuboid_b.zl),
        min(cuboid_a.zh, cuboid_b.zh),
    )

def is_valid(cuboid):
    return cuboid.xl <= cuboid.xh and cuboid.yl <= cuboid.yh and cuboid.zl <= cuboid.zh

def count_cubes(cuboid):
    return (cuboid.xh - cuboid.xl + 1) * (cuboid.yh - cuboid.yl + 1) * (cuboid.zh - cuboid.zl + 1)

def count_cubes_on(instructions, boundary=None):
    if boundary:
        bounded_instructions = []
        for turn_on, cuboid in instructions:
            intersection = intersect(boundary, cuboid)
            if is_valid(intersection):
                bounded_instructions.append(Instruction(turn_on, intersection))
        instructions = bounded_instructions

    contributions = Counter()
    for turn_on, curr_cuboid in instructions:
        for cuboid, contribution in contributions.copy().items():
            intersection = intersect(curr_cuboid, cuboid)
            if is_valid(intersection):
                contributions[intersection] -= contribution
        if turn_on:
            contributions[curr_cuboid] += 1

    count = 0
    for cuboid, contribution in contributions.items():
        count += count_cubes(cuboid) * contribution
    return count

def main():
    with open('input.txt', 'r') as data:
        instructions = parse_data(data)
    print(count_cubes_on(instructions))

if __name__ == '__main__':
    main()
