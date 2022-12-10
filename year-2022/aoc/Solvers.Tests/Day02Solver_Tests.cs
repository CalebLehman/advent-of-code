using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day02Solver;

public class Day02Solver_Tests {
  static private String dataDirectory = "./Resources/02";

  [Theory]
  [InlineData("sample.data", 15)]
  [InlineData("actual.data", 13005)]
  public void IsCorrectPart1(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart1());
  }

  [Theory]
  [InlineData("sample.data", 12)]
  [InlineData("actual.data", 11373)]
  public void IsCorrectPart2(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart2());
  }
}
