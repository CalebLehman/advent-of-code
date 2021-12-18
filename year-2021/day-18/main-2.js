"use strict";
exports.__esModule = true;
var fs = require("fs");
var isPlain = function (number) {
    return 'value' in number;
};
var parseNumber = function (s) {
    var _a, _b;
    if (s[0] === '[') {
        var left = void 0;
        var right = void 0;
        s = s.slice(1);
        _a = parseNumber(s), left = _a[0], s = _a[1];
        s = s.slice(1);
        _b = parseNumber(s), right = _b[0], s = _b[1];
        s = s.slice(1);
        var number = {
            left: left,
            right: right,
            parent: null
        };
        left.parent = number;
        right.parent = number;
        return [number, s];
    }
    else {
        var idx = s.search(/[^\d]/);
        if (idx === -1) {
            var number = {
                value: parseInt(s, 10),
                parent: null
            };
            return [number, ''];
        }
        else {
            var number = {
                value: parseInt(s.slice(0, idx), 10),
                parent: null
            };
            return [number, s.slice(idx)];
        }
    }
};
var findExplodable = function (number) {
    var findExplodableHelper = function (number, depth) {
        if (isPlain(number))
            return null;
        if (depth >= 4 && isPlain(number.left) && isPlain(number.right))
            return number;
        var leftTarget = findExplodableHelper(number.left, depth + 1);
        if (leftTarget !== null)
            return leftTarget;
        return findExplodableHelper(number.right, depth + 1);
    };
    return findExplodableHelper(number, 0);
};
var explode = function (number) {
    var leftValue = number.left.value;
    var rightValue = number.right.value;
    var current = number;
    while ((current.parent !== null) && (current.parent.left === current))
        current = current.parent;
    if (current.parent !== null) {
        current = current.parent.left;
        while (!isPlain(current))
            current = current.right;
        current.value += leftValue;
    }
    current = number;
    while ((current.parent !== null) && (current.parent.right === current))
        current = current.parent;
    if (current.parent !== null) {
        current = current.parent.right;
        while (!isPlain(current))
            current = current.left;
        current.value += rightValue;
    }
    if (number.parent.right === number)
        number.parent.right = { value: 0, parent: number.parent };
    else
        number.parent.left = { value: 0, parent: number.parent };
};
var findSplittable = function (number) {
    if (isPlain(number))
        return number.value >= 10 ? number : null;
    var leftTarget = findSplittable(number.left);
    if (leftTarget !== null)
        return leftTarget;
    else
        return findSplittable(number.right);
};
var split = function (number) {
    var value = number.value;
    var left = { value: Math.floor(value / 2), parent: null };
    var right = { value: Math.ceil(value / 2), parent: null };
    var split = {
        left: left,
        right: right,
        parent: number.parent
    };
    left.parent = split;
    right.parent = split;
    if (number.parent.right === number)
        number.parent.right = split;
    else
        number.parent.left = split;
};
var reduce = function (number) {
    while (true) {
        var explodable = findExplodable(number);
        if (explodable !== null) {
            explode(explodable);
            continue;
        }
        var splittable = findSplittable(number);
        if (splittable !== null) {
            split(splittable);
            continue;
        }
        return number;
    }
};
var add = function (left, right) {
    var parent = {
        left: left,
        right: right,
        parent: null
    };
    left.parent = parent;
    right.parent = parent;
    return reduce(parent);
};
var computeMagnitude = function (number) {
    if (isPlain(number))
        return number.value;
    else
        return 3 * computeMagnitude(number.left) + 2 * computeMagnitude(number.right);
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var lines = data.trim().split('\n');
    var maxMagnitude = -Infinity;
    for (var i = 0; i < lines.length; i += 1) {
        for (var j = i + 1; j < lines.length; j += 1) {
            maxMagnitude = Math.max(maxMagnitude, computeMagnitude(add(parseNumber(lines[i])[0], parseNumber(lines[j])[0])), computeMagnitude(add(parseNumber(lines[j])[0], parseNumber(lines[i])[0])));
        }
    }
    console.log(maxMagnitude);
});
