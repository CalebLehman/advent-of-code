namespace Solvers;

public class Rucksack {
  public String Items { get; }

  public Rucksack(String items) {
    this.Items = items;
  }

  public IEnumerable<Char> GetSharedItems() {
    var sharedItems = new HashSet<Char>(this.Items[..(this.Items.Length / 2)]);
    sharedItems.IntersectWith(this.Items[(this.Items.Length / 2)..]);
    return sharedItems;
  }
}

public class Day03Solver : ISolver {
  private String inputFile;

  public Day03Solver(String inputFile) => this.inputFile = inputFile;

  private List<Rucksack> Parse() {
    try {
      var rucksacks = new List<Rucksack>();
      foreach (var line in File.ReadLines(inputFile)) {
        rucksacks.Add(new Rucksack(line));
      }
      return rucksacks;
    } catch (Exception e) {
      throw new UnableToParseInputException(this.inputFile, e);
    }
  }

  private static int GetItemPriority(Char item) {
    if (Char.IsLower(item)) return (int)item - (int)'a' + 1;
    else return (int)item - (int)'A' + 27;
  }

  private static IEnumerable<Char> GetSharedBadges(IEnumerable<Rucksack> rucksacks) {
    var sharedBadges = new HashSet<Char>(rucksacks.First()?.Items ?? "");
    foreach (var rucksack in rucksacks) sharedBadges.IntersectWith(rucksack.Items);
    return sharedBadges;
  }

  public ISolution SolvePart1() {
    return new Solution<int>(this.Parse()
      .Select(rucksack => rucksack.GetSharedItems().Select(Day03Solver.GetItemPriority).Sum())
      .Sum());
  }

  public ISolution SolvePart2() {
    var rucksacks = this.Parse();
    if (rucksacks.Count() % 3 != 0) throw new UnableToParseInputException(this.inputFile);

    return new Solution<int>(Enumerable.Range(0, rucksacks.Count() / 3)
      .Select(i => Day03Solver.GetSharedBadges(rucksacks.GetRange(i*3, 3)))
      .Select(badges => badges.Select(Day03Solver.GetItemPriority).Sum())
      .Sum());
  }
}
