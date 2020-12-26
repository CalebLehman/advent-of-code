import sys
import re

regex = re.compile(r'([ a-z]+) \(contains (.*)\)')

all_ingredients = set()
all_allergens   = {}
full_list       = []
with sys.stdin as f:
    for line in f:
        line = line.strip()
        groups = regex.match(line).groups()
        full_list.extend(groups[0].split())
        ingredients = set(groups[0].split())
        allergens   = groups[1].split(',')
        for allergen in allergens:
            allergen = allergen.strip()
            all_allergens[allergen] = all_allergens.get(allergen, ingredients).intersection(ingredients)
        all_ingredients = all_ingredients.union(ingredients)

non_allergenic = all_ingredients.difference(set().union(*all_allergens.values()))
count = len([i for i in full_list if i in non_allergenic])
print(count)
