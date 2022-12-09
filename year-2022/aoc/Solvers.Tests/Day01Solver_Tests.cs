using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day01Solver;

public class Day01Solver_Tests {
  static private String dataDirectory = "./Resources/01";

  [Fact]
  public void IsCorrectOnSample() {
    var solver = new Solver(Path.Join(dataDirectory, "sample.data"));
    Assert.Equal(new Solution<int>(24000), solver.SolvePart1());
    Assert.Equal(new Solution<int>(45000), solver.SolvePart2());
  }

  [Fact]
  public void IsCorrectOnActual() {
    var solver = new Solver(Path.Join(dataDirectory, "actual.data"));
    Assert.Equal(new Solution<int>(68787), solver.SolvePart1());
    Assert.Equal(new Solution<int>(198041), solver.SolvePart2());
  }
}
