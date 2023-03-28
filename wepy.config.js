const path = require('path');
var prod = process.env.NODE_ENV === 'production';
const TypeScriptCompiler = require('@wepy/compiler-typescript');
const UglifyPlugin = require('@wepy/plugin-uglifyjs');

module.exports = {
  wpyExt: '.wpy',
  eslint: false,
  cliLogs: !prod,
  static: ['static'],
  build: {
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src'),
      'Images': path.join(__dirname, 'images'),
      'Components': path.join(__dirname, 'src/components')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    babel: {
      sourceMap: true,
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@wepy/babel-plugin-import-regenerator'
      ]
    }
  },
  plugins: prod ? [
    TypeScriptCompiler(),
    UglifyPlugin()
  ]: [
    TypeScriptCompiler()
  ],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

