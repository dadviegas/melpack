'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (options) {
  return function (settings) {
    return function (ctx, next) {
      if (options.path) {
        settings.path.resolve.target = settings.path.resolve.get(options.path);
      }

      ctx.output = _extends({}, options, {
        path: settings.path.resolve.target
      });

      var isDefined = ctx.output;

      next(isDefined ? null : new Error('Output must be defined'));
    };
  };
};