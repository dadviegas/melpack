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
      reporters: ['progress'],
      browsers: ['PhantomJS'],
      files: [
        'src/**/*.js',
        'specs/**/*.js'
      ],
      autoWatch: options.watch,
      autoWatchBatchDelay: 10,
      singleRun: !options.watch,
    }, done).start();
  })

  gulp.start('test')
}
