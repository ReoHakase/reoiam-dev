// This file is used by lint-staged to run linting and formatting on staged files

module.exports = {
  '**/*.{js,jsx,cjs,mjs,ts,tsx}': 'pnpm --filter empty-package eslint',
  '**/*.{js,jsx,cjs,mjs,ts,tsx,md,html,css,json,yaml,yml}':
    'pnpm --filter empty-packag prettier --ignore-unknown --check',
};
