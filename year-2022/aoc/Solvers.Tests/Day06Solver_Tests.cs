using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day06Solver;

public class Day06Solver_Tests {
  static private String dataDirectory = "./Resources/06";

  [Theory]
  [InlineData("sample1.data", 7)]
  [InlineData("sample2.data", 5)]
  [InlineData("sample3.data", 6)]
  [InlineData("sample4.data", 10)]
  [InlineData("sample5.data", 11)]
  [InlineData("actual.data", 1198)]
  public void IsCorrectPart1(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart1());
  }

  [Theory]
  [InlineData("sample1.data", 19)]
  [InlineData("sample2.data", 23)]
  [InlineData("sample3.data", 23)]
  [InlineData("sample4.data", 29)]
  [InlineData("sample5.data", 26)]
  [InlineData("actual.data", 3120)]
  public void IsCorrectPart2(String filename, int expected) {
    var solver = new Solver(Path.Join(dataDirectory, filename));
    Assert.Equal(new Solution<int>(expected), solver.SolvePart2());
  }
}
