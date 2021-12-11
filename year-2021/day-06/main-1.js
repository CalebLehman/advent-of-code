"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    return data.trim().split(',').map(function (s) { return parseInt(s, 10); });
};
var computeLineage = function (daysUntilSpawn, days, adultRespawn, childRespawn) {
    if (days < 0)
        return NaN;
    var dp = Array(days + 1).fill(0);
    var helper = function (daysUntilSpawn, days) {
        if (days <= 0)
            return 1;
        if (daysUntilSpawn > 0)
            return helper(0, days - daysUntilSpawn);
        if (dp[days] === 0)
            dp[days] = helper(childRespawn, days - 1) + helper(adultRespawn, days - 1);
        return dp[days];
    };
    return daysUntilSpawn.reduce(function (acc, fish) { return acc + helper(fish, days); }, 0);
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    }
    var fish = parseData(data);
    var days = 80;
    var adultRespawn = 6;
    var childRespawn = 8;
    console.log(computeLineage(fish, days, adultRespawn, childRespawn));
});
