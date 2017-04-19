'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  return function (settings) {
    return function (ctx, next) {
      ctx.entry = options;

      var isDefined = ctx.entry;

      next(isDefined ? null : new Error('Entry must be defined'));
    };
  };
};