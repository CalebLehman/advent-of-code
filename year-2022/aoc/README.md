# Advent of Code 2022

## Running

To get the solutions for a particular `day`,
write the input to `input-file` and run

```
dotnet run --profile ./Solver/Solver.csproj -- <day> <input-file>
```

You can find input files in `Solvers.Tests/Resources`,
so, for example, to generate the solutions for day 2, the command would be
```
dotnet run --profile ./Solver/Solver.csproj -- 2 ./Solvers.Tests/Resources/02/actual.data
```

## Testing

A test project that compares results against known solutions is provided in `Solvers.Tests`.
Tests are executed using `dotnet test`
