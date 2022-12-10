using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day03Solver;

public class Day03Solver_Tests {
  static private String dataDirectory = "./Resources/03";

  [Theory]
  [InlineData("sample.data", 157)]
  [InlineData("actual.data", 8394)]
  public void IsCorrectPart1(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart1());
  }

  [Theory]
  [InlineData("sample.data", 70)]
  [InlineData("actual.data", 2413)]
  public void IsCorrectPart2(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart2());
  }
}
