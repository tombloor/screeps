# Copilot instructions for this repository

## Repository purpose
- This repository is a beginner TypeScript Screeps bot.
- This repository is based on the a starter framework. Framework docs can be found in the `docs` directory.
- Prefer practical, incremental improvements that keep the bot approachable.
- Keep `src/main.ts` focused on the game loop entrypoint and core tick flow.

## TypeScript and code organization
- Follow existing linting/style conventions and existing patterns in `src/`.
- Keep reusable helpers in `src/utils` rather than expanding `main.ts`.
- Preserve strong typings for Screeps globals and memory extensions.
- Avoid introducing unnecessary abstractions for simple game-loop behavior.

## Game logic changes
- Prioritize deterministic, tick-safe logic.
- Keep per-tick work efficient and avoid adding avoidable CPU-heavy operations in the main loop.
- When changing memory behavior, ensure stale memory cleanup and creep/game-state checks remain safe.

## Validation expectations
- For code changes, run:
  - `npm run lint`
  - `npm run build`
  - `npm run test-unit`
- Integration tests are optional unless your change depends on full Screeps runtime behavior (`npm run test-integration` guidance is in `docs/in-depth/testing.md`).

## Workflow notes for AI-assisted contributions
- Make surgical changes that directly address the issue.
- Do not change unrelated files or refactor broadly without clear need.
- If scripts, tooling, or developer workflows change, update `README.md` and/or `docs/` in the same PR.
- Keep this file current as repository conventions evolve.
