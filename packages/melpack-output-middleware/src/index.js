export default (options) => (settings) => (ctx, next) => {
  if (options.path) {
    settings.path.resolve.target = settings.path.resolve.get(options.path)
    console.log(options.path, settings.path.resolve.target)
  }

  ctx.output = {
    ...options,
    path: settings.path.resolve.target
  }

  const isDefined = ctx.output

  next(isDefined ? null : new Error('Output must be defined'))
}
