"use strict";
exports.__esModule = true;
var fs = require("fs");
var TYPE_ID = {
    Literal: 4
};
var getVersion = function (bits) {
    return [parseInt(bits.slice(0, 3), 2), bits.slice(3)];
};
var getTypeId = function (bits) {
    return [parseInt(bits.slice(0, 3), 2), bits.slice(3)];
};
var getLiteralChunk = function (bits) {
    return [bits[0] === "1", parseInt(bits.slice(1, 5), 2), bits.slice(5)];
};
var getPacket = function (bits) {
    var _a = getTypeId(getVersion(bits)[1]), typeId = _a[0], _ = _a[1];
    switch (typeId) {
        case TYPE_ID["Literal"]:
            return getPacketLiteral(bits);
        default:
            return getPacketOperator(bits);
    }
};
var getPacketLiteral = function (bits) {
    var _a, _b, _c;
    var packet = {
        version: 0,
        typeId: 0,
        subPackets: [],
        value: 0
    };
    _a = getVersion(bits), packet.version = _a[0], bits = _a[1];
    _b = getTypeId(bits), packet.typeId = _b[0], bits = _b[1];
    var areMoreChunks = true;
    while (areMoreChunks) {
        var value = void 0;
        _c = getLiteralChunk(bits), areMoreChunks = _c[0], value = _c[1], bits = _c[2];
        packet.value = 16 * packet.value + value;
    }
    return [packet, bits];
};
var getLengthTypeId = function (bits) {
    return [parseInt(bits.slice(0, 1), 2), bits.slice(1)];
};
var getPacketOperator = function (bits) {
    var _a, _b, _c, _d, _e;
    var packet = {
        version: 0,
        typeId: 0,
        subPackets: [],
        lengthTypeId: 0
    };
    _a = getVersion(bits), packet.version = _a[0], bits = _a[1];
    _b = getTypeId(bits), packet.typeId = _b[0], bits = _b[1];
    _c = getLengthTypeId(bits), packet.lengthTypeId = _c[0], bits = _c[1];
    switch (packet.lengthTypeId) {
        case 0:
            var length_1 = parseInt(bits.slice(0, 15), 2);
            bits = bits.slice(15);
            var remainder = bits.slice(length_1);
            bits = bits.slice(0, length_1);
            while (bits.length > 0) {
                var subPacket = void 0;
                _d = getPacket(bits), subPacket = _d[0], bits = _d[1];
                packet.subPackets.push(subPacket);
            }
            return [packet, remainder];
        case 1:
            var number = parseInt(bits.slice(0, 11), 2);
            bits = bits.slice(11);
            for (var i = 0; i < number; i += 1) {
                var subPacket = void 0;
                _e = getPacket(bits), subPacket = _e[0], bits = _e[1];
                packet.subPackets.push(subPacket);
            }
            return [packet, bits];
        default:
            throw new Error("unimplemented");
    }
};
var getVersionSum = function (packet) {
    return (packet.version +
        packet.subPackets.reduce(function (acc, subPacket) { return acc + getVersionSum(subPacket); }, 0));
};
var parseData = function (data) {
    return data
        .trim()
        .split("")
        .map(function (hex) { return parseInt(hex, 16).toString(2).padStart(4, "0"); })
        .join("");
};
fs.readFile("input.txt", "utf-8", function (err, data) {
    if (err) {
        console.error(err);
    }
    var bits = parseData(data);
    var _a = getPacket(bits), packet = _a[0], _ = _a[1];
    console.log(getVersionSum(packet));
});
