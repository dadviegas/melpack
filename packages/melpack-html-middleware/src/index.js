import HtmlWebpackPlugin from 'html-webpack-plugin'

export default (options) => (settings) => (ctx, next) => {
  const {
    template = 'template.html',
    title = '',
    filename = 'index.html',
    chunks,
    commonChunks = ['vendor', 'manifest', 'commons']
  } = options

  let chunksToApply

  if (chunks instanceof String) {
    chunksToApply = commonChunks.push(chunks)
  }

  if (chunks instanceof Array) {
    chunksToApply = commonChunks.concat(chunks)
  }

  if (chunksToApply) {
    const htmlPage = new HtmlWebpackPlugin({
      title: title,
      filename: filename,
      template: template,
      minify: {
        comments: false,
        loose: true
      },
      chunks: chunksToApply
    })

    ctx.plugins.push(htmlPage)
  }

  next()
}
 
