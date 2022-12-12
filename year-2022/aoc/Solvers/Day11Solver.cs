namespace Solvers;

public class Monkey {
  private Queue<long> items;
  public Func<long, long> Operation;
  public Func<long, bool> Test;
  public int TrueDestination;
  public int FalseDestination;
  public long Inspections { get; private set; }

  public Monkey() {
    this.items = new Queue<long>();
    this.Operation = (long item) => item;
    this.Test = (long item) => true;
    this.TrueDestination = 0;
    this.FalseDestination = 0;
    this.Inspections = 0;
  }

  public void GiveItem(long item) => this.items.Enqueue(item);

  public IEnumerable<Tuple<int, long>> InspectItems() {
    var destinationItemPairs = new List<Tuple<int, long>>();
    while (this.items.Count() > 0) {
      var item = this.items.Dequeue();
      item = this.Operation(item);
      destinationItemPairs.Add(Tuple.Create(this.Test(item) ? this.TrueDestination : this.FalseDestination, item));
      ++this.Inspections;
    }
    return destinationItemPairs;
  }

  public override String ToString() {
    return @$"
Monkey #:
  Starting items: {String.Join(", ", this.items.ToArray())}
    true dest: {this.TrueDestination}
    false dest: {this.FalseDestination}
";
  }
}

public class Day11Solver : ISolver {
  private String inputFile;

  public Day11Solver(String inputFile) => this.inputFile = inputFile;

  private IList<Monkey> Parse(long divisor) {
    long modulus = 1;
    foreach (var line in File.ReadLines(this.inputFile)) {
      if (line.StartsWith("  Test")) {
        if (line.Contains("divisible")) modulus *= Int32.Parse(line[(line.IndexOf("by") + 2)..]);
      }
    }

    var monkeys = new List<Monkey>();
    foreach (var line in File.ReadLines(this.inputFile)) {
      if (line.StartsWith("Monkey")) {
        monkeys.Add(new Monkey());
      } else if (line.StartsWith("  Starting items")) {
        var items = line[(line.IndexOf(':') + 1)..].Split(',').Select(Int32.Parse);
        foreach (var item in items) monkeys[monkeys.Count() - 1].GiveItem(item);
      } else if (line.StartsWith("  Operation")) {
        if (line.Contains("old * old")) {
          monkeys[monkeys.Count() - 1].Operation = (long item) => ((item * item) / divisor) % modulus;
        } else if (line.Contains('*')) {
          var multiplier = Int32.Parse(line[(line.IndexOf('*') + 1)..]);
          monkeys[monkeys.Count() - 1].Operation = (long item) => ((item * multiplier) / divisor) % modulus;
        } else if (line.Contains('+')) {
          var adder = Int32.Parse(line[(line.IndexOf('+') + 1)..]);
          monkeys[monkeys.Count() - 1].Operation = (long item) => ((item + adder) / divisor) % modulus;
        } else {
          throw new UnableToParseInputException(this.inputFile);
        }
      } else if (line.StartsWith("  Test")) {
        if (line.Contains("divisible")) {
          var dividend = Int32.Parse(line[(line.IndexOf("by") + 2)..]);
          monkeys[monkeys.Count() - 1].Test = (long item) => item % dividend == 0;
        } else {
          throw new UnableToParseInputException(this.inputFile);
        }
      } else if (line.StartsWith("    If true")) {
        monkeys[monkeys.Count() - 1].TrueDestination = Int32.Parse(line[(line.IndexOf("monkey") + 6)..]);
      } else if (line.StartsWith("    If false")) {
        monkeys[monkeys.Count() - 1].FalseDestination = Int32.Parse(line[(line.IndexOf("monkey") + 6)..]);
      }
    }
    return monkeys;
  }

  private static long CalculateMonkeyBusiness(IList<Monkey> monkeys, int rounds) {
    for (int round = 1; round <= rounds; ++round) {
      foreach (var monkey in monkeys) {
        var destinationItemPairs = monkey.InspectItems();
        foreach (var (destination, item) in destinationItemPairs) {
          monkeys[destination].GiveItem(item);
        }
      }
    }
    var inspections = monkeys.Select(monkey => monkey.Inspections).ToList();
    inspections.Sort();
    inspections.Reverse();
    return inspections[0] * inspections[1];
  }

  public ISolution SolvePart1() {
    var monkeys = this.Parse(3);
    return new Solution<long>(Day11Solver.CalculateMonkeyBusiness(monkeys, 20));
  }

  public ISolution SolvePart2() {
    var monkeys = this.Parse(1);
    return new Solution<long>(Day11Solver.CalculateMonkeyBusiness(monkeys, 10000));
  }
}
