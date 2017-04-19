'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  return function (settings) {
    return function (ctx, next) {
      var webpackSetup = {
        module: {
          rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: settings.path.resolve.source,
            use: {
              loader: 'babel-loader'
            }
          }]
        }
      };

      ctx = Object.assign(ctx, webpackSetup);

      next();
    };
  };
};