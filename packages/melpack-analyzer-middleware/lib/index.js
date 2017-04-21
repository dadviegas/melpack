'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpackBundleAnalyzer = require('webpack-bundle-analyzer');

var _duplicatePackageCheckerWebpackPlugin = require('duplicate-package-checker-webpack-plugin');

var _duplicatePackageCheckerWebpackPlugin2 = _interopRequireDefault(_duplicatePackageCheckerWebpackPlugin);

var _statsWebpackPlugin = require('stats-webpack-plugin');

var _statsWebpackPlugin2 = _interopRequireDefault(_statsWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  return function (settings) {
    return function (ctx, next) {
      if (settings.isTest) {
        return next();
      }

      if (options.analyzer) {
        ctx.plugins.push(new _webpackBundleAnalyzer.BundleAnalyzerPlugin());
      }

      if (options.stats) {
        ctx.plugins.push(new _statsWebpackPlugin2.default('stats.json'));
      }

      if (options.duplicateAnalyzerChecker) {
        ctx.plugins.push(new _duplicatePackageCheckerWebpackPlugin2.default({
          verbose: true
        }));
      }

      next();
    };
  };
};