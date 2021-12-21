"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    return data.trim().split('\n').map(function (line) { return parseInt(line.split(':')[1], 10); });
};
var computeWins = function (positions, scores, goal) {
    var combinations = { 3: 1, 4: 3, 5: 6, 6: 7, 7: 6, 8: 3, 9: 1 };
    var memo = {};
    var computeWinsHelper = function (positions, scores, goal) {
        var key = positions.join(',') + ',' + scores.join(',');
        if (key in memo)
            return memo[key];
        var wins = Array(scores.length).fill(0);
        if (scores[scores.length - 1] >= goal) {
            wins[wins.length - 1] = 1;
        }
        else {
            var position = positions.shift();
            var score = scores.shift();
            var _loop_1 = function (die) {
                var quantumPosition = 1 + (position - 1 + die) % 10;
                var quantumScore = score + quantumPosition;
                positions.push(quantumPosition);
                scores.push(quantumScore);
                computeWinsHelper(positions, scores, goal).forEach(function (win, idx) { return wins[(idx + 1) % wins.length] += win * combinations[die]; });
                positions.pop();
                scores.pop();
            };
            for (var die = 3; die <= 9; die += 1) {
                _loop_1(die);
            }
            positions.unshift(position);
            scores.unshift(score);
        }
        memo[key] = wins;
        return wins;
    };
    return computeWinsHelper(positions, scores, goal);
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var positions = parseData(data);
    var scores = Array(positions.length).fill(0);
    var goal = 21;
    var wins = computeWins(positions, scores, goal);
    console.log(wins.reduce(function (acc, win) { return Math.max(acc, win); }));
});
