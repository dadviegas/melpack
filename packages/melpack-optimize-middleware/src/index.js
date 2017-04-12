import webpack from 'webpack'
import WebpackChunkHash from 'webpack-chunk-hash'
import ChunkManifestPlugin from 'chunk-manifest-webpack2-plugin'

const fileNameGeneratePattern = (options) => {
  return options.isDevelopment ? '[name].js' : '[name].[chunkhash].js'
}

const defaultOptions = {
  applyVersion: false,
  applyManifest: false,
  applyCommonsChunk: false
}

export default (optionsOptimize) => (settings) => (ctx, next) => {
  const options = Object.assign(defaultOptions, optionsOptimize || {})
  const plugins = ctx.plugins || []
  
  if (settings.isProduction) {
    plugins.unshift.apply(plugins, [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          'screw_ie8': true
        },
        output: {
          comments: false
        },
        sourceMap: true
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          context: process.cwd()
        }
      })
    ])

    if(options.applyVersion) {
      plugins.unshift.apply(plugins, [
        new webpack.optimize.CommonsChunkPlugin({
          name: options.applyManifest ? ['vendor', 'manifest'] : ['vendor'],
          minChunks: Infinity
        }),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        new ChunkManifestPlugin({
          filename: 'chunk-manifest.json',
          manifestVariable: 'webpackManifest'
        })
      ])

      ctx.output = {
        ...ctx.output,
        filename: fileNameGeneratePattern(settings),
        chunkFilename: fileNameGeneratePattern(settings)
      }
    }

    if(options.applyCommonsChunk) {
      plugins.push.apply(plugins, [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'commons',
          filename: 'commons.[chunkhash].js',
          minChunks: 3
        })
      ])
    }

    ctx.plugins = plugins
  }

  next()
}
