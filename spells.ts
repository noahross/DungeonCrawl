import {Dice} from "./dice";
import {Spell} from "./models";
import {Ability} from "./models"

export var spells: Spell[] = [
    {
        name: 'Magic Missile',
        target: 'Character',
        range: 120,
        damage: {
            dice: Dice.d4,
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
            dice: Dice.d8,
            amount: 1,
            modifierAbility: Ability.CHA,
            type: 'Sonic'
        }
    }
];