using System;
using System.IO;
using Xunit;

namespace Solvers.Tests;

using Solver = Day03Solver;

public class Day03Solver_Tests {
  static private String dataDirectory = "./Resources/03";

  [Fact]
  public void IsCorrectOnSample() {
    var solver = new Solver(Path.Join(dataDirectory, "sample.data"));
    Assert.Equal(157, solver.SolvePart1());
    Assert.Equal(70, solver.SolvePart2());
  }

  [Fact]
  public void IsCorrectOnActual() {
    var solver = new Solver(Path.Join(dataDirectory, "actual.data"));
    Assert.Equal(8394, solver.SolvePart1());
    Assert.Equal(2413, solver.SolvePart2());
  }
}
