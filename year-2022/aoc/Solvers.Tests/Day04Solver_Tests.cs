using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day04Solver;

public class Day04Solver_Tests {
  static private String dataDirectory = "./Resources/04";

  [Fact]
  public void IsCorrectOnSample() {
    var solver = new Solver(Path.Join(dataDirectory, "sample.data"));
    Assert.Equal(new Solution<int>(2), solver.SolvePart1());
    Assert.Equal(new Solution<int>(4), solver.SolvePart2());
  }

  [Fact]
  public void IsCorrectOnActual() {
    var solver = new Solver(Path.Join(dataDirectory, "actual.data"));
    Assert.Equal(new Solution<int>(536), solver.SolvePart1());
    Assert.Equal(new Solution<int>(845), solver.SolvePart2());
  }
}
