namespace Solvers;

public class UnableToParseAssignmentPairException : Exception {
  public UnableToParseAssignmentPairException(String assignmentPair) : base($"Unable to parse {assignmentPair}") {}
  public UnableToParseAssignmentPairException(String assignmentPair, Exception e) : base($"Unable to parse {assignmentPair}", e) {}
}

public class UnableToParseAssignmentException : Exception {
  public UnableToParseAssignmentException(String assignment) : base($"Unable to parse {assignment}") {}
  public UnableToParseAssignmentException(String assignment, Exception e) : base($"Unable to parse {assignment}", e) {}
}

public class Range {
  private int low;
  private int high;

  public Range(int low, int high) {
    this.low = low;
    this.high = high;
  }

  public bool Contains(Range that) {
    return this.low <= that.low && that.high <= this.high;
  }

  public bool OverlapsWith(Range that) {
    return (this.low <= that.high && that.low <= this.high) || (that.low <= this.high && this.low <= that.high);
  }

  public static Range FromAssignment(String assignment) {
    var endpoints = assignment.Split('-');
    try {
      return new Range(Int32.Parse(endpoints[0]), Int32.Parse(endpoints[1]));
    } catch (Exception e) {
      throw new UnableToParseAssignmentException(assignment, e);
    }
  }
}

public class Day04Solver : ISolver {
  private String inputFile;

  public Day04Solver(String inputFile) => this.inputFile = inputFile;

  private List<Tuple<Range, Range>> Parse() {
    try {
      var pairs = new List<Tuple<Range, Range>>();
      foreach (var line in File.ReadLines(inputFile)) {
        var assignments = line.Split(',', 2);
        if (assignments.Count() != 2) throw new UnableToParseAssignmentPairException(line);
        pairs.Add(Tuple.Create(Range.FromAssignment(assignments[0]), Range.FromAssignment(assignments[1])));
      }
      return pairs;
    } catch (Exception e) {
      throw new UnableToParseInputException(this.inputFile, e);
    }
  }

  public ISolution SolvePart1() {
    return new Solution<int>(this.Parse()
      .Where(pair => pair.Item1.Contains(pair.Item2) || pair.Item2.Contains(pair.Item1))
      .Count());
  }

  public ISolution SolvePart2() {
    return new Solution<int>(this.Parse()
      .Where(pair => pair.Item1.OverlapsWith(pair.Item2))
      .Count());
  }
}
