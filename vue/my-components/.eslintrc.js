module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-empty': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-v-html': 'off',
    'vue/v-slot-style': 'off',
    'vue/no-mutating-props': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
