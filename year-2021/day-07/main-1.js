"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    return data.trim().split(',').map(function (s) { return parseInt(s, 10); });
};
var computeMedian = function (nums) {
    var mid = Math.floor(nums.length / 2);
    var sorted = nums.sort(function (a, b) { return a - b; });
    if (sorted.length % 2 === 0)
        return Math.floor((sorted[mid - 1] + sorted[mid]) / 2);
    else
        return sorted[mid];
};
var computeCost = function (positions, target) {
    return positions.reduce(function (acc, position) { return acc + Math.abs(target - position); }, 0);
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var positions = parseData(data);
    var median = computeMedian(positions);
    console.log(computeCost(positions, median));
});
