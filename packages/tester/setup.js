import melpackModuleBuilder from 'melpack-module-builder'

const environment = 'qa'

const moduleOptions = {
  environment,
  releaseFlags: require(`./settings/${environment}.js`).default,
  analyzer: false,
  duplicateAnalyzerChecker: true
}

melpackModuleBuilder(moduleOptions)
