const Controller = require('egg').Controller

/**
 * GET	/posts	posts	app.controllers.posts.index
 * GET	/posts/new	new_post	app.controllers.posts.new
 * GET	/posts/:id	post	app.controllers.posts.show
 * GET	/posts/:id/edit	edit_post	app.controllers.posts.edit
 * POST	/posts	posts	app.controllers.posts.create
 * PUT	/posts/:id	post	app.controllers.posts.update
 * DELETE	/posts/:id	post	app.controllers.posts.destroy
 */
class TestControllrt extends Controller {
  // 对应路由get /test
  async index () {
  }
  // 对应路由 get test/new
  async new () {
  }
  // 对应路由 get test/:id
  async show () {
  }
  // 对应路由 get test/:id/edit
  async edit () {
  }
  // 对应路由 post test
  async create () {
  }
  // 对应路由 put test/:id
  async update () {
  }
  // 对应路由 delete test/:id
  async destroy () {
  }
}

module.exports = TestControllrt
