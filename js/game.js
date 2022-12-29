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

function move(player, board){
    // establish pawn position
    let oldPosition = board[player];
    // get roll
    let turnRoll = roll();
    let newPosition = oldPosition + turnRoll;
    let bumps = 0;

    if (newPosition > board_length-1){
        // void move
        console.log("No move, too far.");
        return 0;
    }

    if (newPosition == board_length-1){
        console.log("Victoryyyyy!");
        return -1;
    }

    // check bump
    for(let i = 0; i< num_players; i++){
        if (board[i] == newPosition){
            bumps +=1;
            // carry out bump
            board[i] = -1;
        }
    }

    // make move
    board[player] = newspace;

    return bumps;
}


function turns(){
    let victory = false;
    let bumps = []
    // while not victory
    while(! victory){
        // for each player
        for(let j=0; j < num_players; j++){
            // move
            let move_result = move(player)
            
            // parse move results for return to game/simloop
            if(move_result > 0){
                bumps.append(move_result)
            }
            else if (move_result == -1){
                console.log("¡GAME OVER!");
                break;
            }
            // else no move.  no action right?
        }    
    }   
    // game over
    return 0;
}
console.log(roll());