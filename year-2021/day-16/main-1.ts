import * as fs from "fs";

type Version = number;
type TypeId = number;

interface Packet {
  version: Version;
  typeId: TypeId;
  subPackets: Packet[];
}
const TYPE_ID = {
  Literal: 4,
};

type Value = number;
interface Literal extends Packet {
  value: Value;
}

type LengthTypeId = number;
interface Operator extends Packet {
  lengthTypeId: LengthTypeId;
}

const getVersion = (bits: string): [Version, string] => {
  return [parseInt(bits.slice(0, 3), 2), bits.slice(3)];
};

const getTypeId = (bits: string): [TypeId, string] => {
  return [parseInt(bits.slice(0, 3), 2), bits.slice(3)];
};

const getLiteralChunk = (bits: string): [boolean, Value, string] => {
  return [bits[0] === "1", parseInt(bits.slice(1, 5), 2), bits.slice(5)];
};

const getPacket = (bits: string): [Packet, string] => {
  const [typeId, _] = getTypeId(getVersion(bits)[1]);
  switch (typeId) {
    case TYPE_ID["Literal"]:
      return getPacketLiteral(bits);
    default:
      return getPacketOperator(bits);
  }
};

const getPacketLiteral = (bits: string): [Literal, string] => {
  const packet: Literal = {
    version: 0,
    typeId: 0,
    subPackets: [],
    value: 0,
  };

  [packet.version, bits] = getVersion(bits);
  [packet.typeId, bits] = getTypeId(bits);
  let areMoreChunks = true;
  while (areMoreChunks) {
    let value: number;
    [areMoreChunks, value, bits] = getLiteralChunk(bits);
    packet.value = 16 * packet.value + value;
  }

  return [packet, bits];
};

const getLengthTypeId = (bits: string): [LengthTypeId, string] => {
  return [parseInt(bits.slice(0, 1), 2), bits.slice(1)];
};

const getPacketOperator = (bits: string): [Operator, string] => {
  const packet: Operator = {
    version: 0,
    typeId: 0,
    subPackets: [],
    lengthTypeId: 0,
  };

  [packet.version, bits] = getVersion(bits);
  [packet.typeId, bits] = getTypeId(bits);
  [packet.lengthTypeId, bits] = getLengthTypeId(bits);
  switch (packet.lengthTypeId) {
    case 0:
      const length = parseInt(bits.slice(0, 15), 2);
      bits = bits.slice(15);
      const remainder = bits.slice(length);
      bits = bits.slice(0, length);
      while (bits.length > 0) {
        let subPacket: Packet;
        [subPacket, bits] = getPacket(bits);
        packet.subPackets.push(subPacket);
      }
      return [packet, remainder];
    case 1:
      const number = parseInt(bits.slice(0, 11), 2);
      bits = bits.slice(11);
      for (let i = 0; i < number; i += 1) {
        let subPacket: Packet;
        [subPacket, bits] = getPacket(bits);
        packet.subPackets.push(subPacket);
      }
      return [packet, bits];
    default:
      throw new Error("unimplemented");
  }
};

const getVersionSum = (packet: Packet): Version => {
  return (
    packet.version +
    packet.subPackets.reduce(
      (acc, subPacket) => acc + getVersionSum(subPacket),
      0
    )
  );
};

const parseData = (data: string): string => {
  return data
    .trim()
    .split("")
    .map((hex) => parseInt(hex, 16).toString(2).padStart(4, "0"))
    .join("");
};

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const bits = parseData(data);
  const [packet, _] = getPacket(bits);
  console.log(getVersionSum(packet));
});
