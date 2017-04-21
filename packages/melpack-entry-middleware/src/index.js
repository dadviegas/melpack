export default (options) => (settings) => (ctx, next) => {
  ctx.entry = options

  next()
}
