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
    let newPosition = oldPosition + turnRoll;
    let bumps = 0;
    let winner = null;

    if (newPosition > (board_length-1)){
        // void move
        //console.log("No move, too far.");
    }

    else if (newPosition == board_length-1){
        //console.log("Victoryyyyy!");
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
            //console.log("\n");
            //console.log("Player " + j + "'s turn.");
            count += 1;
            // move
            move_results = move(j, num_players, board, board_length);
            //console.log(move_results);
            show_board(board);
            // parse move results for return to game/simloop
            if(move_results[1] == null){
                // normal move 
                bumps += move_results[0];
            }
            else{
                victory = true;
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
    res = turns(num_players, board, board_length);
    //console.log(res);
    return res;

}

function main(num_simulations, num_players, board_length){
    let res = [];
    for(let i = 0; i < num_simulations; i++){
        //console.log(i);
        newGame = game(num_players, board_length);
        res.push(newGame);
    }
    analyze(res, num_simulations);
    return 0;
}

function analyze(results, num_simulations, num_players, board_length){

    let turns = [];
    let bumps = [];
    let winners = [];

    for (let k = 0; k< results.length; k++){
        turns.push(results[k][0]);
        bumps.push(results[k][1]);
        winners.push(results[k][2]);
    }
    //console.log("Turns:\n\t"+turns);
    //console.log("Bumps:\n\t"+bumps);
    //console.log("Winners:\n\t"+winners);
    // calculate min, max, avg for turns and bumps
    let turnMin = Math.max(turns);
    let turnMax = Math.min(turns);
    let bumpMin = Math.max(bumps);
    let bumpMax = Math.min(bumps);


    let bumpAvg = 0;
    let turnAvg = 0;

    let winner = 0;

    for(let i = 0; i < turns.length; i++){
        turnAvg += turns[i]
        turnAvg /= num_simulations
        turnAvg = Math.round(turnAvg);
    }

    for(let i = 0; i < bumps.length; i++){
        bumpAvg += bumpAvg[i]
        bumpAvg /= num_simulations
        bumpAvg = Math.round(bumpAvg);
    }

    // calculate most frequent winner
    let freqDict = [0,0,0,0]
    for(let i = 0; i < winners.length; i++){
        freqDict[winners[i]]+=1;
    }
    console.log("Freqdict:\n\t" + freqDict)

    // put it all together
    console.log(Math.max(freqDict));
    freqDict.sort();
    console.log("Freqdict:\n\t" + freqDict)

    // dislpay the results of the simulations
    console.log("After " + num_simulations + " simulations with " + num_players + " players, and a board with " + board_length + "spaces:\n");

    console.log("Max Turns: " + turnMax);
    console.log("Avg Turns: " + turnAvg);
    console.log("Min Turns: " + turnMin);

    console.log("Max Bumps: " + bumpMax);
    console.log("Avg Bumps: " + bumpAvg);
    console.log("Min Bumps: " + bumpMin);

    console.log("Top Winner: " + winner);

}

// Run
main(10, 4, 60);