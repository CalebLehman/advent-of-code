"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    return data.trim().split('\n').map(function (line) {
        var patterns = line.split(' | ')[0].split(' ');
        var outputs = line.split(' | ')[1].split(' ');
        return {
            patterns: patterns,
            outputs: outputs
        };
    });
};
var numberOfSegments = [
    6,
    2,
    5,
    5,
    4,
    5,
    6,
    3,
    7,
    6, // 9 has 6 segments
];
var countOutputsWithUniqueSegments = function (evidences) {
    return evidences.reduce(function (arr, evidence) {
        return arr + evidence.outputs.filter(function (output) {
            return output.length === numberOfSegments[1]
                || output.length === numberOfSegments[4]
                || output.length === numberOfSegments[7]
                || output.length === numberOfSegments[8];
        }).length;
    }, 0);
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var evidences = parseData(data);
    console.log(countOutputsWithUniqueSegments(evidences));
});
