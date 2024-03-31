// This file is used by lint-staged to run linting and formatting on staged files

const path = require('path');

module.exports = {
  '**/*.{js,jsx,cjs,mjs,ts,tsx}': 'bun eslint',
  '**/*.{js,jsx,cjs,mjs,ts,tsx,md,html,css,json,yaml,yml}': 'bun prettier --check',
};
