namespace Solvers;

public class Rearrangement {
  public int Amount { get; }
  public int Source { get; }
  public int Target { get; }

  public Rearrangement(int amount, int source, int target) {
    this.Amount = amount;
    this.Source = source;
    this.Target = target;
  }
}

public class Day05Solver : ISolver {
  private String inputFile;

  public Day05Solver(String inputFile) => this.inputFile = inputFile;

  private Tuple<List<Stack<Char>>, List<Rearrangement>> Parse() {
    var stackLine = File.ReadLines(inputFile).FirstOrDefault(line => line.Length >= 2 && line[1] == '1') ?? "";
    var numberOfStacks = (1 + stackLine.Length) / 4;
    if (numberOfStacks == 0) throw new UnableToParseInputException(this.inputFile);
    var stacks = new List<Stack<Char>>();
    for (int i = 0; i < numberOfStacks; ++i) stacks.Add(new Stack<Char>());

    var rows = File.ReadLines(inputFile)
      .Where(line => line.Contains('['))
      .Reverse();
    foreach (var row in rows) {
      for (int i = 0; i < stacks.Count(); ++i) {
        if (i * 4 + 1 < row.Length && row[i * 4 + 1] != ' ') stacks[i].Push(row[i * 4 + 1]);
      }
    }

    var rearrangements = new List<Rearrangement>();
    foreach (var line in File.ReadLines(inputFile).Where(line => line.StartsWith("move"))) {
      var rearrangementParts = line.Split(' ', 6);
      try {
        var amount = Int32.Parse(rearrangementParts[1]);
        var source = Int32.Parse(rearrangementParts[3]);
        var target = Int32.Parse(rearrangementParts[5]);
        rearrangements.Add(new Rearrangement(amount, source, target));
      } catch {
        throw new UnableToParseInputException(this.inputFile);
      }
    }

    return Tuple.Create(stacks, rearrangements);
  }

  public ISolution SolvePart1() {
    var (stacks, rearrangements) = this.Parse();
    foreach (var rearrangement in rearrangements) {
      for (int i = 0; i < rearrangement.Amount; ++i) {
        var crate = stacks[rearrangement.Source - 1].Pop();
        stacks[rearrangement.Target - 1].Push(crate);
      }
    }
    return new Solution<String>(String.Concat(stacks.Select(stack => stack.Peek())));
  }

  public ISolution SolvePart2() {
    var (stacks, rearrangements) = this.Parse();
    foreach (var rearrangement in rearrangements) {
      var temporaryStack = new Stack<Char>();
      for (int i = 0; i < rearrangement.Amount; ++i) {
        var crate = stacks[rearrangement.Source - 1].Pop();
        temporaryStack.Push(crate);
      }
      for (int i = 0; i < rearrangement.Amount; ++i) {
        var crate = temporaryStack.Pop();
        stacks[rearrangement.Target - 1].Push(crate);
      }
    }
    return new Solution<String>(String.Concat(stacks.Select(stack => stack.Peek())));
  }
}
