using System.Reflection;
using Solvers;

public class Program {
  private const String usage = @"Usage: solver <day> <input-file>";

  private static ISolver? GetSolver(int day, String inputFile) {
    var assembly = Assembly.Load("Solvers");
    if (assembly == null) {
      Console.WriteLine("Unable to load 'Solvers' assembly");
      return null;
    }

    var type = assembly.GetType($"Solvers.Day{day.ToString("00")}Solver");
    if (type == null) {
      Console.WriteLine($"Unable to find solver for day {day.ToString("00")}");
      return null;
    }

    var obj = Activator.CreateInstance(type, new object[] { inputFile });
    if (obj == null) {
      Console.WriteLine($"Unable to initialize solver");
      return null;
    }

    return (ISolver)obj;
  }

  public static int Main(String[] args) {
    if (args.Length != 2) {
      Console.WriteLine(Program.usage);
      return 1;
    }

    int day;
    if (!Int32.TryParse(args[0], out day)) {
      Console.WriteLine($"Unable to parse {args[0]} as a number");
      return 1;
    }
    string inputFile = args[1];

    var solver = Program.GetSolver(day, inputFile);
    if (solver == null) return 1;

    Console.WriteLine($"Solution for part 1: {solver.SolvePart1()}");
    Console.WriteLine($"Solution for part 2: {solver.SolvePart2()}");
    return 0;
  }
}
