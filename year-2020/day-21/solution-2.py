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

cdil = []
cdi  = set()
done = False
while not done:
    done = True
    for allergen in all_allergens:
        if len(all_allergens[allergen]) == 1:
            ingredient = list(all_allergens[allergen])[0]
            cdi.add(ingredient)
            cdil.append((allergen, ingredient))
            all_allergens[allergen] = set()
        elif len(all_allergens[allergen]) > 1:
            all_allergens[allergen] = all_allergens[allergen].difference(cdi)
            done = False

print(','.join([i for a,i in sorted(cdil)]))
