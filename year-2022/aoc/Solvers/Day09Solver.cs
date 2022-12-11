namespace Solvers;

public class Rope {
  private List<Tuple<int, int>> knots;

  public Rope(int numberOfKnots) {
    knots = new List<Tuple<int, int>>();
    for (int i = 0; i < numberOfKnots; ++i) knots.Add(Tuple.Create(0, 0));
  }

  public void Move(int headDeltaX, int headDeltaY) {
    this.knots[0] = Tuple.Create(this.knots[0].Item1 + headDeltaX, this.knots[0].Item2 + headDeltaY);
    for (int i = 1; i < this.knots.Count(); ++i) {
      int deltaX = this.knots[i-1].Item1 - this.knots[i].Item1;
      int deltaY = this.knots[i-1].Item2 - this.knots[i].Item2;
      if (Math.Abs(deltaX) == 2 && Math.Abs(deltaY) == 1) deltaY *= 2;
      else if (Math.Abs(deltaY) == 2 && Math.Abs(deltaX) == 1) deltaX *= 2;
      this.knots[i] = Tuple.Create(this.knots[i].Item1 + deltaX / 2, this.knots[i].Item2 + deltaY / 2);
    }
  }

  public Tuple<int, int> GetTail() {
    return this.knots[this.knots.Count() - 1];
  }

  public List<Tuple<int, int>> GetKnots() {
    return this.knots;
  }
}

public class Day09Solver : ISolver {
  private String inputFile;

  public Day09Solver(String inputFile) => this.inputFile = inputFile;

  private List<Tuple<int, int, int>> Parse() {
    var movements = new List<Tuple<int, int, int>>();
    foreach (var line in File.ReadLines(this.inputFile)) {
      var count = Int32.Parse(line[2..]);
      switch (line[0]) {
        case 'R': movements.Add(Tuple.Create(1, 0, count)); break;
        case 'L': movements.Add(Tuple.Create(-1, 0, count)); break;
        case 'U': movements.Add(Tuple.Create(0, 1, count)); break;
        case 'D': movements.Add(Tuple.Create(0, -1, count)); break;
        default: throw new UnableToParseInputException(this.inputFile);
      }
    }
    return movements;
  }

  private static int SimulateTail(Rope rope, IEnumerable<Tuple<int, int, int>> movements) {
    var positions = new HashSet<Tuple<int, int>>();
    positions.Add(rope.GetTail());
    foreach (var (x, y, count) in movements) {
      for (int i = 0; i < count; ++i) {
        rope.Move(x, y);
        positions.Add(rope.GetTail());
      }
    }
    return positions.Count();
  }

  public ISolution SolvePart1() {
    var rope = new Rope(2);
    var movements = this.Parse();
    return new Solution<int>(Day09Solver.SimulateTail(rope, movements));
  }

  public ISolution SolvePart2() {
    var rope = new Rope(10);
    var movements = this.Parse();
    return new Solution<int>(Day09Solver.SimulateTail(rope, movements));
  }
}
