import sys, re

rule_regex  = re.compile(r'(.*) bags contain (.*)\.')
count_regex = re.compile(r'(\d+) (.*) bag[s]?')
def process_rule(rule):
    outer_bag, inner_bags = rule_regex.search(rule).groups()
    if inner_bags.startswith('no'):
        inner_bags = []
    else:
        def process_count(bag):
            count, bag = count_regex.search(bag).groups()
            return (bag, int(count))
        inner_bags = list(map(process_count, inner_bags.split(',')))
    return outer_bag, inner_bags

rules = {}
with sys.stdin as f:
    for rule in f:
        outer_bag, inner_bags = process_rule(rule)
        rules[outer_bag] = inner_bags

num_bags_inside = {}

def count_inside(bag, rules, num_bags_inside={}):
    num_inside = 0
    for inner, count in rules[bag]:
        if not inner in num_bags_inside:
            count_inside(inner, rules, num_bags_inside=num_bags_inside)
        num_inside += count * (1 + num_bags_inside[inner])
    num_bags_inside[bag] = num_inside
    return num_inside

print(count_inside('shiny gold', rules))
