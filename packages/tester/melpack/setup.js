import melpack from 'melpack-module-builder'

const environment = 'test'

const moduleOptions = {
  environment,
  releaseFlags: require(`../settings/${environment}.js`).default,
  analyzer: true,
}

export default melpack(moduleOptions)
