"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spells = void 0;
const dice_1 = require("./dice");
const models_1 = require("./models");
exports.spells = [
    {
        name: 'Magic Missile',
        target: 'Character',
        range: 120,
        damage: {
            dice: dice_1.Dice.d4,
            amount: 2,
            type: 'Physical'
        }
    },
    {
        name: 'Booming Blade',
        target: 'Character',
        range: 10,
        duration: {
            duration: 10,
            durationMetric: 'rounds'
        },
        damage: {
            dice: dice_1.Dice.d8,
            amount: 1,
            modifierAbility: models_1.Ability.CHA,
            type: 'Sonic'
        }
    }
];
