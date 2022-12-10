using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day07Solver;

public class Day07Solver_Tests {
  static private String dataDirectory = "./Resources/07";

  [Theory]
  [InlineData("sample.data", 95437)]
  [InlineData("actual.data", 1453349)]
  public void IsCorrectPart1(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart1());
  }

  [Theory]
  [InlineData("sample.data", 24933642)]
  [InlineData("actual.data", 2948823)]
  public void IsCorrectPart2(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart2());
  }
}
