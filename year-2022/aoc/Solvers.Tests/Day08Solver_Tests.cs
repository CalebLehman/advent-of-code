using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day08Solver;

public class Day08Solver_Tests {
  static private String dataDirectory = "./Resources/08";

  [Theory]
  [InlineData("sample.data", 21)]
  [InlineData("actual.data", 1681)]
  public void IsCorrectPart1(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart1());
  }

  [Theory]
  [InlineData("sample.data", 8)]
  [InlineData("actual.data", 201684)]
  public void IsCorrectPart2(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart2());
  }
}
