namespace Solvers;

public class InvalidFileSystemDirectoryException : Exception {
  public InvalidFileSystemDirectoryException() : base() {}
}

public class FileSystemDirectory {
  public String Name { get; }
  public IDictionary<String, FileSystemDirectory> SubDirectories { get; set; }
  public IDictionary<String, FileSystemFile> Files { get; set; }
  public FileSystemDirectory? Parent { get; }
  private int? size;

  public FileSystemDirectory(String name, FileSystemDirectory? parent) {
    this.Name = name;
    this.SubDirectories = new Dictionary<String, FileSystemDirectory>();
    this.Files = new Dictionary<String, FileSystemFile>();
    this.Parent = parent;
  }

  public int GetSize() {
    if (this.size == null) {
      this.size = this.SubDirectories.Select(dir => dir.Value.GetSize()).Sum()
        + this.Files.Select(file => file.Value.GetSize()).Sum();
    }
    return this.size.Value;
  }
}

public class FileSystemFile {
  public String Name { get; }
  private int size;

  public FileSystemFile(String name, int size) {
    this.Name = name;
    this.size = size;
  }

  public int GetSize() => this.size;
}

public class Day07Solver : ISolver {
  private String inputFile;

  public Day07Solver(String inputFile) => this.inputFile = inputFile;

  private FileSystemDirectory Parse() {
    var root = new FileSystemDirectory("/", null);
    var current = root;
    foreach (var line in File.ReadLines(this.inputFile)) {
      if (current == null) throw new InvalidFileSystemDirectoryException();
      if (line.StartsWith('$')) {
        if (line.Equals("$ cd /")) current = root;
        else if (line.Equals("$ cd ..")) current = current.Parent;
        else if (line.StartsWith("$ cd")) current = current.SubDirectories[line[5..]];
      } else {
        if (line.StartsWith("dir")) current.SubDirectories[line[4..]] = new FileSystemDirectory(line[4..], current);
        else {
          try {
            var components = line.Split(' ', 2);
            current.Files[components[1]] = new FileSystemFile(components[1], Int32.Parse(components[0]));
          } catch (Exception e) {
            throw new UnableToParseInputException(this.inputFile, e);
          }
        }
      }
    }
    return root;
  }

  public ISolution SolvePart1() {
    var total = 0;
    var stack = new Stack<FileSystemDirectory>();
    stack.Push(this.Parse());
    while (stack.Count() > 0) {
      var directory = stack.Pop();
      if (directory.GetSize() <= 100000) total += directory.GetSize();
      foreach (var subDirectory in directory.SubDirectories) stack.Push(subDirectory.Value);
    }
    return new Solution<int>(total);
  }

  public ISolution SolvePart2() {
    var root = this.Parse();
    int neededSpace = 30000000 - (70000000 - root.GetSize());

    FileSystemDirectory bestDirectory = root;
    var stack = new Stack<FileSystemDirectory>();
    stack.Push(root);
    while (stack.Count() > 0) {
      var directory = stack.Pop();
      if (directory.GetSize() > neededSpace) {
        if (bestDirectory.GetSize() > directory.GetSize()) bestDirectory = directory;
      }
      foreach (var subDirectory in directory.SubDirectories) stack.Push(subDirectory.Value);
    }

    return new Solution<int>(bestDirectory.GetSize());
  }
}
