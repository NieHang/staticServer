module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parser": 'babel-eslint',
  "parserOptions": {
    "ecmaVersion": 2015,
    "sourceType": 'script'
  },
  "rules": {
    "no-console": [
      "error",
      {
        "allow": ['warn', 'error', 'info']
      }
    ],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};