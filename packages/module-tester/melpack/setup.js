import melpack from 'melpack'
import melpackEntryMiddleware from 'melpack-entry-middleware'
import melpackOutputMiddleware from 'melpack-output-middleware'
import melpackBabelMiddleware from 'melpack-babel-middleware'
import melpackOptimizeMiddleware from 'melpack-optimize-middleware'
import melpackDefineMiddleware from 'melpack-define-middleware'
import melpackAnalyzerMiddleware from 'melpack-analyzer-middleware'

const environment = 'test'

const defaultOptions = {
  analyzer: false,
  duplicateAnalyzerChecker: false,
  environment,
  releaseFlags: require(`../settings/${environment}.js`).default,
  analyzer: false,
  watch: false
}

export const module = (moduleOptions = {}) => {
  const options = Object.assign(defaultOptions, moduleOptions)
  const {environment, releaseFlags} = options

  const bundle = melpack(options)
  
  bundle.use(melpackEntryMiddleware({ index: './index.js' }))
  bundle.use(melpackOutputMiddleware({ 
    path: './lib',
    filename: '[name].js' 
  }))
  bundle.use(melpackBabelMiddleware())
  bundle.use(melpackOptimizeMiddleware())
  bundle.use(melpackDefineMiddleware(releaseFlags))
  bundle.use(melpackAnalyzerMiddleware(moduleOptions))

  return bundle
}

export default module(defaultOptions)
