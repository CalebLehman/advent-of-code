"use strict";
exports.__esModule = true;
var fs = require("fs");
var invertDiagnosticBit = function (bit) {
    return bit === 0 ? 1 : 0;
};
var getConsensusBitAtIdx = function (report, idx, majority) {
    if (majority === void 0) { majority = true; }
    var majorityBit = report.reduce(function (count, value) { return count + value[idx]; }, 0) >= report.length / 2 ? 1 : 0;
    return majority ? majorityBit : invertDiagnosticBit(majorityBit);
};
var filterReportByIdx = function (report, idx, majority) {
    if (majority === void 0) { majority = true; }
    if (report.length === 0) {
        return [];
    }
    var consensusBit = getConsensusBitAtIdx(report, idx, majority);
    return report.filter(function (value) { return value[idx] === consensusBit; });
};
var getGammaRate = function (report) {
    if (report.length === 0) {
        return 0;
    }
    var n = report[0].length;
    var gammaRate = 0;
    for (var idx = 0; idx < n; idx += 1) {
        gammaRate = gammaRate * 2 + getConsensusBitAtIdx(report, idx);
    }
    return gammaRate;
};
var getEpsilonRate = function (report) {
    if (report.length === 0) {
        return 0;
    }
    var n = report[0].length;
    var epsilonRate = 0;
    for (var idx = 0; idx < n; idx += 1) {
        epsilonRate = epsilonRate * 2 + getConsensusBitAtIdx(report, idx, false);
    }
    return epsilonRate;
};
var getOxygenGeneratorRating = function (report) {
    if (report.length === 0) {
        return 0;
    }
    for (var idx = 0; report.length > 1; idx += 1) {
        report = filterReportByIdx(report, idx);
    }
    return parseInt(report[0].map(function (bit) { return bit.toString(); }).join(''), 2);
};
var getCO2ScrubberRating = function (report) {
    if (report.length === 0) {
        return 0;
    }
    for (var idx = 0; report.length > 1; idx += 1) {
        report = filterReportByIdx(report, idx, false);
    }
    return parseInt(report[0].map(function (bit) { return bit.toString(); }).join(''), 2);
};
var processData = function (data) {
    return data.trim().split('\n').map(function (line) {
        return line.split('').map(function (character) { return character === '1' ? 1 : 0; });
    });
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var report = processData(data);
    console.log(getOxygenGeneratorRating(report) * getCO2ScrubberRating(report));
});
