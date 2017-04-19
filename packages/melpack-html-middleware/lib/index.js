'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  return function (settings) {
    return function (ctx, next) {
      var _options$template = options.template,
          template = _options$template === undefined ? 'template.html' : _options$template,
          _options$title = options.title,
          title = _options$title === undefined ? '' : _options$title,
          _options$filename = options.filename,
          filename = _options$filename === undefined ? 'index.html' : _options$filename,
          chunks = options.chunks,
          _options$commonChunks = options.commonChunks,
          commonChunks = _options$commonChunks === undefined ? ['vendor', 'manifest', 'commons'] : _options$commonChunks;


      var chunksToApply = void 0;

      if (chunks instanceof String) {
        chunksToApply = commonChunks.push(chunks);
      }

      if (chunks instanceof Array) {
        chunksToApply = commonChunks.concat(chunks);
      }

      if (chunksToApply) {
        var htmlPage = new _htmlWebpackPlugin2.default({
          title: title,
          filename: filename,
          template: template,
          minify: {
            comments: false,
            loose: true
          },
          chunks: chunksToApply
        });

        ctx.plugins.push(htmlPage);
      }

      next();
    };
  };
};