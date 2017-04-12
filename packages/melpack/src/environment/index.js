import path from 'path'

const PATH_DIST = './dist'
const PATH_SOURCE = './src'
const PATH_ASSETS = './assets'
const PATH_MODULES = './modules'

const resolveInternalPath = (folder) => path.resolve(__dirname, folder)
const relativeInternalPath = (folder) => path.relative(__dirname, folder)
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
    target: resolvePath(options.target || PATH_DIST),
    source: resolvePath(options.source || PATH_SOURCE),
    nodeModules: resolveInternalPath('node_modules')
  }

  const relative = {
    get: relativePath,
    modules: relativePath(PATH_MODULES),
    assets: relativePath(PATH_ASSETS),
    dist: relativePath(PATH_DIST),
    nodeModules: relativePath('node_modules')
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
