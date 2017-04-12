var path = require('path')
var webpack = require('webpack')

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}

module.exports = function(config) {
  config.set({
    webpack: webpackConfig,
    preprocessors: {
      'src/**/*.js': ['webpack'],
      'specs/**/*.js': ['webpack']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: true,
        "plugins": ["transform-es2015-modules-umd"]
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },
    basePath: '.',
    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    files: [
      'src/**/*.js',
      'specs/**/*.js'
    ],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    autoWatchBatchDelay: 50,
    singleRun: false
  });
};
