import {Dice} from "./dice";
import {roll} from "./dice";
import {getRandomNumber} from "./dice";

export function wait() {
    let ms: number = 1000;
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export interface Interactable {
    interact(): void;
}

export interface Openable extends Interactable{
    isOpen: boolean;
    isLocked: boolean;

    interact(): void;
}

export class Room {
    exit: Exit | undefined;
    enemy: Character;

    constructor() {
        this.exit = getRandomDoor();
        this.enemy = getRandomEnemy();
    }
}

abstract class Exit implements Openable, Attackable{
    name: string;
    isOpen: boolean;
    isLocked: boolean;
    hitPoints: number;

    constructor(name: string, isOpen: boolean, isLocked: boolean, hitPoints: number) {
        this.name = name;
        this.isOpen = isOpen;
        this.isLocked = isLocked;
        this.hitPoints = hitPoints;
    }

    interact(): void {
        if(!this.isOpen && this.isLocked) {
            console.log(`${capitalizeFirstLetter(this.name)} is locked.`);
        }
        if(!this.isLocked) {
            let newState: string = 'open';
            if(this.isOpen) {
                newState = 'closed';
            }
            this.isOpen = !this.isOpen;
            console.log(`The ${this.name} is now ${newState}.`);
        }
    }

    takeDamage(amount: number): void {
        this.hitPoints -= amount;
        if (this.hitPoints <= 0) {
            this.hitPoints = 0;
            this.isLocked = false;
            console.log(`${capitalizeFirstLetter(this.name)} has been unlocked.`);
            wait();
        }
    }
}

export enum Ability {
    STR,
    DEX,
    CON,
    INT,
    WIS,
    CHA
}

export interface Duration {
    duration: number;
    durationMetric: string;
}

export interface Effect {
    effect: string;
}

export interface Damage {
    dice: Dice;
    amount: number;
    modifierAbility?: Ability;
    type: string;
}

export interface Actionable {
    target: string;
    range: number;
    duration?: Duration;
    effect?: Effect;
    damage?: Damage;
}

export class Spell implements Actionable {
    name: string;
    target: string;
    range: number;
    duration?: Duration;
    effect?: Effect;
    damage?: Damage;

    constructor(
        name: string,
        target: string,
        range: number,
        duration?: Duration,
        effect?: Effect,
        damage?: Damage
    ) {
        this.name = name;
        this.target = target;
        this.range = range;
        this.duration = duration;
        this.effect = effect;
        this.damage = damage;
    }
}

export interface CharacterClass {
    name: string;
    hitDie: number;
}

export interface Attackable {
    name: string;
    hitPoints: number;

    takeDamage(amount: number): void;
}

abstract class Character implements Attackable {
    name: string;
    race: string;
    hitPoints: number;
    isAlive: boolean = true;
    characterClass?: CharacterClass;
    abilityScores?: Map<Ability, number>;

    constructor(
        name: string,
        race: string,
        hitPoints: number,
        characterClass?: CharacterClass,
        abilityScores?: Map<Ability, number>
    ) {
        this.name = name;
        this.race = race;
        (this.hitPoints = hitPoints), (this.characterClass = characterClass), (this.abilityScores = abilityScores);
    }

    takeDamage(amount: number): void {
        this.hitPoints -= amount;
        if (this.hitPoints <= 0) {
            this.hitPoints = 0;
            this.isAlive = false;
            console.log(`${capitalizeFirstLetter(this.name)} has perished.`);
            wait();
        }
    }
}

export class Kobold extends Character {
    constructor() {
        super('kobold', 'kobold', 8);
    }
}

export class Goblin extends Character {
    constructor() {
        super('goblin', 'goblin', 16);
    }
}

export class Hobgoblin extends Character {
    constructor() {
        super('hobgoblin', 'hobgoblin', 32);
    }
}

export class Door extends Exit {
    constructor() {
        super('door', false, false, 0);
    }
}

export class LockedDoor extends Exit {
    constructor() {
        super('locked door', false, true, 10);
    }
}

export class IronDoor extends Exit {
    constructor() {
        super('iron door', false, true, 20);
    }
}

export interface SpellsKnown {
    [spellLevel: number]: number;
}

export class Caster extends Character {
    spellsKnown: SpellsKnown;
    spellList: Spell[];

    constructor(
        spellsKnown: SpellsKnown,
        spellList: Spell[],
        name: string,
        race: string,
        hitPoints: number,
        characterClass?: CharacterClass,
        abilityScores?: Map<Ability, number>
    ) {
        super(name, race, hitPoints, characterClass, abilityScores);
        this.spellsKnown = spellsKnown;
        this.spellList = spellList;
    }

    castSpell(spell: Spell, target: Attackable): void {
        if (spell.damage) {
            let damage: number = calculateDamage(spell.damage, this.abilityScores);
            let targetName: string = target.name.charAt(0).toLowerCase() + target.name.slice(1);
            console.log(`${spell.name} does ${damage} damage to ${targetName}.`);
            wait();
            target.takeDamage(damage);
        }
    }

    logSpells() {
        let spellString: string = 'Available spells';
        let index: number = 0;
        this.spellList.forEach(spell => {
            spellString += ' - ' + index + '. ' + spell.name;
            index++;
        });
        console.log(spellString);
    }
}

export function calculateDamage(damage: Damage, abilityScores?: Map<Ability, number>): number {
    let amount: number = 0;
    if (damage.modifierAbility && abilityScores) {
        amount += getModifier(damage.modifierAbility, abilityScores);
    }
    amount += roll(damage.amount, damage.dice);
    return amount;
}

function getModifier(modifierAbility: Ability, abilityScores: Map<Ability, number>) {
    let amount: number = 0;
    const modifier: number | undefined = abilityScores.get(modifierAbility);
    if (abilityScores && modifier) {
        amount += modifier;
    }
    return amount;
}

function getRoom(): Room {
    return new Room();
}

function getRandomDoor(): Exit | undefined {
    let randomNumber: number = getRandomNumber(0,3);

    if(randomNumber === 1) {
        return new Door();
    } else if(randomNumber === 2) {
        return new LockedDoor();
    } else if(randomNumber === 3) {
        return new IronDoor();
    } else {
        return undefined;
    }
}

function getRandomEnemy(): Character {
    let randomNumber: number = getRandomNumber(1,3);

    if(randomNumber === 1) {
        return new Kobold();
    } else if(randomNumber === 2) {
        return new Goblin();
    } else {
        return new Hobgoblin();
    }
}
