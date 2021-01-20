const Controller = require('egg').Controller

class BaseController extends Controller {
  constructor (...arg) {
    super(...arg)
  }
  error (message) {
    return {
      data: false,
      message: message,
      code: 0
    }
  }
  success (data) {
    return {
      data,
      code: 200,
      message: ''
    }
  }
}

module.exports = BaseController
