// file: models.test.js
import * as dice from "../dice";
import * as models from "../models";

test('calculateDamage with no abilityScores returns <= 8', () => {
    expect(
        models.calculateDamage({
            dice: dice.Dice.d4,
            amount: 2,
            type: 'Physical'
        })
    ).toBeLessThanOrEqual(8);
})

test('calculateDamage with no abilityScores returns >= 2', () => {
    expect(
        models.calculateDamage({
            dice: dice.Dice.d4,
            amount: 2,
            type: 'Physical'
        })
    ).toBeGreaterThanOrEqual(2);
})