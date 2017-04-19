'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stats = require('./stats');

var _stats2 = _interopRequireDefault(_stats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://webpack.js.org/configuration/

exports.default = function (settings) {
  var isDevelopment = settings.isDevelopment;
  var source = settings.source || settings.path.resolve.source;
  var target = settings.target || settings.path.resolve.target;

  return {
    watch: settings.watch,
    devtool: isDevelopment ? 'inline-source-map' : 'cheap-source-map',
    context: source,
    entry: {
      index: './index.js'
    },
    output: {
      path: target,
      filename: '[name].js'
    },
    plugins: [],
    resolve: {
      modules: ['.', settings.path.resolve.nodeModules, settings.path.resolve.source],
      extensions: ['.loader.js', '.js', ".json"]
    },
    performance: {
      hints: "warning"
    }
  };
};