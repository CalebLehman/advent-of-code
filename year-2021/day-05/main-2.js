"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    var regex = /\d+/g;
    return data.trim().split('\n').map(function (line) {
        var numbers = line.match(regex).map(function (n) { return parseInt(n, 10); });
        return {
            x1: numbers[0],
            y1: numbers[1],
            x2: numbers[2],
            y2: numbers[3]
        };
    });
};
var countDanger = function (lines) {
    var xMin = +Infinity;
    var xMax = -Infinity;
    var yMin = +Infinity;
    var yMax = -Infinity;
    lines.forEach(function (line) {
        xMin = Math.min(xMin, line.x1, line.x2);
        xMax = Math.max(xMax, line.x1, line.x2);
        yMin = Math.min(yMin, line.y1, line.y2);
        yMax = Math.max(yMax, line.y1, line.y2);
    });
    var hits = [];
    for (var y = 0; y < yMax - yMin + 1; y += 1) {
        hits.push(Array(xMax - xMin + 1).fill(0));
    }
    lines.forEach(function (line) {
        if (line.x1 === line.x2) {
            for (var y = 0; y < Math.abs(line.y1 - line.y2) + 1; y += 1) {
                hits[y + Math.min(line.y1, line.y2) - yMin][line.x1 - xMin] += 1;
            }
        }
        else if (line.y1 === line.y2) {
            for (var x = 0; x < Math.abs(line.x1 - line.x2) + 1; x += 1) {
                hits[line.y1 - yMin][x + Math.min(line.x1, line.x2) - xMin] += 1;
            }
        }
        else if ((line.y1 - line.y2) * (line.x1 - line.x2) > 0) {
            for (var y = 0; y < Math.abs(line.y1 - line.y2) + 1; y += 1) {
                hits[y + Math.min(line.y1, line.y2) - yMin][y + Math.min(line.x1, line.x2) - xMin] += 1;
            }
        }
        else {
            for (var y = 0; y < Math.abs(line.y1 - line.y2) + 1; y += 1) {
                hits[y + Math.min(line.y1, line.y2) - yMin][Math.max(line.x1, line.x2) - y - xMin] += 1;
            }
        }
    });
    /*
    hits.forEach(line => {
      console.log(line.join(' '))
    })
    */
    return hits
        .map(function (row) { return row.filter(function (count) { return count > 1; }).length; })
        .reduce(function (acc, line) { return acc + line; }, 0);
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    console.log(countDanger(parseData(data)));
});
