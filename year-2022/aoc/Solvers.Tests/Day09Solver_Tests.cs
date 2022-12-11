using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day09Solver;

public class Day09Solver_Tests {
  static private String dataDirectory = "./Resources/09";

  [Theory]
  [InlineData("sample1.data", 13)]
  [InlineData("sample2.data", 88)]
  [InlineData("actual.data", 5902)]
  public void IsCorrectPart1(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart1());
  }

  [Theory]
  [InlineData("sample1.data", 1)]
  [InlineData("sample2.data", 36)]
  [InlineData("actual.data", 2445)]
  public void IsCorrectPart2(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart2());
  }
}
