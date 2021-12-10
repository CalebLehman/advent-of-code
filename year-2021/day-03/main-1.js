"use strict";
exports.__esModule = true;
var fs = require("fs");
var processData = function (data) {
    var lines = data.trim().split('\n');
    var counts;
    lines.forEach(function (num) {
        if (counts === undefined) {
            counts = new Array(num.length).fill(0);
        }
        num.split('').forEach(function (bit, idx) {
            counts[idx] += parseInt(bit, 10);
        });
    });
    var majorityCount = lines.length / 2;
    var gammaString = counts.map(function (count) { return count > majorityCount ? '1' : '0'; }).join('');
    var epsilonString = counts.map(function (count) { return count > majorityCount ? '0' : '1'; }).join('');
    return parseInt(gammaString, 2) * parseInt(epsilonString, 2);
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(processData(data));
});
