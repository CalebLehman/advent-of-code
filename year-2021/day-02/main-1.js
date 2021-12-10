"use strict";
exports.__esModule = true;
var fs = require("fs");
var evalPosition = function (position) {
    return position.horizontal * position.depth;
};
var doAction = function (position, action) {
    switch (action.direction) {
        case "forward":
            position.horizontal += action.count;
            break;
        case "down":
            position.depth += action.count;
            break;
        case "up":
            position.depth -= action.count;
            break;
        default:
            position.horizontal = NaN;
            position.depth = NaN;
    }
    return position;
};
var parseActions = function (data) {
    return data.trim().split("\n").map(function (line) {
        var pieces = line.split(" ");
        return {
            direction: pieces[0],
            count: parseInt(pieces[1], 10)
        };
    });
};
fs.readFile("input.txt", "utf8", function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var actions = parseActions(data);
    var finalPosition = actions.reduce(doAction, { horizontal: 0, depth: 0 });
    console.log(evalPosition(finalPosition));
});
