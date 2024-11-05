import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'dist/',
    'dist/**/',
    'test/unit/coverage/',
    'test/unit/coverage/**/',
    'test/unit/specs/',
    'test/unit/specs/**/',
    'build/',
    'build/**/',
    'node_modules/',
    'node_modules/**/',
    '*.min.*',
    '**/*.min.*/**',
    'src/public/',
    'src/public/**/',
    'public/',
    'public/**/',
  ],
  formatters: true,
})
