export default (options) => (settings) => (ctx, next) => {
  ctx.entry = options

  const isDefined = ctx.entry

  next(isDefined ? null : new Error('Entry must be defined'))
}
