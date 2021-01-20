const {resolve} = require('path')
module.exports = {
  entry: {
    spa: 'app/web/index.js'
  },
  loaders: {
    less: true
  },
  // customize (webpackConfig) {
  //   // webpackConfig.resolve.alias['@'] = resolve(__dirname, '/app/web')
  //   console.log(webpackConfig.target, webpackConfig.module.rules[0].use[1])
  //   return webpackConfig
  // }
}
