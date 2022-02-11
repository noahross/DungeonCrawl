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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models = __importStar(require("./models"));
const models_1 = require("./models");
const spells_1 = require("./spells");
const input_1 = require("./input");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let isClear = false;
        let enemyKobold = new models.Kobold();
        let bardClass = {
            name: 'Bard',
            hitDie: 8
        };
        let badassBard = new models.Caster({
            0: 3,
            1: 2
        }, spells_1.spells, 'Six', 'Half-Elf', 36, bardClass, new Map([
            [models_1.Ability.STR, 0],
            [models_1.Ability.DEX, 1],
            [models_1.Ability.CON, 1],
            [models_1.Ability.INT, 2],
            [models_1.Ability.WIS, 1],
            [models_1.Ability.CHA, 4]
        ]));
        while (!isClear) {
            let room = new models.Room();
            let exitState = 'no exit';
            let isLastRoom = true;
            if (room.exit) {
                isLastRoom = false;
                let article = 'a';
                if (room.exit.name === 'iron door') {
                    article = 'an';
                }
                exitState = article + ' ' + room.exit.name;
            }
            console.log(`You enter a room with ${exitState}.`);
            models.wait();
            while (room.enemy.isAlive) {
                console.log(`${models.capitalizeFirstLetter(room.enemy.name)} has ${room.enemy.hitPoints} hit points.`);
                models.wait();
                badassBard.logSpells();
                let spellIndex = yield (0, input_1.askSpell)(badassBard.spellList.length - 1);
                let spell = badassBard.spellList[spellIndex];
                badassBard.castSpell(spell, room.enemy);
            }
            if (room.exit) {
                while (room.exit.isLocked) {
                    console.log(`${models.capitalizeFirstLetter(room.exit.name)} is locked.`);
                    badassBard.logSpells();
                    let spellIndex = yield (0, input_1.askSpell)(badassBard.spellList.length - 1);
                    let spell = badassBard.spellList[spellIndex];
                    badassBard.castSpell(spell, room.exit);
                }
            }
            if (isLastRoom) {
                isClear = true;
            }
        }
        console.log('Congratulations, ' + badassBard.name + "! You've cleared the dungeon!");
    });
}
main();
