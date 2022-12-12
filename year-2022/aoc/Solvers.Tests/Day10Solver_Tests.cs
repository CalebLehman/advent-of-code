using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day10Solver;

public class Day10Solver_Tests {
  static private String dataDirectory = "./Resources/10";

  [Theory]
  [InlineData("sample.data", 13140)]
  [InlineData("actual.data", 14360)]
  public void IsCorrectPart1(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart1());
  }
}
