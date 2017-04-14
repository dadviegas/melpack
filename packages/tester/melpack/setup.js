console.log(require.resolve('babel-loader'))
import module from 'melpack-module-builder'

const environment = 'test'

const moduleOptions = {
  environment,
  releaseFlags: require(`../settings/${environment}.js`).default,
  analyzer: false,
  watch: false
}

export default module(moduleOptions)
