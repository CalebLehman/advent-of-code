from itertools import product
from collections import namedtuple, Counter

Point = namedtuple("Point", "x y z")
Turns = namedtuple("Turns", "x y z")

def subtractPoint(point, other):
    return Point(
        point.x - other.x,
        point.y - other.y,
        point.z - other.z,
    )

def addPoint(point, other):
    return Point(
        point.x + other.x,
        point.y + other.y,
        point.z + other.z,
    )

def turnPoint(point, turns):
    x = point.x
    y = point.y
    z = point.z

    for _ in range(turns.x):
        y, z = z, -1 * y

    for _ in range(turns.y):
        z, x = x, -1 * z

    for _ in range(turns.z):
        x, y = y, -1 * x

    return Point(x, y, z)

def main():
    scanners = []
    with open('input.txt', 'r') as file:
        for line in file:
            if not line.strip() == '':
                if line.startswith('---'):
                    scanners.append([])
                else:
                    x, y, z = line.strip().split(',')
                    scanners[-1].append(Point(int(x), int(y), int(z)))

    differences = [Point(0, 0, 0)]
    matched_scanners = []
    border_scanners = [scanners[0]]
    unmatched_scanners = scanners[1:]

    while len(border_scanners) > 0:
        border_scanner = border_scanners.pop()
        still_unmatched_scanners = []
        for unmatched_scanner in unmatched_scanners:
            matched_scanner, difference = checkAgainstReference(unmatched_scanner, border_scanner, 12)
            if len(matched_scanner) > 0:
                border_scanners.append(matched_scanner)
                differences.append(difference)
            else:
                still_unmatched_scanners.append(unmatched_scanner)
        unmatched_scanners = still_unmatched_scanners
        matched_scanners.append(border_scanner)

    max_difference = 0
    for p, q in product(differences, differences):
        max_difference = max(max_difference, abs(p.x - q.x) + abs(p.y - q.y) + abs(p.z - q.z))
    print(max_difference)

def checkAgainstReference(points, reference, cutoff=12):
    turns = [Turns(x, y, z) for x in range(4) for y in range(4) for z in range(4)]
    for turn in turns:
        turned_points = [turnPoint(point, turn) for point in points]
        differences = [subtractPoint(p, q) for p,q in product(reference, turned_points)]
        difference, count = Counter(differences).most_common(1)[0]
        if count >= cutoff:
            return [addPoint(point, difference) for point in turned_points], difference
    return [], None

if __name__ == '__main__':
    main()
