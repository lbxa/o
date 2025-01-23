# Scale

This file documents all things scale.

## Codebase Scale

Codebase complexity should scale logarithmically $O(\log n)$ to the volume of code $n$. Achieving this is task that requires constant discipline.

On the TypeScript side, keeping libs small should ensure tsc doesn't get slow slowing the pace of development. If tsc becomes the bottleneck, we should consider moving to NX.
