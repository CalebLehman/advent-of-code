"use strict";
exports.__esModule = true;
var fs = require("fs");
var parseData = function (data) {
    var lines = data.trim().split('\n');
    var algorithm = lines[0];
    var image = {
        main: lines.slice(2).map(function (line) { return line.split(''); }),
        fill: '.'
    };
    return [algorithm, image];
};
var enhanceImage = function (image, algorithm) {
    var rows = image.main.length;
    var cols = image.main[0].length;
    var getBit = function (row, col) {
        if ((row < 0) || (row >= rows))
            return image.fill === '#' ? 1 : 0;
        if ((col < 0) || (col >= cols))
            return image.fill === '#' ? 1 : 0;
        return image.main[row][col] === '#' ? 1 : 0;
    };
    var expansion = 2;
    var enhancedImage = [];
    for (var row = 0; row < rows + 2 * expansion; row += 1) {
        enhancedImage.push(Array(cols + 2 * expansion).fill(''));
    }
    for (var row = 0; row < rows + 2 * expansion; row += 1) {
        for (var col = 0; col < cols + 2 * expansion; col += 1) {
            var lookup = 0;
            for (var i = -1; i <= 1; i += 1) {
                for (var j = -1; j <= 1; j += 1) {
                    lookup = 2 * lookup + getBit(row + i - expansion, col + j - expansion);
                }
            }
            enhancedImage[row][col] = algorithm[lookup];
        }
    }
    return {
        main: enhancedImage,
        fill: image.fill === '#' ? algorithm[255] : algorithm[0]
    };
};
fs.readFile('input.txt', 'utf-8', function (err, data) {
    var _a;
    if (err) {
        console.error(err);
    }
    var algorithm, image;
    _a = parseData(data), algorithm = _a[0], image = _a[1];
    var passes = 50;
    for (var _ = 0; _ < passes; _ += 1) {
        image = enhanceImage(image, algorithm);
    }
    var lights = 0;
    if (image.fill === '#') {
        lights = Infinity;
    }
    else {
        lights = image.main
            .map(function (line) { return line.filter(function (s) { return s === '#'; }).length; })
            .reduce(function (acc, count) { return acc + count; }, 0);
    }
    console.log(lights);
});
