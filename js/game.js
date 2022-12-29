// game.js

function roll(die=6){
    let rolled = 0;
    while (rolled == 0){
        rolled = Math.round(Math.random()*die);
    }
    return rolled;
}

function move(player, num_players, board, board_length){
    // establish pawn position
    let oldPosition = board[player];
    // get roll
    let turnRoll = roll();
    console.log("Roll: " + turnRoll);
    let newPosition = oldPosition + turnRoll;
    let bumps = 0;
    let winner = null;

    if (newPosition > (board_length-1)){
        // void move
        console.log("No move, too far.");
    }

    else if (newPosition == board_length-1){
        console.log("Victoryyyyy!");
        winner = player;
        // make move
        board[player] = newPosition;
    }
    else{
        // check bump
        for(let i = 0; i< num_players; i++){
            if (board[i] == newPosition){
                bumps +=1;
                // carry out bump
                board[i] = -1;
            }
        }
        // make move
        board[player] = newPosition;
    }

    
    const results = [bumps, winner];
    return results;

}

function show_board(board){
    console.log(board);
}

function turns(num_players, board, board_length){
    let victory = false;
    let bumps  = 0;
    let count = 0;
    let move_results = [];

    // while not victory
    while(victory == false){
        // for each player
        for(let j=0; j < num_players; j++){
            console.log("\n");
            console.log("Player " + j + "'s turn.");
            count += 1;
            // move
            move_results = move(j, num_players, board, board_length);
            console.log(move_results);
            show_board(board);
            // parse move results for return to game/simloop
            if(move_results[1] == null){
                // normal move 
                bumps += move_results[0];
            }
            else{
                victory = true;
                console.log("¡GAME OVER!");
                break;
            }
            // else no move.  no action right?
        }    
    }   
    console.log("End game");
    const return_results = [count, bumps, move_results[1]];
    // game over
    return return_results;
}

function game(num_players, board_length){
    // board
    let board = [-1,-1,-1,-1];
    // bumps
    let bumps = 0;
    // turns
    let turn_count = 0;
    // winner
    let winner = 0;
    // victory
    let victory = false;
    // for analysis
    let res = [];
    console.log("Verification:\nnum_players: "+ num_players + "\nboard_length: " + board_length);
    res = turns(num_players, board, board_length);
    console.log(res);

}

function main(num_simulations, num_players, board_length){
    for(let i = 0; i < num_simulations; i++){
        //console.log(i);
        newGame = game(num_players, board_length)
    }
    return 0;
}

function analyze(results){
   turns = results[0];
   bumps = results[1];
   winners = results[2];

   // calculate min, max, avg for turns and bumps
   

   // calculate most frequent winner

   // put it all together

   // dislpay the results of the simulations

}

// Run
main(1, 4, 60);