import path from'path'
import webpack from'webpack'
import {Server} from 'karma'
import gulp from 'gulp'

const webpackConfigDefault = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}

export default (options, webpackConf = webpackConfigDefault, settings) => {
  delete webpackConf.entry
  delete webpackConf.output

  gulp.task('test', function (done) {
    return new Server({
      webpack: webpackConf,
      preprocessors: {
        'src/**/*.js': ['webpack', 'sourcemap'],
        'specs/**/*.js': ['webpack', 'sourcemap']
      },
      basePath: settings.path.resolve.root,
      frameworks: ['jasmine'],
      reporters: ['spec'],
      specReporter: {
        maxLogLines: 5,             // limit number of lines logged per test
        suppressErrorSummary: false, // do not print error summary
        suppressFailed: false,      // do not print information about failed tests
        suppressPassed: true,      // do not print information about passed tests
        suppressSkipped: false,      // do not print information about skipped tests
        showSpecTiming: true,      // print the time elapsed for each spec
        failFast: false              // test would finish with error when a first fail occurs. 
      },
      browsers: ['PhantomJS'],
      files: [
        'src/**/*.js',
        'specs/**/*.js'
      ],
      autoWatch: options.watch,
      singleRun: !options.watch,
    }, done).start();
  })

  gulp.start('test')
}
