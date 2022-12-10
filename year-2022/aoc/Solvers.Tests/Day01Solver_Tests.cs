using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day01Solver;

public class Day01Solver_Tests {
  static private String dataDirectory = "./Resources/01";

  [Theory]
  [InlineData("sample.data", 24000)]
  [InlineData("actual.data", 68787)]
  public void IsCorrectPart1(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart1());
  }

  [Theory]
  [InlineData("sample.data", 45000)]
  [InlineData("actual.data", 198041)]
  public void IsCorrectPart2(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart2());
  }
}
