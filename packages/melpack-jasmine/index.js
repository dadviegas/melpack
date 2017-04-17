require('babel-register')({
  'presets': ['es2015', 'stage-2'].map(require.resolve)
})

module.exports = require('./src/index.js').default
