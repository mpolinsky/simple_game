// implement the straight-line pawn game
#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <limits.h>


int move(char player, int roll, char b[], int b_length);
int roll(int start, int stop);
void srand(unsigned) __swift_unavailable("Use arc4random instead.");
time_t time (time_t* timer);
int turns(int num_players, char board[], int b_length);
int victory_check(char player, int b_length, char board[]);
void showBoard(char board[], int b_length);
int analyze();
int rand();
void game(int players, int board_length, int results[]);
int atoi(const char *str);

int main(int argc, char* argv[]){
    printf("Welcome to the Game.\n");

    // board, players, num players, board length, victory
    // num_players and board_length are ints
    int simulations = atoi(argv[1]);
    int num_players = atoi(argv[2]);
    int board_length = atoi(argv[3]);
    //printf("%d\n%d\n%d", simulations, num_players, board_length);

    int turnstats[3];       // TURN STATS  turns, bumps, winner
    int total_turns= 0;
    int turns = 0;
    int turn_max = 0;
    int turn_min = INT_MAX; 
    int turn_avg = 0;

    int total_bumps = 0;
    int bumps = 0;
    int bump_max = 0;
    int bump_min = INT_MAX;
    int bump_avg = 0;

    int winner = 0;
    int winners[simulations];

    for (int oo = 0; oo < simulations; oo++){
        game(num_players, board_length, turnstats);
        turns = turnstats[0];
        bumps = turnstats[1];
        winner = turnstats[2];

        // Turns
        if (turns > turn_max){
            turn_max = turns;
        }
        if (turns < turn_min){
            turn_min = turns;
        }
        total_turns += turns;

        // Bumps
        if (bumps > bump_max){
            bump_max = bumps;
        }
        if (bumps < bump_min){
            bump_min = bumps;
        }
        total_bumps += bumps;

        // Accumulate winners
        winners[oo] = winner;

        // reset array
        turnstats[0] = 0;
        turnstats[1] = 0;
        turnstats[2] = 0;
    } // end simulation for loop
        
        // Still need to get avgs 
    turn_avg = total_turns/simulations;
    bump_avg = total_bumps/simulations;

    int winFreq[num_players];
    
    for (int iii=0; iii<4; iii++){
        winFreq[iii] = 0;
    }
    // Still need to create frequency table for winners and pick mode.
    for(int q=0; q<simulations ;q++){
        winFreq[winners[q]-97] += 1;
    } // end win frequency for loop

    //assign top winner!
    int win_max = 0;
    for(int v=0; v < num_players; v++){
        printf("%d\n",winFreq[v]);
        if (winFreq[v] > win_max){
            win_max = winFreq[v];
            winner = v;
        }
    }

    
    printf("winner: %c\n", winner+97);
    printf("win_max: %d\n", win_max);
    

    printf("After %d simulations with %d players and %d board spaces:\n", simulations, num_players, board_length);
    printf("\nMax Turns: %d\nAvg Turns: %d\nMin Turns: %d\nMax Bumps: %d\nAvg Bumps: %d\nMin Bumps: %d\nTop Winner: %c\n\n", turn_max, turn_avg, turn_min, bump_max, bump_avg, bump_min, winner+97);
    printf("Thanks for playing, goodbye.");
}


void game(int num_players, int board_length, int r[]){
    // board and players are arrays of defined length that do not grow.
    char board[board_length];
    int bumps = 0;
    int victory = 0;
    char winner = '-';
    int turns = 0;
    char currentPlayer = '-';


    // init board
    for (int p = 0; p < board_length; p++){
        board[p] = '-';
    }

    /*
    GAME START 
    */ 

     // while not victory
    while (victory == 0){
        // loop through players, carrying out turns only if not victory.
        for(int i = 0; i < num_players; i++){
            if (victory == 0){
                currentPlayer = (char) i+97;
                //printf("%c's turn.\n", currentPlayer);
                turns += 1;
                // get roll
                int dieRoll = 0;
                dieRoll = roll(1,6);
                //printf("The die roll is %d\n", dieRoll);
                //printf("Move:\n");
                bumps += move(currentPlayer, dieRoll, board, board_length);
                //printf("Move complete.\n===========================\n");
                // Show user
                //showBoard(board, board_length);
                // Victory check
                victory = victory_check(currentPlayer, board_length, board);
            }
        } // end for
    }// end while 
    
    //printf("GAME OVER\n getting winner...\n");
    winner = board[board_length - 1];
    
    r[0] = turns;
    r[1] = bumps;
    r[2] = winner;

    //printf("Victory for player %c in %d turns with %d bumps.\n", winner, turns, bumps);

    }  // end game


    unsigned int get_nanos(void) {
        struct timespec ts;
        timespec_get(&ts, TIME_UTC);
        return (unsigned int) ts.tv_sec * 1000000000L + ts.tv_nsec;
    }

    void showBoard(char b[], int b_length){
        for (int k = 0; k < b_length; k++){
            printf("%c, ", b[k]);
        } 
        printf("\n");
    }

    // roll - spent time investigating quasirandom generators...decided to just use rand().
    int roll(int start, int stop){
        srand(get_nanos());
        int roll = (rand() % (stop - start + 1)) + start;
        return roll;
    }

    // move 
    int move(char player, int roll, char b[], int b_length){
        
        int bumps = 0;
        int oldSpace = -1;
        int newSpace = 0;
        int stop = 0; // flag to accelerate loop (possibly slow it down? check that one.) ***   ****   ****  ****
        
        // player on board? use space as current space
        for(int i=0; i<b_length; i++){
            if (stop == 0){ 
                if (b[i] == player){
                    oldSpace = i;
                    stop=1;
                }
            }
        }
        //printf("getting new space...\n");
        // calculate new space now that currentSpace is set.
        newSpace = oldSpace + roll;
        //printf("oldspace: %d\nnewspace: %d\nb_length %d\n", oldSpace, newSpace, b_length);
        // if move too far return - 1
        if(newSpace > b_length-1){
            //printf("No move.\n");
            return 0;}
        // check for bump to count
        if (b[newSpace] != '-'){
            //printf("Bumped.\n");
            bumps += 1;}
        // set move
        b[newSpace] = player;
        if(oldSpace > -1){
            // remove old marker
            b[oldSpace] = '-';
        }
        // return number of bumps.
        return bumps;
    }

    // victory_check 
    int victory_check(char player, int len, char b[]){
        if( b[len-1] == player ){
            //printf("game overrrrrr\n");
            return 1;
        }
        return 0;
    } // end function victory_check

    // analyze TODO
    int analyze(){
        printf("H\n");
        return 0;
    } // end function analyze



    ////// END ///////