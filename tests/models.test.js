"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// file: models.test.js
const dice = __importStar(require("../dice"));
const models = __importStar(require("../models"));
test('calculateDamage with no abilityScores returns <= 8', () => {
    expect(models.calculateDamage({
        dice: dice.Dice.d4,
        amount: 2,
        type: 'Physical'
    })).toBeLessThanOrEqual(8);
});
test('calculateDamage with no abilityScores returns >= 2', () => {
    expect(models.calculateDamage({
        dice: dice.Dice.d4,
        amount: 2,
        type: 'Physical'
    })).toBeGreaterThanOrEqual(2);
});
