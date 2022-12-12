using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day11Solver;

public class Day11Solver_Tests {
  static private String dataDirectory = "./Resources/11";

  [Theory]
  [InlineData("sample.data", 10605)]
  [InlineData("actual.data", 66124)]
  public void IsCorrectPart1(String filename, long expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<long>(expected), solver.SolvePart1());
  }

  [Theory]
  [InlineData("sample.data", 2713310158)]
  [InlineData("actual.data", 19309892877)]
  public void IsCorrectPart2(String filename, long expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<long>(expected), solver.SolvePart2());
  }
}
