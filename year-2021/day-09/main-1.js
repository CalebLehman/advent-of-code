"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    return data.trim().split('\n').map(function (line) {
        return line.split('').map(function (s) { return parseInt(s, 10); });
    });
};
var getHeight = function (heightMap, row, col) {
    if ((row < 0) || (row >= heightMap.length))
        return Infinity;
    if ((col < 0) || (col >= heightMap[row].length))
        return Infinity;
    return heightMap[row][col];
};
var getValleys = function (heightMap) {
    var valleys = [];
    for (var row = 0; row < heightMap.length; row += 1) {
        for (var col = 0; col < heightMap[row].length; col += 1) {
            var elevation = heightMap[row][col];
            if (elevation < getHeight(heightMap, row + 1, col)
                && elevation < getHeight(heightMap, row - 1, col)
                && elevation < getHeight(heightMap, row, col + 1)
                && elevation < getHeight(heightMap, row, col - 1)) {
                valleys.push(elevation);
            }
        }
    }
    return valleys;
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var heightMap = parseData(data);
    var valleys = getValleys(heightMap);
    console.log(valleys.reduce(function (acc, elevation) { return acc + elevation + 1; }, 0));
});
