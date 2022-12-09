namespace Solvers;

public class UnableToParseMoveException : Exception {
  public UnableToParseMoveException(Char symbol) : base($"Unable to parse {symbol}") {}
}

public enum RPS {
  Rock = 1,
  Paper = 2,
  Scissors = 3
}

public static class RPSExtensions {
  public static RPS GetBetter(this RPS move) {
    switch (move) {
      case RPS.Rock: return RPS.Paper;
      case RPS.Paper: return RPS.Scissors;
      default: return RPS.Rock;
    }
  }

  public static RPS GetWorse(this RPS move) {
    switch (move) {
      case RPS.Rock: return RPS.Scissors;
      case RPS.Paper: return RPS.Rock;
      default: return RPS.Paper;
    }
  }

  public static int GetScore(this RPS move) {
    switch (move) {
      case RPS.Rock: return 1;
      case RPS.Paper: return 2;
      default: return 3;
    }
  }
}

public class RPSRound {
  private RPS stimulus;
  private RPS response;

  public RPSRound(RPS stimulus, RPS response) {
    this.stimulus = stimulus;
    this.response = response;
  }

  public int GetScore() {
    int moveScore = this.response.GetScore();
    if (this.response == this.stimulus.GetBetter()) return moveScore + 6;
    else if (this.response == this.stimulus) return moveScore + 3;
    else return moveScore;
  }
}

public class Day02Solver : ISolver {
  private String inputFile;

  public Day02Solver(String inputFile) => this.inputFile = inputFile;

  private List<RPSRound> ParseOurInterpretation() {
    try {
      var rounds = new List<RPSRound>();
      foreach (var line in File.ReadLines(inputFile)) {
        RPS stimulus;
        switch (line[0]) {
          case 'A': stimulus = RPS.Rock; break;
          case 'B': stimulus = RPS.Paper; break;
          case 'C': stimulus = RPS.Scissors; break;
          default: throw new UnableToParseMoveException(line[0]);
        }
        RPS response;
        switch (line[2]) {
          case 'X': response = RPS.Rock; break;
          case 'Y': response = RPS.Paper; break;
          case 'Z': response = RPS.Scissors; break;
          default: throw new UnableToParseMoveException(line[2]);
        }
        rounds.Add(new RPSRound(stimulus, response));
      }
      return rounds;
    } catch (Exception e) {
      throw new UnableToParseInputException(this.inputFile, e);
    }
  }

  private List<RPSRound> ParseElfInterpretation() {
    try {
      var rounds = new List<RPSRound>();
      foreach (var line in File.ReadLines(inputFile)) {
        RPS stimulus;
        switch (line[0]) {
          case 'A': stimulus = RPS.Rock; break;
          case 'B': stimulus = RPS.Paper; break;
          case 'C': stimulus = RPS.Scissors; break;
          default: throw new UnableToParseMoveException(line[0]);
        }
        RPS response;
        switch (line[2]) {
          case 'X': response = stimulus.GetWorse(); break;
          case 'Y': response = stimulus; break;
          case 'Z': response = stimulus.GetBetter(); break;
          default: throw new UnableToParseMoveException(line[2]);
        }
        rounds.Add(new RPSRound(stimulus, response));
      }
      return rounds;
    } catch (Exception e) {
      throw new UnableToParseInputException(this.inputFile, e);
    }
  }

  public ISolution SolvePart1() {
    var rounds = this.ParseOurInterpretation();
    return new Solution<int>(rounds.Select(round => round.GetScore()).Sum());
  }

  public ISolution SolvePart2() {
    var rounds = this.ParseElfInterpretation();
    return new Solution<int>(rounds.Select(round => round.GetScore()).Sum());
  }
}
