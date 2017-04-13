require('babel-register')({
  'presets': ['latest', 'stage-2']
})

module.exports = require('./src/index.js').default
