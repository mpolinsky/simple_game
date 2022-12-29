public class PlayGame {
    public static void main(String[] args) {
        int sims = 0;
        Integer in = new Integer(args[0]);
        Analyzer anlyzr = new Analyzer(in);
        anlyzr.runSimulation();
    }

}
