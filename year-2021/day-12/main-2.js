"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    var map = {};
    data.trim().split('\n').forEach(function (line) {
        var _a, _b;
        var _c = line.trim().split('-').slice(0, 2), a = _c[0], b = _c[1];
        map[a] = (_a = map[a]) !== null && _a !== void 0 ? _a : [];
        map[a].push(b);
        map[b] = (_b = map[b]) !== null && _b !== void 0 ? _b : [];
        map[b].push(a);
    });
    return map;
};
var isBig = function (cave) {
    return cave === cave.toUpperCase();
};
var canVisit = function (cave, path) {
    if (cave === 'start')
        return false;
    if (isBig(cave))
        return true;
    if (!path.includes(cave))
        return true;
    var smallCaves = path.split(',').filter(function (cave) { return !isBig(cave); });
    return smallCaves.length === (new Set(smallCaves)).size;
};
var countPaths = function (map) {
    var countPathsHelper = function (path, map) {
        var cave = path.split(',').at(-1);
        if (cave === 'end') {
            return 1;
        }
        else {
            return map[cave].reduce(function (acc, neighbor) {
                if (canVisit(neighbor, path))
                    return acc + countPathsHelper(path + ',' + neighbor, map);
                else
                    return acc;
            }, 0);
        }
    };
    return countPathsHelper('start', map);
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var map = parseData(data);
    console.log(countPaths(map));
});
