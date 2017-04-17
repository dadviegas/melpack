import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin'
 
export default (options) => (settings) => (ctx, next) => {
  if (options.analyzer) {
    ctx.plugins.push(new BundleAnalyzerPlugin())
  }
  
  if (options.duplicateAnalyzerChecker) {
    ctx.plugins.push(new DuplicatePackageCheckerPlugin({
      verbose: true
    }))
  }

  next()
}
 
