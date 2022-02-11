import * as models from './models';
import { Ability } from './models';
import { spells } from './spells';
import { getRandomNumber } from './dice';
import { askSpell } from './input';

async function main() {
    let isClear: boolean = false;

    let enemyKobold = new models.Kobold();

    let bardClass: models.CharacterClass = {
        name: 'Bard',
        hitDie: 8
    };

    let badassBard = new models.Caster(
        {
            0: 3,
            1: 2
        },
        spells,
        'Six',
        'Half-Elf',
        36,
        bardClass,
        new Map<models.Ability, number>([
            [Ability.STR, 0],
            [Ability.DEX, 1],
            [Ability.CON, 1],
            [Ability.INT, 2],
            [Ability.WIS, 1],
            [Ability.CHA, 4]
        ])
    );

    while (!isClear) {
        let room: models.Room = new models.Room();
        let exitState: string = 'no exit';
        let isLastRoom: boolean = true;

        if (room.exit) {
            isLastRoom = false;
            let article: string = 'a';
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
            let spellIndex: number = await askSpell(badassBard.spellList.length - 1);
            let spell: models.Spell = badassBard.spellList[spellIndex];
            badassBard.castSpell(spell, room.enemy);
        }

        if (room.exit) {
            while (room.exit.isLocked) {
                console.log(`${models.capitalizeFirstLetter(room.exit.name)} is locked.`);
                badassBard.logSpells();
                let spellIndex: number = await askSpell(badassBard.spellList.length - 1);
                let spell: models.Spell = badassBard.spellList[spellIndex];
                badassBard.castSpell(spell, room.exit);
            }
        }

        if (isLastRoom) {
            isClear = true;
        }
    }
    console.log('Congratulations, ' + badassBard.name + "! You've cleared the dungeon!");
}

main();
