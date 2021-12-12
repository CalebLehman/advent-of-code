"use strict";
exports.__esModule = true;
var fs = require("fs");
var isOpener = function (delimiter) {
    return ['(', '[', '{', '<'].includes(delimiter);
};
var getMatch = function (opener) {
    switch (opener) {
        case '(':
            return ')';
        case '[':
            return ']';
        case '{':
            return '}';
        case '<':
            return '>';
    }
};
var isMatch = function (opener, closer) {
    return getMatch(opener) === closer;
};
var getCompletionString = function (chunks) {
    var stack = [];
    for (var i = 0; i < chunks.length; i += 1) {
        var delimiter = chunks[i];
        if (isOpener(delimiter)) {
            stack.push(delimiter);
        }
        else {
            var opener_1 = stack.pop();
            if (!isMatch(opener_1, delimiter)) {
                return null;
            }
        }
    }
    return stack.reverse().map(getMatch);
};
var scoreCloser = function (closer) {
    switch (closer) {
        case ')':
            return 1;
        case ']':
            return 2;
        case '}':
            return 3;
        case '>':
            return 4;
    }
};
var scoreCompletions = function (completions) {
    var scores = completions.map(function (completion) {
        return completion.reduce(function (acc, closer) { return acc * 5 + scoreCloser(closer); }, 0);
    });
    return scores.sort(function (a, b) { return a - b; })[(scores.length - 1) / 2];
};
var parseData = function (data) {
    return data.trim().split('\n').map(function (line) { return line.split(''); });
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var parsedData = parseData(data);
    var completions = parsedData.map(getCompletionString).filter(function (closer) { return closer !== null; });
    console.log(scoreCompletions(completions));
});
