const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const axios  = require('axios')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs

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

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
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

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
// *匹配符不生效了 https://github.com/koajs/router/issues/76
router.get('(.*)', handleSSR)

module.exports = router
