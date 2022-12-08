using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day02Solver;

public class Day02Solver_Tests {
  static private String dataDirectory = "./Resources/02";

  [Fact]
  public void IsCorrectOnSample() {
    var solver = new Solver(Path.Join(dataDirectory, "sample.data"));
    Assert.Equal(15, solver.SolvePart1());
    Assert.Equal(12, solver.SolvePart2());
  }

  [Fact]
  public void IsCorrectOnActual() {
    var solver = new Solver(Path.Join(dataDirectory, "actual.data"));
    Assert.Equal(13005, solver.SolvePart1());
    Assert.Equal(11373, solver.SolvePart2());
  }
}
