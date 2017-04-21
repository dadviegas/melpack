import module, {getCommandOptions} from 'melpack-module-builder'

const options = getCommandOptions()
const {environment} = options

const moduleOptions = {
  releaseFlags: require(`../settings/${environment}.js`).default,
  analyzer: true,
  duplicateAnalyzerChecker: false,
  watch: false,
  ...options
}

export default module(moduleOptions)
