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
var getBasins = function (heightMap) {
    var basins = [];
    for (var row = 0; row < heightMap.length; row += 1) {
        for (var col = 0; col < heightMap[row].length; col += 1) {
            var basin = 0;
            var level = [{ r: row, c: col }];
            while (level.length > 0) {
                var _a = level.pop(), r = _a.r, c = _a.c;
                if (getHeight(heightMap, r, c) < 9) {
                    heightMap[r][c] = 9;
                    basin += 1;
                    level.push({ r: r + 1, c: c }, { r: r - 1, c: c }, { r: r, c: c + 1 }, { r: r, c: c - 1 });
                }
            }
            basins.push(basin);
        }
    }
    return basins;
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var heightMap = parseData(data);
    var basins = getBasins(heightMap);
    var product = basins
        .sort(function (a, b) { return a - b; })
        .slice(basins.length - 3, basins.length)
        .reduce(function (acc, basin) { return acc * basin; }, 1);
    console.log(product);
});
