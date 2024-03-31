// This file is used by lint-staged to run linting and formatting on staged files

module.exports = {
  '**/*.{js,jsx,ts,tsx,md,html,css,json,yaml,yml}': 'bun prettier --ignore-unknown --check',
};
