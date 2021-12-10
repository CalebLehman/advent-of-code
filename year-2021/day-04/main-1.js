"use strict";
exports.__esModule = true;
var fs = require("fs");
var hasBingo = function (board, numbers) {
    for (var i = 0; i < board.length; i += 1) {
        var bingo = true;
        for (var j = 0; j < board[i].length; j += 1) {
            bingo = bingo && (numbers.includes(board[i][j]));
        }
        if (bingo) {
            return true;
        }
    }
    for (var j = 0; j < board[0].length; j += 1) {
        var bingo = true;
        for (var i = 0; i < board.length; i += 1) {
            bingo = bingo && (numbers.includes(board[i][j]));
        }
        if (bingo) {
            return true;
        }
    }
    return false;
};
var scoreBingo = function (board, numbers) {
    var score = 0;
    for (var i = 0; i < board.length; i += 1) {
        for (var j = 0; j < board[i].length; j += 1) {
            if (!numbers.includes(board[i][j])) {
                score += board[i][j];
            }
        }
    }
    return score * numbers.at(-1);
};
var runGame = function (game) {
    for (var i = 0; i < game.numbers.length; i += 1) {
        var currentNumbers = game.numbers.slice(0, i + 1);
        for (var j = 0; j < game.boards.length; j += 1) {
            if (hasBingo(game.boards[j], currentNumbers)) {
                return scoreBingo(game.boards[j], currentNumbers);
            }
        }
    }
    return 0;
};
var parseData = function (data) {
    var lines = data.trim().split('\n');
    var numbers = lines[0]
        .trim()
        .split(',')
        .map(function (s) { return parseInt(s, 10); });
    var boards = [];
    for (var i = 1; i < lines.length; i += 1) {
        var line = lines[i].trim();
        if (line === '') {
            boards.push([]);
        }
        else {
            boards.at(-1).push(line.split(/[ ]+/).map(function (s) { return parseInt(s, 10); }));
        }
    }
    return {
        numbers: numbers,
        boards: boards
    };
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var game = parseData(data);
    console.log(runGame(game));
});
