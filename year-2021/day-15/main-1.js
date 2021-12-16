"use strict";
exports.__esModule = true;
var fs = require("fs");
var stringify = function (point) {
    return point.row + ',' + point.col;
};
var parseData = function (data) {
    return data.trim().split('\n').map(function (line) {
        return line.split('').map(function (s) { return parseInt(s, 10); });
    });
};
var minPath = function (grid) {
    var rows = grid.length;
    var cols = grid[0].length;
    var unvisited = {};
    var distance = {};
    for (var row = 0; row < rows; row += 1) {
        for (var col = 0; col < cols; col += 1) {
            var point = stringify({ row: row, col: col });
            distance[point.toString()] = Infinity;
            unvisited[point.toString()] = true;
        }
    }
    distance[stringify({ row: 0, col: 0 })] = 0;
    var _loop_1 = function () {
        var minPoint = '';
        var minDistance = Infinity;
        for (var point in unvisited) {
            if (unvisited[point] && distance[point] < minDistance) {
                minPoint = point;
                minDistance = distance[point];
            }
        }
        var row = parseInt(minPoint.split(',')[0], 10);
        var col = parseInt(minPoint.split(',')[1], 10);
        var neighbors = [
            { row: row - 1, col: col },
            { row: row + 1, col: col },
            { row: row, col: col - 1 },
            { row: row, col: col + 1 },
        ];
        neighbors.forEach(function (point) {
            var s = stringify(point);
            if (unvisited[s]) {
                distance[s] = Math.min(distance[s], distance[minPoint] + grid[point.row][point.col]);
            }
        });
        unvisited[minPoint] = false;
    };
    while (unvisited[stringify({ row: rows - 1, col: cols - 1 })]) {
        _loop_1();
    }
    return distance[stringify({ row: rows - 1, col: cols - 1 })];
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var grid = parseData(data);
    console.log(minPath(grid));
});
