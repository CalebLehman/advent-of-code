"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    var lines = data.trim().split('\n');
    var initial = lines[0];
    var rules = {};
    lines.slice(2).forEach(function (line) {
        var _a = line.split(' -> ').slice(0, 2), key = _a[0], val = _a[1];
        rules[key] = val;
    });
    return [initial, rules];
};
var getFrequencies = function (template, rules, iterations) {
    var flag = {};
    var memo = {};
    for (var pair in rules) {
        memo[pair] = [];
        for (var i = 0; i <= iterations; i += 1)
            memo[pair].push({});
        flag[pair] = Array(iterations + 1).fill(false);
        flag[pair][0] = true;
    }
    var getInnerFrequencies = function (pair, rules, iterations) {
        if (!(pair in rules))
            return {};
        if (flag[pair][iterations])
            return memo[pair][iterations];
        var middle = rules[pair];
        var leftInnerFrequencies = getInnerFrequencies(pair[0] + middle, rules, iterations - 1);
        var rightInnerFrequencies = getInnerFrequencies(middle + pair[1], rules, iterations - 1);
        var totalInnerFrequencies = memo[pair][iterations];
        for (var symbol in leftInnerFrequencies) {
            totalInnerFrequencies[symbol] = leftInnerFrequencies[symbol];
        }
        for (var symbol in rightInnerFrequencies) {
            if (!(symbol in totalInnerFrequencies))
                totalInnerFrequencies[symbol] = 0;
            totalInnerFrequencies[symbol] += rightInnerFrequencies[symbol];
        }
        if (!(middle in totalInnerFrequencies))
            totalInnerFrequencies[middle] = 0;
        totalInnerFrequencies[middle] += 1;
        flag[pair][iterations] = true;
        return totalInnerFrequencies;
    };
    var frequencies = {};
    frequencies[template[0]] = 1;
    for (var i = 1; i < template.length; i += 1) {
        var pair = template.slice(i - 1, i + 1);
        var innerFrequencies = getInnerFrequencies(pair, rules, iterations);
        for (var symbol in innerFrequencies) {
            if (!(symbol in frequencies))
                frequencies[symbol] = 0;
            frequencies[symbol] += innerFrequencies[symbol];
        }
        if (!(pair[1] in frequencies))
            frequencies[pair[1]] = 0;
        frequencies[pair[1]] += 1;
    }
    return frequencies;
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var _a = parseData(data), template = _a[0], rules = _a[1];
    var iterations = 40;
    var frequencies = getFrequencies(template, rules, iterations);
    var max = -Infinity;
    var min = Infinity;
    for (var symbol in frequencies) {
        max = Math.max(frequencies[symbol], max);
        min = Math.min(frequencies[symbol], min);
    }
    console.log(max - min);
});
