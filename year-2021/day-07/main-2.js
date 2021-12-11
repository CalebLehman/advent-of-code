"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    return data.trim().split(',').map(function (s) { return parseInt(s, 10); });
};
var computeCost = function (positions, target) {
    return positions.reduce(function (acc, position) {
        var delta = Math.abs(target - position);
        return acc + delta * (delta + 1) / 2;
    }, 0);
};
var computeMinCost = function (positions) {
    var minCost = Infinity;
    var lo = Math.min.apply(Math, positions);
    var hi = Math.max.apply(Math, positions);
    for (var target = lo; target <= hi; target += 1) {
        minCost = Math.min(minCost, computeCost(positions, target));
    }
    return minCost;
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var positions = parseData(data);
    console.log(computeMinCost(positions));
});
