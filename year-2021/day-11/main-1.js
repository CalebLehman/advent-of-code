"use strict";
exports.__esModule = true;
var fs = require("fs");
var Grid = /** @class */ (function () {
    function Grid(grid) {
        this.grid = grid;
    }
    Grid.prototype.increment = function (i, j) {
        if (i < 0 || i >= this.grid.length)
            return NaN;
        if (j < 0 || j >= this.grid[i].length)
            return NaN;
        this.grid[i][j] += 1;
        return this.grid[i][j];
    };
    Grid.prototype.step = function () {
        var full = [];
        for (var i = 0; i < this.grid.length; i += 1) {
            for (var j = 0; j < this.grid[i].length; j += 1) {
                if (this.increment(i, j) === Grid.MAX) {
                    full.push({ row: i, col: j });
                }
            }
        }
        var clears = [];
        var flashes = 0;
        while (full.length > 0) {
            var _a = full.pop(), i = _a.row, j = _a.col;
            clears.push({ row: i, col: j });
            flashes += 1;
            for (var iDelta = -1; iDelta <= 1; iDelta += 1) {
                for (var jDelta = -1; jDelta <= 1; jDelta += 1) {
                    if (this.increment(i + iDelta, j + jDelta) === Grid.MAX) {
                        full.push({ row: i + iDelta, col: j + jDelta });
                    }
                }
            }
        }
        while (clears.length > 0) {
            var _b = clears.pop(), i = _b.row, j = _b.col;
            this.grid[i][j] = 0;
        }
        return flashes;
    };
    Grid.MAX = 10;
    return Grid;
}());
var parseData = function (data) {
    return new Grid(data.trim().split('\n').map(function (line) {
        return line.trim().split('').map(function (s) { return parseInt(s, 10); });
    }));
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var grid = parseData(data);
    var flashes = 0;
    for (var i = 0; i < 100; i += 1) {
        flashes += grid.step();
    }
    console.log(flashes);
});
