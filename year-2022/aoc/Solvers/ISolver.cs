namespace Solvers;

public class UnableToParseInputException : Exception {
  public UnableToParseInputException(String inputFile) : base($"Unable to parse {inputFile}") {}
  public UnableToParseInputException(String inputFile, Exception inner) : base($"Unable to parse {inputFile}", inner) {}
}

public interface ISolver {
  abstract ISolution SolvePart1();
  abstract ISolution SolvePart2();
}
