# simply_game is a board game simulator 
# the game consists of a variable length track for the board, a start and end space
# each player rolls a six-sided die and the first to reach home wins.
from random import randint
from argparse import ArgumentParser as AP

class Game:
    def __init__(self, board_len, num_players):
        self.board_len = board_len
        self.num_players = num_players
        self.board = [ int('0') for i in range(self.board_len) ]
        # use letters for player names
        self.players = [chr(i+97) for i in range(num_players)]
        self.game_over = False
        self.winner = None
        self.MAX_PAWNS = 1
        self.bumps = 0

    def victory_check(self, player):
        if self.board[-1] == player:
            self.game_over = True
            self.winner = player
           # print(f"game_over: {self.game_over}")
           # print(f"winner: {self.winner}")

    def roll(self):
        return randint(1,6)

    def move(self, player):
        # get a random roll between 1 and 6
        roll = self.roll()
        # check that player has a pawn on the board.  If not set position to -1.
        try:
            position = self.board.index(player)
        except ValueError:
            position = -1
         #   print(f"""Moving onto the board...""")
        # Catch move too far
        if ( (position+roll) > (self.board_len-1) ):
         #   print(f'No move, you would overshoot the goal!')
            return None
        #print(f'Moving...')
        # Catch bumps
        if self.board[position + roll] != 0:
            self.bumps += 1
        #    print("BUMP!")

        # move player and erase prior position
        self.board[position] = 0
        self.board[position+roll] = player
        # Talk to the user
       # print(f"""Player {player} is currently at position {self.board.index(player)}""")

    def turns(self):
        count = 0
        while(not self.game_over):
            for player in self.players:
                count += 1
                #print(f"""Turn {count}: Player {player}'s turn""")
                self.move(player)
                #print("current board")
                #print(self.board)
                #print("====================")
                self.victory_check(player)
                if self.game_over:
                 #   print("GAME OVER")
                    break
        return count

    def game_over(self):
        #print(f"""Game Over\n\nThe winner is {self.winner}!""")
        return None

def main(board_len, num_players):
    #print(f"Play!")
    game = Game(board_len, num_players)
    count = game.turns()
    return count, game.winner, game.players, game.bumps


parser = AP(prog = 'Game',
   description = 'Lets you play the game.',
   epilog = 'Good luck, chump.')

parser.add_argument('board', type=int, default=10, help="Number of spaces on the board.")
parser.add_argument('players', type=int, default=4, help="Number of players")
args = parser.parse_args()


if __name__ == '__main__':
    main(args.board, args.players)
    print("It is finished.\nYou are not the same as you were.")

