import webpack from 'webpack'
import melpack, {karma} from 'melpack'
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

export const setupKarma = karma

export default (moduleOptions = {}) => {
  const options = Object.assign(defaultOptions, moduleOptions)
  const {environment, releaseFlags} = options

  const bundle = melpack(options)

  bundle.use(melpackBabelMiddleware())
  bundle.use(melpackEntryMiddleware({ index: './index.js' }))
  bundle.use(melpackOutputMiddleware({ 
    path: './lib',
    filename: '[name].js' 
  }))
  bundle.use(melpackOptimizeMiddleware())
  bundle.use(melpackDefineMiddleware(releaseFlags))
  bundle.use(melpackAnalyzerMiddleware(moduleOptions))

  const result = bundle.run((data) => {
    console.log('done')
  })
}


