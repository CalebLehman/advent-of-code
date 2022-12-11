namespace Solvers;

public class Day08Solver : ISolver {
  private String inputFile;

  public Day08Solver(String inputFile) => this.inputFile = inputFile;

  private List<List<int>> Parse() {
    var heights = new List<List<int>>();
    foreach (var line in File.ReadLines(this.inputFile)) {
      var row = new List<int>();
      foreach (var height in line) row.Add((int)height - (int)'0');
      heights.Add(row);
    }
    return heights;
  }

  public ISolution SolvePart1() {
    var heights = this.Parse();
    var visible = new HashSet<Tuple<int, int>>();

    for (int row = 0; row < heights.Count(); ++row) {
      int currentmax = -1;
      for (int col = 0; col < heights[row].Count(); ++col) {
        if (heights[row][col] > currentmax) {
          visible.Add(Tuple.Create(row, col));
          currentmax = heights[row][col];
        }
      }
    }

    for (int row = 0; row < heights.Count(); ++row) {
      int currentmax = -1;
      for (int col = heights[row].Count() - 1; col >= 0; --col) {
        if (heights[row][col] > currentmax) {
          visible.Add(Tuple.Create(row, col));
          currentmax = heights[row][col];
        }
      }
    }

    for (int col = 0; col < heights[0].Count(); ++col) {
      int currentMax = -1;
      for (int row = 0; row < heights.Count(); ++row) {
        if (heights[row][col] > currentMax) {
          visible.Add(Tuple.Create(row, col));
          currentMax = heights[row][col];
        }
      }
    }

    for (int col = 0; col < heights[0].Count(); ++col) {
      int currentMax = -1;
      for (int row = heights.Count() - 1; row >= 0; --row) {
        if (heights[row][col] > currentMax) {
          visible.Add(Tuple.Create(row, col));
          currentMax = heights[row][col];
        }
      }
    }

    return new Solution<int>(visible.Count());
  }

  public ISolution SolvePart2() {
    var heights = this.Parse();
    var numberVisible = new List<List<int>>();
    for (int row = 0; row < heights.Count(); ++row) {
      numberVisible.Add(new List<int>());
      for (int col = 0; col < heights[row].Count(); ++col) numberVisible[row].Add(1);
    }

    for (int row = 0; row < heights.Count(); ++row) {
      var visibleLeft = new int[10];
      for (int col = 0; col < heights[row].Count(); ++col) {
        numberVisible[row][col] *= visibleLeft[heights[row][col]];
        for (int i = 0; i < 10; ++i) ++visibleLeft[i];
        for (int i = 0; i <= heights[row][col]; ++i) visibleLeft[i] = 1;
      }
    }

    for (int row = 0; row < heights.Count(); ++row) {
      var visibleRight = new int[10];
      for (int col = heights[row].Count() - 1; col >= 0; --col) {
        numberVisible[row][col] *= visibleRight[heights[row][col]];
        for (int i = 0; i < 10; ++i) ++visibleRight[i];
        for (int i = 0; i <= heights[row][col]; ++i) visibleRight[i] = 1;
      }
    }

    for (int col = 0; col < heights[0].Count(); ++col) {
      var visibleUp = new int[10];
      for (int row = 0; row < heights.Count(); ++row) {
        numberVisible[row][col] *= visibleUp[heights[row][col]];
        for (int i = 0; i < 10; ++i) ++visibleUp[i];
        for (int i = 0; i <= heights[row][col]; ++i) visibleUp[i] = 1;
      }
    }

    for (int col = 0; col < heights[0].Count(); ++col) {
      var visibleDown = new int[10];
      for (int row = heights.Count() - 1; row >= 0; --row) {
        numberVisible[row][col] *= visibleDown[heights[row][col]];
        for (int i = 0; i < 10; ++i) ++visibleDown[i];
        for (int i = 0; i <= heights[row][col]; ++i) visibleDown[i] = 1;
      }
    }

    return new Solution<int>(numberVisible.Select(row => row.Max()).Max());
  }
}
