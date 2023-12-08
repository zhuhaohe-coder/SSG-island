module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single'], //单括号
    semi: ['error', 'always'], //结尾逗号
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
