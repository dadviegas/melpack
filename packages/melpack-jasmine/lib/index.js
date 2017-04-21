'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _karma = require('karma');

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webpackConfigDefault = {
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  }
};

exports.default = function (options) {
  var webpackConf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : webpackConfigDefault;
  var settings = arguments[2];

  delete webpackConf.entry;
  delete webpackConf.output;
  webpackConf.devtool = 'inline-source-map';
  _gulp2.default.task('test', function (done) {
    return new _karma.Server({
      webpack: webpackConf,
      preprocessors: {
        'specs/**/*.js': ['webpack', 'sourcemap']
      },
      basePath: settings.path.resolve.root,
      frameworks: ['jasmine'],
      reporters: ['spec'],
      specReporter: {
        maxLogLines: 5, // limit number of lines logged per test
        suppressErrorSummary: false, // do not print error summary
        suppressFailed: false, // do not print information about failed tests
        suppressPassed: true, // do not print information about passed tests
        suppressSkipped: false, // do not print information about skipped tests
        showSpecTiming: true, // print the time elapsed for each spec
        failFast: false // test would finish with error when a first fail occurs. 
      },
      browsers: ['PhantomJS'],
      files: ['src/**/*.js', 'specs/**/*.js'],
      autoWatch: options.watch,
      singleRun: !options.watch,
      webpackMiddleware: {
        stats: {
          colors: true
        }
      }
    }, done).start();
  });

  _gulp2.default.start('test');
};