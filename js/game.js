// game.js
function roll(die=6){
    return Math.round(Math.random()*die);
}

console.log(roll());