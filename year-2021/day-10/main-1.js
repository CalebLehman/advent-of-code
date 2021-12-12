"use strict";
exports.__esModule = true;
var fs = require("fs");
var isOpener = function (delimiter) {
    return ['(', '[', '{', '<'].includes(delimiter);
};
var isMatch = function (opener, closer) {
    return (opener === '(' && closer === ')')
        || (opener === '[' && closer === ']')
        || (opener === '{' && closer === '}')
        || (opener === '<' && closer === '>');
};
var getFirstInvalidCloser = function (chunks) {
    var stack = [];
    for (var i = 0; i < chunks.length; i += 1) {
        var delimiter = chunks[i];
        if (isOpener(delimiter)) {
            stack.push(delimiter);
        }
        else {
            var opener_1 = stack.pop();
            if (!isMatch(opener_1, delimiter)) {
                return delimiter;
            }
        }
    }
    return null;
};
var scoreCloser = function (closer) {
    switch (closer) {
        case ')':
            return 3;
        case ']':
            return 57;
        case '}':
            return 1197;
        case '>':
            return 25137;
    }
};
var parseData = function (data) {
    return data.trim().split('\n').map(function (line) { return line.split(''); });
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var parsedData = parseData(data);
    var invalidClosers = parsedData.map(getFirstInvalidCloser).filter(function (closer) { return closer !== null; });
    console.log(invalidClosers.reduce(function (acc, closer) { return acc + scoreCloser(closer); }, 0));
});
