import webpack from 'webpack'
import environment from './environment'
import getConfig from './webpack/config'
import Middleware from 'melpack-middleware'
import GUtil from 'gulp-util'
import shell from 'shelljs'
import statsConfig from './webpack/stats'
import gulp from 'gulp'
import {Server} from 'karma'

const defaultOptions = {
  environment: 'production',
  watch: false
}

export const karma = (options = {}) => {
  gulp.task('test', function (done) {
    return new Server({
      configFile: __dirname + '/karma.conf.js',
      ...options
    }, done).start();
  })

  gulp.start('test')
}

export default (melpackOptions) => {
  const options = Object.assign(defaultOptions, melpackOptions)
  const settings = environment(options)
  const opts = getConfig(settings)
  const { use, run } = new Middleware(opts, settings)

  shell.rm('-rf', settings.path.resolve.target)

  return {
    use,
    run: (cb) => {
      run((data) => {
        webpack(data, (err, stats) => {
        if (err) { throw new GUtil.PluginError('webpack:build', err); }
          GUtil.log('[webpack:build]', stats.toString(statsConfig(settings)));
        })
        cb && cb(data)
      })
    }
  }
}
