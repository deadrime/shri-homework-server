module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'no-console': 'off',
    'no-unused-vars': ['warn', { 'argsIgnorePattern': 'next' }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'all',
      },
    ],
    eqeqeq: ['error', 'always'],
  },
  parserOptions: {
    'ecmaVersion': 2017
  },
  env: {
    es6: true,
    node: true,
    browser: true
  }
}