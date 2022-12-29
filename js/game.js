// game.js
function main(num_simulations, num_players, board_length){
    for(let i = 0; i< num_simulations; i++){
        console.log(i);
        newGame = game(num_players, board_length)
    }
    return 0;
}

function game(num_players, board_length){
    // board
    const board = [];
    // bumps
    let bumps = 0;
    // turns
    let turns = 0;
    // winner
    let winner = 0;
    // victory
    let victory = false;

    turns()

}

function roll(die=6){
    return Math.round(Math.random()*die);
}

function move(player){
    
    // establish pawn position

    // get roll
    
    return 0;
}

function turns(){
    let victory = false;
    // while not victory
    while(! victory){
        // for each player
        for(let j=0; j < num_players; j++){
            // victory check
            if (victory){
                console.log("¡GAME OVER!");
                return 1;
            }// end victory check

            // move
            move(player)
            
            // parse move results for return to game/simloop
            
        }
    }   
    return 0;
}
console.log(roll());