module.exports = {
  root: true,
  env: {
    node: true,
    "browser": true,
    "es2021": true
  },
  'extends': [
    'plugin:react/recommended',
    'eslint:recommended',
    'airbnb-base',
    "react-app",
        "react-app/jest"
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
   }
}
