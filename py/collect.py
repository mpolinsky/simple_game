# collect is for running many games and gathering data on them, then writing it out
from simpler_game import turns
from argparse import ArgumentParser as AP
from collections import Counter
import pandas as pd
from codetiming import Timer

# get some number of games
parser = AP(prog="game")
parser.add_argument('-n', '--number_games', type=int, default=1000, help="The number of simulations to run")
# get players and board lengths
parser.add_argument('-b', '--board', type=int, default=60, help="The length of the board")
parser.add_argument('-p', '--players', type=int, default=4, help="The number of players")
args = parser.parse_args()


@Timer(name='simTime')
def simulate(num_games, board, players):
    collector = list()
    # run loop
    for i in range(num_games):
        # collect data: bumps,
            #           game lengths,
            #           where in order winner player first went,
            #           distance between first and second player,
       collector.append(turns(board, players))

    # I want a report (maybe a different script) on the game params and how it went.  Graphs.
    # Collect data from collectors...maybe they are each a row. So. Parse into a dict.
 
    results = {'count':[], 'winners':[], 'bumps':[]}
    for count, winner, bumps in collector:
        results['count'].append(count)
        results['winners'].append(winner)
        results['bumps'].append(bumps)
    co = Counter(results['winners'])
    for c in co:
        print(f"{c}: {co[c]}")
    averages = {'max_count':max(results['count']),
             'avg_count':sum(results['count'])/len(results['count']),
             'min_count':min(results['count']),
             'winner':max(list(co.keys()), key=lambda x: co[x] ),
             'max_bumps':max(results['bumps']),
             'avg_bumps':sum(results['bumps'])/len(results['bumps']),
             'min_bumps':min(results['bumps'])
            }


#    print(results)
 #   print("\n====================================================================================\n")
    df = pd.DataFrame(averages, index=[0])
    print(f"After {num_games} simulations with {players} players and {board} spaces on the board:")
    print(df)

if __name__ == '__main__':
    simulate(args.number_games, args.board, args.players)
