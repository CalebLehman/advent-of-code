"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    return data.trim().split('\n').map(function (line) { return parseInt(line.split(':')[1], 10); });
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var positions = parseData(data);
    var scores = Array(positions.length).fill(0);
    var dieNext = 1;
    var dieRolls = 0;
    var goal = 1000;
    while (scores.reduce(function (acc, score) { return Math.max(acc, score); }) < goal) {
        var position = 1 + (positions.shift() - 1 + 3 * dieNext + 3) % 10;
        var score = scores.shift() + position;
        positions.push(position);
        scores.push(score);
        dieNext = 1 + (dieNext - 1 + 3) % 100;
        dieRolls += 3;
    }
    var losingScore = scores.reduce(function (acc, score) { return Math.min(acc, score); });
    console.log(losingScore * dieRolls);
});
