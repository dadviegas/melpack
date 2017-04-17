import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'

export default (options) => (settings) => (ctx, next) => {
  if (options.analyzer) {
    ctx.plugins.push(new BundleAnalyzerPlugin())
  }

  next()
}
 
