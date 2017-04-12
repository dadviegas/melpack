require('babel-register')({
  'presets': ['es2015'],
  plugins: ['transform-object-rest-spread']
})

module.exports = require('./src/index.js').default
