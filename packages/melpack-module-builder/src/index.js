import melpack, {getCommandOptions as commandParser} from 'melpack'
import melpackEntryMiddleware from 'melpack-entry-middleware'
import melpackOutputMiddleware from 'melpack-output-middleware'
import melpackBabelMiddleware from 'melpack-babel-middleware'
import melpackOptimizeMiddleware from 'melpack-optimize-middleware'
import melpackDefineMiddleware from 'melpack-define-middleware'
import melpackAnalyzerMiddleware from 'melpack-analyzer-middleware'

const defaultOptions = {
  analyzer: false,
  duplicateAnalyzerChecker: false,
  environment: 'production',
  releaseFlags: {},
  watch: false
}

export const getCommandOptions = commandParser

export default (moduleOptions = {}) => {
  const options = Object.assign(defaultOptions, moduleOptions)
  const {environment, releaseFlags} = options

  const bundle = melpack(options)
  bundle.use(melpackEntryMiddleware(options.entry || { index: ['./index.js'] }))
  bundle.use(melpackOutputMiddleware(options.output || {path: './lib'}))
  bundle.use(melpackBabelMiddleware())
  bundle.use(melpackOptimizeMiddleware())
  bundle.use(melpackDefineMiddleware(releaseFlags))
  bundle.use(melpackAnalyzerMiddleware(moduleOptions))

  return bundle
}


