const Controller = require('egg').Controller

class AppController extends Controller {
  async index (ctx) {
    const {mode} = ctx.query
    if (mode === 'csr') {
      await this.ctx.renderClient('spa.js', {url: this.ctx.url})
    } else {
      await this.ctx.render('spa.js', {url: this.ctx.url})
    }
  }
}

module.exports = AppController
