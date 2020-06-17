const path = require('path')
const fs = require('fs')
// node冷门模块
// const NativeModule = require('module')
// const vm = require('vm')

const Router = require('koa-router')
const axios  = require('axios')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render-no-bundle')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
// const mfs = new MemoryFs()
// serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  stats = stats.toJson()
  stats.errors.forEach(err => {
    console.log(err)
  })
  stats.warnings.forEach(warning => {
    console.log(warning)
  })

  const bundlePath = path.join(serverConfig.output.path, 'server-entry.js')
  delete require.cache[bundlePath]
  bundle = require('../../server-build/server-entry').default

  // try {
  //   const m = { exports: {} }
  //   const bundleStr = mfs.readFileSync(bundlePath, 'utf-8')
  //   const wrapper = NativeModule.wrap(bundleStr)
  //   const script = new vm.Script(wrapper, {
  //     filename: 'server-entry.js',
  //     displayErrors: true
  //   })
  //   const result = script.runInThisContext()
  //   result.call(m.exports, m.exports, require, m)
  //   bundle = m.exports.default
  // } catch (error) {
  //   console.error(error)
  // }

  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body ='稍等......'
    return
  }

  const clientManifestResp = await axios.get('http://127.0.0.1:8000/public/vue-ssr-client-manifest.json')

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

  const renderer = VueServerRenderer.createRenderer({
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()
// *匹配符不生效了 https://github.com/koajs/router/issues/76
router.get('(.*)', handleSSR)

module.exports = router
