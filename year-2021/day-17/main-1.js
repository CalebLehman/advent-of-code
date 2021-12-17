"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseRange = function (s) {
    var _a = s.split('..').slice(0, 2), lo = _a[0], hi = _a[1];
    return {
        lo: parseInt(lo, 10),
        hi: parseInt(hi, 10)
    };
};
var parseData = function (data) {
    var xRange = parseRange(data.slice(15).split(',')[0]);
    var yRange = parseRange(data.split(',')[1].slice(3));
    return [xRange, yRange];
};
var computeHorizontalPosition = function (initialVelocity, step) {
    if (initialVelocity < 0)
        return -1 * computeHorizontalPosition(-1 * initialVelocity, step);
    step = Math.min(step, initialVelocity);
    return initialVelocity * step - step * (step - 1) / 2;
};
var findHighestTrajectory = function (xRange, yRange) {
    for (var v = xRange.hi;; v -= 1) {
        var minStep = Math.ceil((2 * v + 1 + Math.sqrt((2 * v + 1) * (2 * v + 1) - 8 * yRange.hi)) / 2);
        var maxStep = Math.floor((2 * v + 1 + Math.sqrt((2 * v + 1) * (2 * v + 1) - 8 * yRange.lo)) / 2);
        for (var step = minStep; step <= maxStep; step += 1) {
            var minSpeed = Math.ceil((1 + Math.sqrt(1 + 8 * xRange.lo)) / 2);
            for (var speed = minSpeed; speed <= xRange.hi; speed += 1) {
                var x = computeHorizontalPosition(speed, step);
                if ((x >= xRange.lo) && (x <= xRange.hi))
                    return v * (v + 1) / 2;
            }
        }
    }
};
fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) {
        console.error(err);
    }
    var _a = parseData(data), xRange = _a[0], yRange = _a[1];
    console.log(findHighestTrajectory(xRange, yRange));
});
