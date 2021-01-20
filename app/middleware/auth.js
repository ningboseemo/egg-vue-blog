const {verify} = require('jsonwebtoken')

function validToken (token, key) {
  return new Promise((resolve, reject) => {
    verify(token, key, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}

module.exports = (options, app) => {
  return async (ctx, next) => {
    console.log('middiler', ctx.request.url, ctx.request.method)
    if (!options.backList.includes(ctx.request.path) || ctx.request.method === 'GET') {
      await next()
      return
    }
    let token = ctx.get(options.name)
    console.log('token', token)
    if (!token) {
      this.ctx.redirect('/login')
      ctx.body = {
        data: false,
        code: 0,
        message: '没有获取到token'
      }
    } else {
      try {
        let info = await validToken(token, app.config.jwtSecret)
        ctx.body = {
          data: info,
          code: 200,
          message: ''
        }
      } catch (err) {
        ctx.body = {
          data: false,
          code: 0,
          message: err
        }
      }
    }
  }
}