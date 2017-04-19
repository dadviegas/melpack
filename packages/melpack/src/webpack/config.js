import statsBuilder from './stats'

// https://webpack.js.org/configuration/

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
    plugins: [],
    resolve: {
      modules: [
        '.',
        settings.path.resolve.nodeModules,
        settings.path.resolve.source
      ],
      extensions: ['.loader.js', '.js', ".json"]
    },
    performance: {
      hints: "warning"
    }
  }
}
