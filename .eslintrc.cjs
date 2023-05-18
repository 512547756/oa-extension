/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // 关闭any的警告
    "vue/multi-word-component-names": "off", // 关闭组件名称需要多单词的警告
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
