1. When adding npm dependencies, treat them like they are your life. One more dep means one more package to maintain later. 
    - Lock the package versions with either `~` or `^` and consistently maintain `pnpm up --interactive --filter <package>`
    - When possible aim for `^` to allow for minor version patches that could fix many bugs + increase perf of your package