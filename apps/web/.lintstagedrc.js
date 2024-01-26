// This file is used by lint-staged to run linting and formatting on staged files

const path = require('path');

module.exports = {
  '**/*.{js,jsx,cjs,mjs,ts,tsx}': 'pnpm --filter web exec eslint',
  '**/*.{js,jsx,cjs,mjs,ts,tsx,md,html,css,json,yaml,yml}': 'pnpm --filter web exec prettier --check',
};
