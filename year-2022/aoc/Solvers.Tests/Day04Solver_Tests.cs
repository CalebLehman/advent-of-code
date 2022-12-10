using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day04Solver;

public class Day04Solver_Tests {
  static private String dataDirectory = "./Resources/04";

  [Theory]
  [InlineData("sample.data", 2)]
  [InlineData("actual.data", 536)]
  public void IsCorrectPart1(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart1());
  }

  [Theory]
  [InlineData("sample.data", 4)]
  [InlineData("actual.data", 845)]
  public void IsCorrectPart2(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart2());
  }
}
