export default (options) => (settings) => (ctx, next) => {
  if (options.path) {
    settings.path.resolve.target = settings.path.resolve.get(options.path)
  }

  ctx.output = {
    ...options,
    path: settings.path.resolve.target
  }

  const isDefined = ctx.output

  next(isDefined ? null : new Error('Output must be defined'))
}
