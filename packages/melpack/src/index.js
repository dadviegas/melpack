import webpack from 'webpack'
import environment from './environment'
import getConfig from './webpack/config'
import Middleware from 'melpack-middleware'
import jasmineServer from 'melpack-jasmine'
import GUtil from 'gulp-util'
import shell from 'shelljs'
import statsConfig from './webpack/stats'

const defaultOptions = {
  environment: 'production',
  watch: false
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
      const func = (data) => {
        webpack(data, (err, stats) => {
        if (err) { throw new GUtil.PluginError('webpack:build', err); }
          GUtil.log('[webpack:build]', stats.toString(statsConfig(settings)));
        })
        cb && cb(data)
      }

      run(func.bind(this))
    },
    test: () => run((webpackConfig) => jasmineServer(options, webpackConfig, settings))
  }
}
