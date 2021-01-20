const fs = require('fs')
const path = require('path')

module.exports = app => {
  const config = {}
  let baseDir = app.baseDir

  // exports.siteFile = {
  //   '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  // }

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks'
    }
  }
  config.vuessr = {
    layout: path.join(baseDir, 'app/web/view/template.html'),
    renderOptions: {
      baseDir: path.join(baseDir, 'app/view')
    }
  }

  config.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(baseDir, 'logs')
  }

  config.static = {
    prefix: '/public/',
    dir: path.join(baseDir, 'public')
  }

  config.keys = '123456',

  config.jwtSecret = 'cnb'

  // config.middleware = ['locals', 'access']
  config.middleware = ['auth']
  config.auth = {
    name: 'nb-token',
    backList: ['/api/user', '/api/article/*']
  }

  config.security = {
    csrf: {
      ignoreJSON: false,
      cookieName: 'csrfToken',
      sessionName: 'csrfToken',
      headerName: 'x-csrf-token'
    },
    xframe: {
      enable: false
    }
  }

  config.mongoose = {
    client: {
      url: 'mongodb://106.12.8.153:27017',
      options: {
        dbName: 'blog',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: 'test',
        pass: 'test'
      }
    },
    app: true,
    agent: false
  }

  // 文件上传
  config.multipart = {
    mode: 'stream',
    fileSize: '50mb'
  }

  return config
}