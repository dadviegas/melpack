export default (options) => (settings) => (ctx, next) => {
  ctx.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    include: settings.path.resolve.source,
    use: {
      loader: 'babel-loader'
    }
  })

  next()
}
