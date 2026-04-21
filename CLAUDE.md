# Mealdrop — agent notes

Turborepo monorepo with Yarn 4 workspaces. Apps in `apps/*`, shared libraries in `packages/*`.

## Commands

Run from the repo root (Turbo orchestrates workspaces):

- `yarn check` — typecheck everything (runs `tsc --noEmit` in each workspace)
- `yarn build` — build all apps and packages
- `yarn test` / `yarn test:ci` — run unit tests -- DO NOT CHECK THIS for UI tasks, instead use story tests via the `run-story-tests` MCP tool.
- `yarn lint` — ESLint across the repo
- `yarn storybook` — start the UI package's Storybook

To target a single workspace: `yarn workspace @mealdrop/ui <script>` or `yarn workspace @mealdrop/web <script>`.

## UI changes

Make sure to call the `get-storybook-story-instructions` tool before working on any UI and preview relevant story changes when finished for the user to review.
