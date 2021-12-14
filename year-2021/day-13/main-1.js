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
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var _a = parseData(data), points = _a[0], folds = _a[1];
    var folded = folds.slice(0, 1).reduce(function (acc, fold) { return applyFold(acc, fold); }, points);
    console.log((new Set(folded)).size);
});
