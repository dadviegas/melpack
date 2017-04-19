'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PATH_DIST = './dist';
var PATH_SOURCE = './src';
var PATH_ASSETS = './assets';
var PATH_MODULES = './modules';
var resolvePath = function resolvePath(folder) {
  return _path2.default.resolve(process.cwd(), folder);
};
var relativePath = function relativePath(folder) {
  return _path2.default.relative(PATH_SOURCE, folder);
};

var setEnv = function setEnv(env) {
  return {
    isProduction: env === 'qa' || env === 'production',
    isDevelopment: env === 'development',
    isTest: env === 'test'
  };
};

exports.default = function (options) {
  var resolve = {
    get: resolvePath,
    root: resolvePath('.'),
    target: resolvePath(options.target || PATH_DIST),
    source: resolvePath(options.source || PATH_SOURCE),
    nodeModules: resolvePath('./node_modules')
  };

  var relative = {
    get: relativePath,
    root: relativePath('.'),
    modules: relativePath(PATH_MODULES),
    assets: relativePath(PATH_ASSETS),
    dist: relativePath(PATH_DIST)
  };

  var data = _extends({
    path: {
      resolve: resolve,
      relative: relative
    }
  }, options, setEnv(options.environment));

  return data;
};