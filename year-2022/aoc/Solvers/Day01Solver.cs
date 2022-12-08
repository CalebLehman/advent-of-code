namespace Solvers;

public class Day01Solver : ISolver {
  private String inputFile;

  public Day01Solver(String inputFile) => this.inputFile = inputFile;

  private List<int> ParseInput() {
    try {
      var calories = new List<int>() { 0 };
      foreach (var line in File.ReadLines(this.inputFile)) {
        if (String.IsNullOrEmpty(line)) {
          calories.Add(0);
        } else {
          calories[calories.Count - 1] += Int32.Parse(line);
        }
      }
      return calories;
    } catch (Exception e) {
      throw new UnableToParseInputException(this.inputFile, e);
    }
  }

  public int SolvePart1() {
    var calories = this.ParseInput();

    calories.Sort();
    calories.Reverse();
    return calories[0];
  }

  public int SolvePart2() {
    var calories = this.ParseInput();

    calories.Sort();
    calories.Reverse();
    return calories.GetRange(0, 3).Sum();
  }
}
