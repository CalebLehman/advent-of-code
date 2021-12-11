"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    return data.trim().split('\n').map(function (line) {
        var patterns = line.split(' | ')[0].split(' ');
        var outputs = line.split(' | ')[1].split(' ');
        return {
            patterns: patterns,
            outputs: outputs
        };
    });
};
var computeDecoder = function (evidence) {
    // get counts of each symbol
    var counts = {};
    evidence.patterns.forEach(function (pattern) {
        pattern.split('').forEach(function (symbol) {
            counts[symbol] = 1 + (symbol in counts ? counts[symbol] : 0);
        });
    });
    // the 'e', 'b', and 'f' wires appear a unique amount of times across all digits
    var decoder = { a: null, b: null, c: null, d: null, e: null, f: null, g: null };
    Object.keys(counts).forEach(function (symbol) {
        switch (counts[symbol]) {
            case 4:
                decoder[symbol] = 'e';
                break;
            case 6:
                decoder[symbol] = 'b';
                break;
            case 9:
                decoder[symbol] = 'f';
                break;
            default:
        }
    });
    // 'c' occurrs in the digit with 2 segments (1), and is not something we have computed yet
    var cSymbol = evidence.patterns
        .filter(function (pattern) { return pattern.length === 2; })[0]
        .split('')
        .filter(function (symbol) { return decoder[symbol] === null; })[0];
    decoder[cSymbol] = 'c';
    // 'a' occurrs in the digit with 3 segments (7), and is not something we have computed yet
    var aSymbol = evidence.patterns
        .filter(function (pattern) { return pattern.length === 3; })[0]
        .split('')
        .filter(function (symbol) { return decoder[symbol] === null; })[0];
    decoder[aSymbol] = 'a';
    // 'd' occurrs in the digit with 4 segments (4), and is not something we have computed yet
    var dSymbol = evidence.patterns
        .filter(function (pattern) { return pattern.length === 4; })[0]
        .split('')
        .filter(function (symbol) { return decoder[symbol] === null; })[0];
    decoder[dSymbol] = 'd';
    // 'g' occurrs in the digit with 7 segments (8), and is not something we have computed yet
    var gSymbol = evidence.patterns
        .filter(function (pattern) { return pattern.length === 7; })[0]
        .split('')
        .filter(function (symbol) { return decoder[symbol] === null; })[0];
    decoder[gSymbol] = 'g';
    return decoder;
};
var evaluateOuput = function (evidence, decoder) {
    var output = 0;
    evidence.outputs.forEach(function (pattern) {
        switch (pattern.split('').map(function (symbol) { return decoder[symbol]; }).sort().join('')) {
            case 'abcefg':
                output = output * 10 + 0;
                break;
            case 'cf':
                output = output * 10 + 1;
                break;
            case 'acdeg':
                output = output * 10 + 2;
                break;
            case 'acdfg':
                output = output * 10 + 3;
                break;
            case 'bcdf':
                output = output * 10 + 4;
                break;
            case 'abdfg':
                output = output * 10 + 5;
                break;
            case 'abdefg':
                output = output * 10 + 6;
                break;
            case 'acf':
                output = output * 10 + 7;
                break;
            case 'abcdefg':
                output = output * 10 + 8;
                break;
            case 'abcdfg':
                output = output * 10 + 9;
                break;
            default:
                output = NaN;
        }
    });
    return output;
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var evidences = parseData(data);
    var total = evidences.reduce(function (acc, evidence) {
        return acc + evaluateOuput(evidence, computeDecoder(evidence));
    }, 0);
    console.log(total);
});
