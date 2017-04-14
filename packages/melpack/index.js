require('babel-register')({
  presets: [
    'babel-preset-es2015',
    'babel-preset-stage-2',
  ]
})

module.exports = require('./src/index.js').default
