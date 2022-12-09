using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day05Solver;

public class Day05Solver_Tests {
  static private String dataDirectory = "./Resources/05";

  [Fact]
  public void IsCorrectOnSample() {
    var solver = new Solver(Path.Join(dataDirectory, "sample.data"));
    Assert.Equal(new Solution<String>("CMZ"), solver.SolvePart1());
    Assert.Equal(new Solution<String>("MCD"), solver.SolvePart2());
  }

  [Fact]
  public void IsCorrectOnActual() {
    var solver = new Solver(Path.Join(dataDirectory, "actual.data"));
    Assert.Equal(new Solution<String>("HNSNMTLHQ"), solver.SolvePart1());
    Assert.Equal(new Solution<String>("RNLFDJMCT"), solver.SolvePart2());
  }
}
