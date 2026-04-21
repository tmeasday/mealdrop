# Mealdrop — agent notes

Turborepo monorepo with Yarn 4 workspaces. Apps in `apps/*`, shared libraries in `packages/*`.

## Commands

Run from the repo root (Turbo orchestrates workspaces):

- `yarn check` — typecheck everything (runs `tsc --noEmit` in each workspace)
- `yarn build` — build all apps and packages
- `yarn test-storybook:ci` — run story tests (do not use the MCP tool).
- `yarn lint` — ESLint across the repo
- `yarn storybook` — start the UI package's Storybook

To target a single workspace: `yarn workspace @mealdrop/ui <script>` or `yarn workspace @mealdrop/web <script>`.
