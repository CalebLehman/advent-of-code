"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    var lines = data.trim().split('\n');
    var points = lines.filter(function (line) { return !(line.startsWith('fold along') || line === ''); });
    var folds = lines.filter(function (line) { return line.startsWith('fold along'); });
    return [points, folds];
};
var applyFold = function (points, fold) {
    var _a = fold.split('=').slice(0, 2), axis = _a[0], value = _a[1];
    var foldX = axis.endsWith('x') ? parseInt(value, 10) : Infinity;
    var foldY = axis.endsWith('y') ? parseInt(value, 10) : Infinity;
    return points.map(function (point) {
        var _a = point.split(',').map(function (v) { return parseInt(v, 10); }).slice(0, 2), x = _a[0], y = _a[1];
        return [
            2 * Math.min(x, foldX) - x,
            2 * Math.min(y, foldY) - y
        ].join(',');
    });
};
var drawPoints = function (points) {
    var rows = Math.max.apply(Math, points.map(function (point) { return parseInt(point.split(',')[1], 10); })) + 1;
    var cols = Math.max.apply(Math, points.map(function (point) { return parseInt(point.split(',')[0], 10); })) + 1;
    var image = [];
    for (var row = 0; row < rows; row += 1) {
        image.push(Array(cols).fill(' '));
    }
    points.forEach(function (point) {
        var _a = point.split(',').map(function (v) { return parseInt(v, 10); }).slice(0, 2), x = _a[0], y = _a[1];
        image[y][x] = '#';
    });
    return image.map(function (row) { return row.join(''); }).join('\n');
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var _a = parseData(data), points = _a[0], folds = _a[1];
    console.log(drawPoints(folds.reduce(function (acc, fold) { return applyFold(acc, fold); }, points)));
});
