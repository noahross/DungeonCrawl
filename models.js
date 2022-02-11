"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDamage = exports.Caster = exports.IronDoor = exports.LockedDoor = exports.Door = exports.Hobgoblin = exports.Goblin = exports.Kobold = exports.Spell = exports.Ability = exports.Room = exports.capitalizeFirstLetter = exports.wait = void 0;
const dice_1 = require("./dice");
const dice_2 = require("./dice");
function wait() {
    let ms = 1000;
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
exports.wait = wait;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
class Room {
    constructor() {
        this.exit = getRandomDoor();
        this.enemy = getRandomEnemy();
    }
}
exports.Room = Room;
class Exit {
    constructor(name, isOpen, isLocked, hitPoints) {
        this.name = name;
        this.isOpen = isOpen;
        this.isLocked = isLocked;
        this.hitPoints = hitPoints;
    }
    interact() {
        if (!this.isOpen && this.isLocked) {
            console.log(`${capitalizeFirstLetter(this.name)} is locked.`);
        }
        if (!this.isLocked) {
            let newState = "open";
            if (this.isOpen) {
                newState = "closed";
            }
            this.isOpen = !this.isOpen;
            console.log(`The ${this.name} is now ${newState}.`);
        }
    }
    takeDamage(amount) {
        this.hitPoints -= amount;
        if (this.hitPoints <= 0) {
            this.hitPoints = 0;
            this.isLocked = false;
            console.log(`${capitalizeFirstLetter(this.name)} has been unlocked.`);
            wait();
        }
    }
}
var Ability;
(function (Ability) {
    Ability[Ability["STR"] = 0] = "STR";
    Ability[Ability["DEX"] = 1] = "DEX";
    Ability[Ability["CON"] = 2] = "CON";
    Ability[Ability["INT"] = 3] = "INT";
    Ability[Ability["WIS"] = 4] = "WIS";
    Ability[Ability["CHA"] = 5] = "CHA";
})(Ability = exports.Ability || (exports.Ability = {}));
class Spell {
    constructor(name, target, range, duration, effect, damage) {
        this.name = name;
        this.target = target;
        this.range = range;
        this.duration = duration;
        this.effect = effect;
        this.damage = damage;
    }
}
exports.Spell = Spell;
class Character {
    constructor(name, race, hitPoints, characterClass, abilityScores) {
        this.isAlive = true;
        this.name = name;
        this.race = race;
        (this.hitPoints = hitPoints), (this.characterClass = characterClass), (this.abilityScores = abilityScores);
    }
    takeDamage(amount) {
        this.hitPoints -= amount;
        if (this.hitPoints <= 0) {
            this.hitPoints = 0;
            this.isAlive = false;
            console.log(`${capitalizeFirstLetter(this.name)} has perished.`);
            wait();
        }
    }
}
class Kobold extends Character {
    constructor() {
        super("kobold", "kobold", 8);
    }
}
exports.Kobold = Kobold;
class Goblin extends Character {
    constructor() {
        super("goblin", "goblin", 16);
    }
}
exports.Goblin = Goblin;
class Hobgoblin extends Character {
    constructor() {
        super("hobgoblin", "hobgoblin", 32);
    }
}
exports.Hobgoblin = Hobgoblin;
class Door extends Exit {
    constructor() {
        super("door", false, false, 0);
    }
}
exports.Door = Door;
class LockedDoor extends Exit {
    constructor() {
        super("locked door", false, true, 10);
    }
}
exports.LockedDoor = LockedDoor;
class IronDoor extends Exit {
    constructor() {
        super("iron door", false, true, 20);
    }
}
exports.IronDoor = IronDoor;
class Caster extends Character {
    constructor(spellsKnown, spellList, name, race, hitPoints, characterClass, abilityScores) {
        super(name, race, hitPoints, characterClass, abilityScores);
        this.spellsKnown = spellsKnown;
        this.spellList = spellList;
    }
    castSpell(spell, target) {
        if (spell.damage) {
            let damage = calculateDamage(spell.damage, this.abilityScores);
            let targetName = target.name.charAt(0).toLowerCase() + target.name.slice(1);
            console.log(`${spell.name} does ${damage} damage to ${targetName}.`);
            wait();
            target.takeDamage(damage);
        }
    }
    logSpells() {
        let spellString = "Available spells";
        let index = 0;
        this.spellList.forEach((spell) => {
            spellString += " - " + index + ". " + spell.name;
            index++;
        });
        console.log(spellString);
    }
}
exports.Caster = Caster;
function calculateDamage(damage, abilityScores) {
    let amount = 0;
    if (damage.modifierAbility && abilityScores) {
        amount += getModifier(damage.modifierAbility, abilityScores);
    }
    amount += (0, dice_1.roll)(damage.amount, damage.dice);
    return amount;
}
exports.calculateDamage = calculateDamage;
function getModifier(modifierAbility, abilityScores) {
    let amount = 0;
    const modifier = abilityScores.get(modifierAbility);
    if (abilityScores && modifier) {
        amount += modifier;
    }
    return amount;
}
function getRoom() {
    return new Room();
}
function getRandomDoor() {
    let randomNumber = (0, dice_2.getRandomNumber)(0, 3);
    if (randomNumber === 1) {
        return new Door();
    }
    else if (randomNumber === 2) {
        return new LockedDoor();
    }
    else if (randomNumber === 3) {
        return new IronDoor();
    }
    else {
        return undefined;
    }
}
function getRandomEnemy() {
    let randomNumber = (0, dice_2.getRandomNumber)(1, 3);
    if (randomNumber === 1) {
        return new Kobold();
    }
    else if (randomNumber === 2) {
        return new Goblin();
    }
    else {
        return new Hobgoblin();
    }
}
