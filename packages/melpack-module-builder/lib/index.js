'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _melpack = require('melpack');

var _melpack2 = _interopRequireDefault(_melpack);

var _melpackEntryMiddleware = require('melpack-entry-middleware');

var _melpackEntryMiddleware2 = _interopRequireDefault(_melpackEntryMiddleware);

var _melpackOutputMiddleware = require('melpack-output-middleware');

var _melpackOutputMiddleware2 = _interopRequireDefault(_melpackOutputMiddleware);

var _melpackBabelMiddleware = require('melpack-babel-middleware');

var _melpackBabelMiddleware2 = _interopRequireDefault(_melpackBabelMiddleware);

var _melpackOptimizeMiddleware = require('melpack-optimize-middleware');

var _melpackOptimizeMiddleware2 = _interopRequireDefault(_melpackOptimizeMiddleware);

var _melpackDefineMiddleware = require('melpack-define-middleware');

var _melpackDefineMiddleware2 = _interopRequireDefault(_melpackDefineMiddleware);

var _melpackAnalyzerMiddleware = require('melpack-analyzer-middleware');

var _melpackAnalyzerMiddleware2 = _interopRequireDefault(_melpackAnalyzerMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  analyzer: false,
  duplicateAnalyzerChecker: false,
  environment: 'production',
  releaseFlags: {},
  watch: false
};

exports.default = function () {
  var moduleOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var options = Object.assign(defaultOptions, moduleOptions);
  var environment = options.environment,
      releaseFlags = options.releaseFlags;


  var bundle = (0, _melpack2.default)(options);

  bundle.use((0, _melpackEntryMiddleware2.default)({ index: './index.js' }));
  bundle.use((0, _melpackOutputMiddleware2.default)({
    path: './lib',
    filename: '[name].js'
  }));
  bundle.use((0, _melpackBabelMiddleware2.default)());
  bundle.use((0, _melpackOptimizeMiddleware2.default)());
  bundle.use((0, _melpackDefineMiddleware2.default)(releaseFlags));
  bundle.use((0, _melpackAnalyzerMiddleware2.default)(moduleOptions));

  return bundle;
};