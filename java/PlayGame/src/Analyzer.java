import java.util.HashMap;
import java.util.ArrayList;
import java.util.Collections;

/*
    Analyzer manages simulation and collects and stores data for processing...also done here.
 */
public class Analyzer {

    // for collecting stats from game simulations
    public HashMap<String, ArrayList<Integer>> results = new HashMap<String, ArrayList<Integer>>();
    public int simulations;
    public int players = 0;
    public int board_length = 0;

    public Analyzer(int simulations){
        this.simulations = simulations;
    }

    public Analyzer(int simulations, int players, int length){
        this.simulations = simulations;
        this.players = players;
        this.board_length = length;

    }

    public void initMap(){
        results.put("turns", new ArrayList<Integer>());
        results.put("bumps", new ArrayList<Integer>());
        results.put("winners", new ArrayList<Integer>());
    }

    public void getData(int turns, int bumps, char charWinner){
        // subtract 96 from cast winner char to convert to 1-indexing for human comprehension.
        int intWinner = (int) charWinner - 96;
        results.get("turns").add(turns);
        results.get("bumps").add(bumps);
        results.get("winners").add(intWinner);
    }

    // Runs simulations, collects data, and analyzes data.
    //   Analysis is output to terminal by analyze().
    public void runSimulation(){
        // init map
        initMap();
        Game game;
        // instantiate analyzer to collect data from each run
        for(int i = 0; i < simulations; i++){
            if (this.players != 0){
                game = new Game(this.players, this.board_length);
            }
            else{
                // Default case 4 players/60 spaces on board
                game = new Game();
            }
            game.setup();
            game.turns();
            getData(game.turns, game.bumps, game.winner);
        }
        analyze();
    }

    // This method works with the data stored in results.
    // Calculates descriptive statistics and calls method to display a table.
    public void analyze(){

        // results will contain all turns, bumps and winners...
        Collections.sort(results.get("turns"));
        Collections.sort(results.get("bumps"));
        int list_length = results.get("turns").size();
        int turnMax = results.get("turns").get(list_length-1); // access last item in arraylist (largest) (use deque?)
        int turnMin = results.get("turns").get(0); // first element (smallest)// access largest item
        int bumpMax = results.get("bumps").get(list_length-1); // access largest item
        int bumpMin = results.get("bumps").get(0); // access smallest item

        // Get averages
        int turnAvg = 0;
        int bumpAvg = 0;
        // Sum over each of 'turns' and 'bumps'
        for (int i=0; i < list_length; i++) {
            turnAvg += results.get("turns").get(i);
            bumpAvg += results.get("bumps").get(i);
        }
        turnAvg /= list_length;
        bumpAvg /= list_length;


        // Create frequency dist. for winners.  
        HashMap<Integer, Integer> winnerFreq = new HashMap<Integer, Integer>();
        // init winnerFreq
        winnerFreq.put(1, 0); // weird.
        winnerFreq.put(2, 0);
        winnerFreq.put(3, 0);
        winnerFreq.put(4, 0);

        for (Integer i : results.get("winners")){
            winnerFreq.put(i, winnerFreq.get(i)+1);
        }
        // System.out.println("THIS SHOULD BE THE FREQUENCY DISTRIBUTION:\n" + winnerFreq);
        Integer max = new Integer(1);
        for(Integer i : winnerFreq.keySet()) {
            if (winnerFreq.get(i) > winnerFreq.get(max)) {max = i;}
        }
        //System.out.println("Max should be: " + max);

        // Init dataFrame for final results
        HashMap<String, Integer> dataFrame = new HashMap<String, Integer>();
        dataFrame.put("avgTurns", turnAvg);
        dataFrame.put("maxTurns", turnMax);
        dataFrame.put("minTurns", turnMin);
        dataFrame.put("avgBumps", bumpAvg);
        dataFrame.put("minBumps", bumpMin);
        dataFrame.put("maxBumps", bumpMax);
        dataFrame.put("topWinner", (max.intValue()+96));

        // output data
        System.out.println("\nAfter " + this.simulations + " simulations with " + this.players + " players and board length " + this.board_length + ":");

        System.out.println("Max Turns: " + dataFrame.get("maxTurns") );
        System.out.println("Avg Turns: " + dataFrame.get("avgTurns") );
        System.out.println("Min Turns: " + dataFrame.get("minTurns") );
        System.out.println("Max Bumps: " + dataFrame.get("maxBumps"));
        System.out.println("Avg Bumps: " + dataFrame.get("avgBumps"));
        System.out.println("Min Bumps: " + dataFrame.get("minBumps"));
        System.out.println("Top Winner: " + (char) dataFrame.get("topWinner").intValue());
    }

}