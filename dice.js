"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNumber = exports.roll = exports.Dice = void 0;
var Dice;
(function (Dice) {
    Dice[Dice["d4"] = 4] = "d4";
    Dice[Dice["d6"] = 6] = "d6";
    Dice[Dice["d8"] = 8] = "d8";
    Dice[Dice["d10"] = 10] = "d10";
    Dice[Dice["d12"] = 12] = "d12";
    Dice[Dice["d20"] = 20] = "d20";
    Dice[Dice["d100"] = 100] = "d100";
})(Dice = exports.Dice || (exports.Dice = {}));
function roll(amount, dice) {
    return getRandomNumber(amount, amount * dice);
}
exports.roll = roll;
function getRandomNumber(min, max) {
    let amount;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandomNumber = getRandomNumber;
