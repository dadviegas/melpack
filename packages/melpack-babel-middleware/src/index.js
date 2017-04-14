export default (options) => (settings) => (ctx, next) => {
  const webpackSetup = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: settings.path.resolve.source,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  }

  ctx = Object.assign(ctx, webpackSetup)

  next()
}
