require('babel-register')({
  'presets': ['es2015', 'stage-2']
})

module.exports = require('./src/index.js').default
