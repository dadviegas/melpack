export default (options) => (settings) => (ctx, next) => {
  const webpackSetup = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: settings.path.resolve.nodeModules,
          include: settings.path.resolve.source,
          loader: 'babel-loader'
        }
      ]
    }
  }

  ctx = Object.assign(ctx, webpackSetup)

  next()
}
