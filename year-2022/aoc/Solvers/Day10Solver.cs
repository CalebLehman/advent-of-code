namespace Solvers;

public class State {
  public int SignalStrengths { get; private set; }
  private int x;
  private int cycle;
  private System.Text.StringBuilder display;

  public State() {
    this.SignalStrengths = 0;
    this.x = 1;
    this.cycle = 0;
    this.display = new System.Text.StringBuilder();
  }

  private void IncrementCycle() {
    ++this.cycle;
    if (this.cycle % 40 == 20) this.SignalStrengths += this.cycle * this.x;

    if (Math.Abs((this.cycle - 1) % 40 - this.x) <= 1) this.display.Append('#');
    else this.display.Append('.');

    if (this.cycle % 40 == 0) this.display.Append('\n');
  }

  public void NoOp() => this.IncrementCycle();
  public void AddX(int v) {
    this.IncrementCycle();
    this.IncrementCycle();
    this.x += v;
  }

  public String GetDisplay() {
    return this.display.ToString();
  }
}
public class Day10Solver : ISolver {
  private String inputFile;

  public Day10Solver(String inputFile) => this.inputFile = inputFile;

  private IEnumerable<String> Parse() {
    return File.ReadLines(this.inputFile);
  }

  public ISolution SolvePart1() {
    var state = new State();
    foreach (var line in this.Parse()) {
      switch (line.Split(' ')[0]) {
        case "noop": state.NoOp(); break;
        case "addx": state.AddX(Int32.Parse(line[5..])); break;
        default: throw new UnableToParseInputException(this.inputFile);
      }
    }
    return new Solution<int>(state.SignalStrengths);
  }

  public ISolution SolvePart2() {
    var state = new State();
    foreach (var line in this.Parse()) {
      switch (line.Split(' ')[0]) {
        case "noop": state.NoOp(); break;
        case "addx": state.AddX(Int32.Parse(line[5..])); break;
        default: throw new UnableToParseInputException(this.inputFile);
      }
    }
    Console.Write(state.GetDisplay());
    return new Solution<int>(state.SignalStrengths);
  }
}
