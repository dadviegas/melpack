'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

var _config = require('./webpack/config');

var _config2 = _interopRequireDefault(_config);

var _melpackMiddleware = require('melpack-middleware');

var _melpackMiddleware2 = _interopRequireDefault(_melpackMiddleware);

var _melpackJasmine = require('melpack-jasmine');

var _melpackJasmine2 = _interopRequireDefault(_melpackJasmine);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _stats = require('./webpack/stats');

var _stats2 = _interopRequireDefault(_stats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  environment: 'production',
  watch: false
};

exports.default = function (melpackOptions) {
  var options = Object.assign(defaultOptions, melpackOptions);
  var settings = (0, _environment2.default)(options);
  var opts = (0, _config2.default)(settings);

  var _ref = new _melpackMiddleware2.default(opts, settings),
      use = _ref.use,
      _run = _ref.run;

  _shelljs2.default.rm('-rf', settings.path.resolve.target);

  return {
    use: use,
    run: function run(cb) {
      var func = function func(data) {
        (0, _webpack2.default)(data, function (err, stats) {
          if (err) {
            throw new _gulpUtil2.default.PluginError('webpack:build', err);
          }
          _gulpUtil2.default.log('[webpack:build]', stats.toString((0, _stats2.default)(settings)));
        });
        cb && cb(data);
      };

      _run(func.bind(undefined));
    },
    test: function test() {
      return _run(function (webpackConfig) {
        return (0, _melpackJasmine2.default)(options, webpackConfig, settings);
      });
    }
  };
};