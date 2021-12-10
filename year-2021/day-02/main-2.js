"use strict";
exports.__esModule = true;
var fs = require("fs");
var evalState = function (state) {
    return state.horizontal * state.depth;
};
var doAction = function (state, action) {
    switch (action.direction) {
        case "forward":
            state.horizontal += action.count;
            state.depth += state.aim * action.count;
            break;
        case "down":
            state.aim += action.count;
            break;
        case "up":
            state.aim -= action.count;
            break;
        default:
            state.horizontal = NaN;
            state.depth = NaN;
            state.aim = NaN;
    }
    return state;
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
    var finalPosition = actions.reduce(doAction, { horizontal: 0, depth: 0, aim: 0 });
    console.log(evalState(finalPosition));
});
