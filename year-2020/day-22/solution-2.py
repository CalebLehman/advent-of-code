import sys

decks = [[], []]
with sys.stdin as f:
    for line in f:
        line = line.strip()
        if line == '': decks[0], decks[1] = decks[1], decks[0]
        elif line[0] != 'P': decks[-1].append(int(line))

game_id = 0
def play_recursive_combat(decks):
    global game_id
    game_id += 1
    configurations = set()
    while min(map(len, decks)) > 0:
        #print('game {}: {}'.format(game_id, decks))
        configuration = (tuple(decks[0]), tuple(decks[1]))
        if configuration in configurations: decks[1] = []
        else:
            configurations.add(configuration)
            a, b = decks[0].pop(0), decks[1].pop(0)
            if len(decks[0]) >= a and len(decks[1]) >= b:
                sub_game = play_recursive_combat([list(decks[0][:a]), list(decks[1][:b])])
                if sub_game[0]: decks[0].extend([a, b])
                else:           decks[1].extend([b, a])
            else:
                if a > b: decks[0].extend([a, b])
                else:     decks[1].extend([b, a])
    game_id -= 1
    return (len(decks[0]) > 0, decks[0] + decks[1])

game = play_recursive_combat(decks)
deck = game[1]
n = len(deck)
print(sum([(n-i)*v for i,v in enumerate(deck)]))
