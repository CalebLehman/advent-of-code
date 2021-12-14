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
var applyRules = function (template, rules) {
    if (template.length === 0)
        return '';
    var result = [template[0]];
    for (var i = 1; i < template.length; i++) {
        var key = template.slice(i - 1, i + 1);
        if (key in rules) {
            result.push(rules[key]);
        }
        result.push(key[1]);
    }
    return result.join('');
};
var countFrequency = function (template) {
    var counts = {};
    template.split('').forEach(function (symbol) { var _a; return counts[symbol] = ((_a = counts[symbol]) !== null && _a !== void 0 ? _a : 0) + 1; });
    var frequencies = [];
    for (var symbol in counts) {
        frequencies.push([
            symbol,
            counts[symbol]
        ]);
    }
    return frequencies;
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var _a = parseData(data), template = _a[0], rules = _a[1];
    var final = template;
    for (var i = 0; i < 10; i += 1) {
        final = applyRules(final, rules);
    }
    var frequencies = countFrequency(final);
    var max = Math.max.apply(Math, frequencies.map(function (freq) { return freq[1]; }));
    var min = Math.min.apply(Math, frequencies.map(function (freq) { return freq[1]; }));
    console.log(frequencies);
    console.log(max);
    console.log(min);
    console.log(max - min);
});
