import sys
import re

NUM, MULT, ADD, PAREN = range(4)
num_regex   = re.compile(r'\d+')
mult_regex  = re.compile(r'\*')
add_regex   = re.compile(r'\+')
open_regex  = re.compile(r'\(')
close_regex = re.compile(r'\)')
def tokenize(word):
    tokens = []
    p = 0
    while len(word) > 0:
        if num_regex.match(word):
            num = num_regex.match(word).group(0)
            word = word[len(num):]
            tokens.append((NUM, int(num)))
        elif mult_regex.match(word):
            tokens.append((MULT, lambda x,y: x*y))
            word = word[1:]
        elif add_regex.match(word):
            tokens.append((ADD, lambda x,y: x+y))
            word = word[1:]
        elif open_regex.match(word):
            tokens.append((PAREN, p))
            p += 1
            word = word[1:]
        elif close_regex.match(word):
            p -= 1
            tokens.append((PAREN, p))
            word = word[1:]
        else:
            word = word[1:]
    return tokens

def evaluate(tokens):
    if len(tokens) == 0: return 0

    for i in range(len(tokens)):
        if tokens[i][0] == PAREN:
            j = i + 1
            while True:
                if tokens[i] == tokens[j]: break
                j += 1
            val = evaluate(tokens[i+1:j])
            return evaluate(tokens[:i] + [(NUM, val)] + tokens[j+1:])

    acc = tokens[0][1]
    for i in range(2, len(tokens), 2):
        op  = tokens[i-1][1]
        val = tokens[i][1]
        acc = op(acc, val)
    return acc

acc = 0
with sys.stdin as f:
    for line in f:
        line = line.strip()
        tokens = tokenize(line)
        val = evaluate(tokens)
        acc += val
print(acc)
