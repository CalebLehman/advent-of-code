namespace Solvers;

public class UnableToFindMarkerException : Exception {
  public UnableToFindMarkerException(String buffer) : base($"Unable to find marker in {buffer}") {}
}

public class Day06Solver : ISolver {
  private String inputFile;

  public Day06Solver(String inputFile) => this.inputFile = inputFile;

  private String Parse() {
    var line = File.ReadLines(this.inputFile).FirstOrDefault();
    if (line == null) throw new UnableToParseInputException(this.inputFile);
    return line;
  }

  private int GetFirstMarker(int length) {
    var buffer = this.Parse();
    var currentCharacterSet = new HashSet<Char>();
    int? marker = null;
    int low = 0;
    for (int high = 0; high < buffer.Length; ++high) {
      while (currentCharacterSet.Contains(buffer[high])) {
        currentCharacterSet.Remove(buffer[low]);
        low += 1;
      }
      currentCharacterSet.Add(buffer[high]);
      if (currentCharacterSet.Count() >= length) {
        marker = high + 1;
        break;
      }
    }
    if (marker == null) throw new UnableToFindMarkerException(buffer);
    return marker.Value;
  }

  public ISolution SolvePart1() {
    return new Solution<int>(this.GetFirstMarker(4));
  }

  public ISolution SolvePart2() {
    return new Solution<int>(this.GetFirstMarker(14));
  }
}
