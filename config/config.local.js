const path = require('path')
const ip = require('ip')
const webpackConfig = require('easywebpack-vue').getWebpackConfig()

module.exports = app => {
  const config = {}

  config.view = {
    cache: false
  }

  config.static = {
    maxAge: 0
  }

  config.development = {
    wathcDirs: [],
    ignoreDirs: ['app/web', 'public', 'config/manifest.json']
  }

  config.logview = {
    dir: path.join(app.baseDir, 'logs')
  }

  config.vuessr = {
    injectCss: true
  }

  config.webpack = {
    brower: false,
    webpackConfigList: webpackConfig
  }

  const localIp = ip.address()
  const domainWhiteList = []
  let ports = [7001, 9000, 9001]
  ports.forEach(port => {
    domainWhiteList.push(`http://localhost:${port}`)
    domainWhiteList.push(`http://127.0.0.1:${port}`)
    domainWhiteList.push(`http://${localIp}:${port}`)
  })

  config.security = { domainWhiteList }

  return config
}
