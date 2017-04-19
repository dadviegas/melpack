import path from 'path'

const PATH_DIST = './dist'
const PATH_SOURCE = './src'
const PATH_ASSETS = './assets'
const PATH_MODULES = './modules'
const resolvePath = (folder) => path.resolve(process.cwd(), folder)
const relativePath = (folder) => path.relative(PATH_SOURCE, folder)

const setEnv = (env) => {
  return {
    isProduction: env === 'qa' || env === 'production',
    isDevelopment: env === 'development',
    isTest: env === 'test'
  }
}

export default (options) => {
  const resolve = {
    get: resolvePath,
    root: resolvePath('.'),
    target: resolvePath(options.target || PATH_DIST),
    source: resolvePath(options.source || PATH_SOURCE),
    nodeModules: resolvePath('./node_modules')
  }

  const relative = {
    get: relativePath,
    root: relativePath('.'),
    modules: relativePath(PATH_MODULES),
    assets: relativePath(PATH_ASSETS),
    dist: relativePath(PATH_DIST),
  }

  const data =  {
    path: {
      resolve,
      relative
    },
    ...options,
    ...setEnv(options.environment)
  }

  return data
}
