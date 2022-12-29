import java.util.Random;

public class Game {
    public int num_players;
    public int board_len;
    public int bumps = 0;
    public int turns = 0;
    public boolean victory = false;
    public char winner = '-';
    public int MAX_PAWNS = 1;
    public char[] board;
    public char[] players;

    public Game(){
        num_players = 4;
        board_len = 60;
    }

    public Game(int players, int length){
        num_players = players;
        board_len = length;
    }

    public int roll(){
        Random ran = new Random();
        int roll = 0;
        while(roll == 0) {
            roll = (int) ran.nextInt(7);
        }
        return roll;
    } // end method roll

    public void setup(){
        // set board to int[board_len]
        this.board = new char[this.board_len];
        for (int i=0; i<this.board_len;i++){
            this.board[i] = '0';
        }
        // create players list, players are represented by a lowercase char
        this.players = new char[this.num_players];
        for (int i=0; i<this.num_players; i++){
            this.players[i] = (char) (i+97);
        }

    } // end method create_board

    public void move(char player, int roll){
        //System.out.println("Player " + player + "'s roll is " + roll);
        // find out if pawn on board
        boolean no_pawn = true; // is this weird?  it feels weird.
        int position = 0;
        int count = -1;
        // check for player on board
        for ( char space : this.board ){
            count += 1;
            if(space == player){
                no_pawn = false; // bad to say no pawn is false? no. no.
                position = count;
                break;
            }
        }

        if (no_pawn){ position = -1; }

        // check if roll + position goes beyond end of game and return no move if so
        if (roll + position > this.board_len-1){
            //System.out.println("No move");
            return ;
        }
        // check for bumps and record
        if (this.board[position + roll] != '0'){
            //System.out.println("BUMP!");
            this.bumps++;
        }
        // set old position back to 0
        if(! no_pawn){this.board[position] = '0';};
        // then assign pawn to new space
        this.board[position + roll] = player;

    } // end method move

    public void check_victory(char player){
        if(this.board[this.board_len-1] == player){
            this.victory = true;
            this.winner = player;
        }
    } // end method check_victory

    public void turns(){
        int count = -1;
        // while not this.victory
        while (! this.victory) {
            // iterate through players
            for ( char player : players)
            {
                //System.out.println(this.board);
                // increment count
                count++;
                // generate roll
                int roll = roll();
                // call move
                move(player, roll);
                check_victory(player);
                if (this.victory) {break;}
            } // end for player in players
        } // when while not this.victory
        //System.out.println("GAME FINISHED!");
        this.turns = count;
    } // end method turns

    public void report(){
        System.out.println("Turns: " + turns + "\nBumps: " + bumps + "\nWinner: " + winner);
    }

} // end class Game

