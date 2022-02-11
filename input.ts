import * as readline from 'readline';
const util = require('util');

function ask(question: string): Promise<number> {
    return new Promise((resolve) => {
        let response: string = '';
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question + ' ', (answer) => {
            response = answer;
            rl.close();
        });

        rl.on('close', () => {
            if(response === 'exit') {
                process.exit();
            }
            resolve(Number(response));
        });
    });
}

export async function askSpell(max: number): Promise<number> {
    let question: string = 'What spell will you cast?';
    let answer: number = await ask(question);
    while(isNaN(answer) || answer > max || answer < 0) {
        let error: string = answer.toString();
        if(isNaN(answer)) {
            console.log(error);
            error = 'not a number';
        }
        console.log('Invalid input: ' + error);
        answer = await ask(question);
    }
    return answer;
}