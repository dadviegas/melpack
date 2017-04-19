'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackChunkHash = require('webpack-chunk-hash');

var _webpackChunkHash2 = _interopRequireDefault(_webpackChunkHash);

var _chunkManifestWebpack2Plugin = require('chunk-manifest-webpack2-plugin');

var _chunkManifestWebpack2Plugin2 = _interopRequireDefault(_chunkManifestWebpack2Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileNameGeneratePattern = function fileNameGeneratePattern(options) {
  return options.isDevelopment ? '[name].js' : '[name].[chunkhash].js';
};

var defaultOptions = {
  applyVersion: false,
  applyManifest: false,
  applyCommonsChunk: false
};

exports.default = function (optionsOptimize) {
  return function (settings) {
    return function (ctx, next) {
      var options = Object.assign(defaultOptions, optionsOptimize || {});
      var plugins = ctx.plugins || [];

      if (settings.isProduction) {
        plugins.unshift.apply(plugins, [new _webpack2.default.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            'screw_ie8': true
          },
          output: {
            comments: false
          },
          sourceMap: true
        }), new _webpack2.default.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
          options: {
            context: process.cwd()
          }
        })]);

        if (options.applyVersion) {
          plugins.unshift.apply(plugins, [new _webpack2.default.optimize.CommonsChunkPlugin({
            name: options.applyManifest ? ['vendor', 'manifest'] : ['vendor'],
            minChunks: Infinity
          }), new _webpack2.default.HashedModuleIdsPlugin(), new _webpackChunkHash2.default(), new _chunkManifestWebpack2Plugin2.default({
            filename: 'chunk-manifest.json',
            manifestVariable: 'webpackManifest'
          })]);

          ctx.output = _extends({}, ctx.output, {
            filename: fileNameGeneratePattern(settings),
            chunkFilename: fileNameGeneratePattern(settings)
          });
        }

        if (options.applyCommonsChunk) {
          plugins.push.apply(plugins, [new _webpack2.default.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.[chunkhash].js',
            minChunks: 3
          })]);
        }

        ctx.plugins = plugins;
      }

      next();
    };
  };
};