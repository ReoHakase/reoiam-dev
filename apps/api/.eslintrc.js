/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['custom'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    // Exclude `set` of Elysia from `no-param-reassign` rule
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['set'] }],
    'consistent-return': 'off',
  },
};
