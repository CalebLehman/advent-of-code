#!/usr/bin/env sh
# didn't really want to write yet another graph search; seemed easier to work out by hand
# (especially since the order of magnitude difference between costs makes an easy heuristic)

step_file='main-1.txt'
a=$(grep 'cost.*A' ${step_file} | cut -d' ' -f2 | xargs | sed -e 's/\ /+/g' | bc)
b=$(grep 'cost.*B' ${step_file} | cut -d' ' -f2 | xargs | sed -e 's/\ /+/g' | bc)
c=$(grep 'cost.*C' ${step_file} | cut -d' ' -f2 | xargs | sed -e 's/\ /+/g' | bc)
d=$(grep 'cost.*D' ${step_file} | cut -d' ' -f2 | xargs | sed -e 's/\ /+/g' | bc)

echo "${a} + 10 * ${b} + 100 * ${c} + 1000 * ${d}" | bc
