import sys

with sys.stdin as f:
    card_key = int(f.readline().strip())
    door_key = int(f.readline().strip())
min_key = min(card_key, door_key)
loop, key = 0, 1
while key != min_key: loop, key = loop + 1, (key * 7) % 20201227
max_key = max(card_key, door_key)
key = 1
for _ in range(loop): key = (key * max_key) % 20201227
print(key)
