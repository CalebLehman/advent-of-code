"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    var caves = [];
    var map = {};
    data.trim().split('\n').forEach(function (line) {
        var _a, _b;
        var _c = line.trim().split('-').slice(0, 2), a = _c[0], b = _c[1];
        if (!caves.includes(a))
            caves.push(a);
        map[a] = (_a = map[a]) !== null && _a !== void 0 ? _a : [];
        map[a].push(b);
        if (!caves.includes(b))
            caves.push(b);
        map[b] = (_b = map[b]) !== null && _b !== void 0 ? _b : [];
        map[b].push(a);
    });
    return [caves, map];
};
var isBig = function (cave) {
    return cave === cave.toUpperCase();
};
var canVisit = function (cave, path) {
    return isBig(cave) || !path.includes(cave);
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
var explore = function (caves, map) {
    var paths = {};
    caves.forEach(function (cave) {
        paths[cave] = new Set();
    });
    paths['start'].add('start');
    var foundPath = true;
    while (foundPath) {
        foundPath = false;
        caves.forEach(function (cave) {
            map[cave].forEach(function (neighbor) {
                var count = paths[cave].size;
                var oldPaths = Array.from(paths[cave].values());
                var newPaths = Array.from(paths[neighbor].values())
                    .filter(function (path) { return isBig(cave) || !path.includes(cave); })
                    .map(function (path) { return path + ',' + cave; });
                paths[cave] = new Set(oldPaths.concat(newPaths));
                foundPath = foundPath || paths[cave].size > count;
            });
        });
    }
    return paths['end'].size;
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var _a = parseData(data), caves = _a[0], map = _a[1];
    console.log(countPaths(map));
    console.log(explore(caves, map));
});
