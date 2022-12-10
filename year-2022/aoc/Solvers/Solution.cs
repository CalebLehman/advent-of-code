namespace Solvers;

public class Solution<T> : ISolution 
  where T : IEquatable<T>
{
  private T solution;

  public Solution(T solution) => this.solution = solution;

  public String GetString() => this?.solution.ToString() ?? "";

  public bool Equals(Solution<T>? that) => that != null && this.solution.Equals(that.solution);
  public bool Equals(ISolution? obj) => obj is Solution<T> that && this.Equals(that);
  public override bool Equals(Object? obj) => obj is Solution<T> that && this.Equals(that);
  public override int GetHashCode() => this.solution.GetHashCode();

  public override String ToString() => solution?.ToString() ?? "";
}
