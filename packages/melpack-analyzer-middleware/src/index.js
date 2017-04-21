import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin'
import statsWebpackPlugin from 'stats-webpack-plugin'

export default (options) => (settings) => (ctx, next) => {
  if(settings.isTest) {
    return next()
  }

  if (options.analyzer) {
    ctx.plugins.push(new BundleAnalyzerPlugin())
  }
  
  if (options.stats) {
    ctx.plugins.push(new statsWebpackPlugin('stats.json'))
  }

  if (options.duplicateAnalyzerChecker) {
    ctx.plugins.push(new DuplicatePackageCheckerPlugin({
      verbose: true
    }))
  }

  next()
}
 
