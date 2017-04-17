import webpack from 'webpack'

const getReleaseFlags = (releaseFlags = {}) => {
  const data = {}
  Object.keys(releaseFlags).forEach((key) => {
    if (typeof releaseFlags[key] === 'string') {
      data[key] = JSON.stringify(releaseFlags[key])
    } else {
      data[key] = releaseFlags[key]
    }
  })

  return data
}

export default (options) => (settings) => (ctx, next) => {
  ctx.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(settings.environment),
    ...getReleaseFlags(options)
  }))

  next()
}