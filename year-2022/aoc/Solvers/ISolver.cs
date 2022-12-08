namespace Solvers;

public class UnableToParseInputException : Exception {
  public UnableToParseInputException(String inputFile) : base($"Unable to parse {inputFile}") {}
  public UnableToParseInputException(String inputFile, Exception inner) : base($"Unable to parse {inputFile}", inner) {}
}

public interface ISolver {
  abstract int SolvePart1();
  abstract int SolvePart2();
}
