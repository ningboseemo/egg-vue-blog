// const Controller = require('egg').Controller
const BaseController = require('../lib/base.controller')
const svgCaptcha = require('svg-captcha')
const {sign} = require('jsonwebtoken')
class UserController extends BaseController {
  async index () {
    const {username} = this.ctx.query
    // let user = await this.ctx.service.user.get({username: 'aaa'})
    try {
      let user = await this.ctx.model.User.find({username: username})
      if (user.length) {
        this.ctx.body = this.success(true)
      } else {
        this.ctx.body = this.error('未查询到用户')
      }
    } catch (err) {
      this.ctx.body = this.error(err)
    }
  }
  async captcha () {
    const ctx = this.ctx
    const captcha = svgCaptcha.create()
    ctx.session.captcha = captcha.text
    ctx.set('Content-Type', 'image/svg+xml')
    ctx.body = captcha.data
  }
  async checkCaptcha () {
    const ctx = this.ctx
    let captcha = ctx.request.body.captcha
    if (captcha === (ctx.session.captcha && ctx.session.captcha.toLowerCase())) {
      ctx.body = true
    } else {
      ctx.body = false
    }
  }
  // 注册
  async signup () {
    const {ctx,app} = this
    const user = ctx.request.body
    try {
      const res = await ctx.model.User.create(user)
      if (res) {
        ctx.body = true
      }
    } catch (err) {
      console.log(err)
      ctx.body = err
    }
  }
  // 登陆
  async signin () {
    const {ctx} = this
    const {username, passward, captcha} = ctx.request.body
    if (!captcha) {
      ctx.body = {
        data: false,
        code: 0,
        message: '请填写验证码'
      }
      return
    }
    if (captcha.toLowerCase() !== (ctx.session.captcha && ctx.session.captcha.toLowerCase())) {
      ctx.body = {
        data: false,
        code: 0,
        message: '请正确填写验证码'
      }
      return
    }
    try {
      const res = await ctx.model.User.find({username, passward})
      if (res.length) {
        let user = JSON.parse(JSON.stringify(res[0]))
        delete user.password
        delete user._id

        ctx.body = {
          data: {...user, token: sign(user, this.config.jwtSecret)},
          code: 200,
          message: ''
        }
      } else {
        ctx.body = {
          data: false,
          code: 0,
          message: '用户名或者密码不正确'
        }
      }
    } catch (err) {
      console.log(err)
      ctx.body = err
    }
  }
}

module.exports = UserController
