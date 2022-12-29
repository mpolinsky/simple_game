public class PlayGame {
    public static void main(String[] args) {
        Integer in = new Integer(args[0]);
        Analyzer anlyzr = new Analyzer(in);
        anlyzr.runSimulation();
    }

}
