using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day05Solver;

public class Day05Solver_Tests {
  static private String dataDirectory = "./Resources/05";

  [Theory]
  [InlineData("sample.data", "CMZ")]
  [InlineData("actual.data", "HNSNMTLHQ")]
  public void IsCorrectPart1(String filename, String expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<String>(expected), solver.SolvePart1());
  }

  [Theory]
  [InlineData("sample.data", "MCD")]
  [InlineData("actual.data", "RNLFDJMCT")]
  public void IsCorrectPart2(String filename, String expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<String>(expected), solver.SolvePart2());
  }
}
