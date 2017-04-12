import statsWebpackPlugin from 'stats-webpack-plugin'

export default (settings) => {
  const isDevelopment = settings.isDevelopment
  const source = settings.source || settings.path.resolve.source
  const target = settings.target || settings.path.resolve.target

  return {
    watch: settings.watch,
    devtool: isDevelopment ? 'inline-source-map' : 'cheap-source-map',
    context: source,
    entry: {
      index: './index.js'
    },
    output: {
      path: target,
      filename: `[name].js`
    },
    plugins: [
      // new statsWebpackPlugin('stats.json', stats)
    ],
    resolve: {
      modules: [
        '.', 
        settings.path.relative.nodeModules, 
        settings.path.relative.modules, 
        settings.path.relative.assets
      ],
      extensions: ['.loader.js', '.js', ".json"]
    },
    performance: {
      hints: "warning"
    }
  }
}
