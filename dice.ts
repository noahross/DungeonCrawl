export enum Dice {
    d4 = 4,
    d6 = 6,
    d8 = 8,
    d10 = 10,
    d12 = 12,
    d20 = 20,
    d100 = 100
}

export function roll(amount: number, dice: Dice): number {
    return getRandomNumber(amount, amount * dice);
}

export function getRandomNumber(min: number, max: number): number {
    let amount: number;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}