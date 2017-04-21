"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  return function (settings) {
    return function (ctx, next) {
      ctx.entry = options;

      next();
    };
  };
};