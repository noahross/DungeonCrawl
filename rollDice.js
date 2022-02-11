"use strict";
let amount = 0;
for (var i = 0; i < 1000; i++) {
    if (Math.floor(Math.random() * 8) + 1 === 8) {
        amount++;
    }
}
console.log(amount);
