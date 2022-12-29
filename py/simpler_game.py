# simply_game is a board game simulator that can be played
# the game consists of a variable length track for the board, a start and end space
# each player rolls a six-sided die and the first to reach home wins.
from random import randint
    
def move(player, pawns, board_len):
    # check that player has a pawn on the board.  If not set position to -1.
    position = pawns[player] if pawns[player] is not None else -1
    
    new = position+randint(1,6)

    if new < board_len-1:
        # Catch bumps and set new move
        for p in pawns:
            if pawns[p] == new:
                pawns[p] = None
                pawns[player] = new
                return 1
            else: 
                pawns[player] = new
                return 0;
    # Catch move too far/victory
    return None if new > board_len-1 else -5 

   
def turns(board_len, num_players):
    pawns = {chr(k+97):None for k in range(num_players)}
    
    count = 0
    winner = None
    bumps = 0
    while(winner is None):
        for player in pawns:
            count += 1
            moved = move(player, pawns, board_len)
            if moved == -5:
                winner = player
                break
            elif moved is not None: 
                bumps += moved
    return count, winner, bumps