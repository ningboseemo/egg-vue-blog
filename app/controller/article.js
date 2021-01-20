const BaseController = require('../lib/base.controller')
const { nanoid } = require('nanoid')
class ArticleController extends BaseController {
  // get article
  async index () {
    /**
     * id
     * article_title
     * article_content
     * author_id
     * classification_id
     * classification_name
     * author_name
     * read_count
     * createTime
     * updateTime
     */
    let ctx = this.ctx
    try {
      let classification_id = ctx.query.classification_id
      let list
      if (classification_id) {
        list = await ctx.model.Article.find({classification_id, is_delete: 0})
      } else {
        list = await ctx.model.Article.find({is_delete: 0})
      }
      ctx.body = this.success(list)
    } catch (err) {
      ctx.body = this.error(err)
    }
  }
  // get /article/:id
  async show () {
    let ctx = this.ctx
    let id = ctx.params.id
    if (!id) {
      this.ctx.body = this.error('文章id不能空')
      return
    }
    try {
      let res = await this.ctx.model.Article.findOne({id, is_delete: 0})
      if (res) {
        this.ctx.body = this.success(res)
      } else {
        this.ctx.body = this.error('未查询到文章')
      }
    } catch (err) {
      this.ctx.body = this.error(err)
    }
  }
  async list () {
  }
  // post article
  async create () {
    let body = this.ctx.request.body
    let id = nanoid()
    let params = {
      id,
      create_time: Date.now(),
      update_time: Date.now(),
      read_count: 0,
      status: 0,
      is_delete: 0
    }
    params.article_title = body.article_title || ''
    params.sub_title = body.sub_title || ''
    params.article_content = body.article_content || ''
    params.author_id = body.author_id || null
    params.author_name = body.author_name || null
    params.classification_id = body.classification_id || null
    params.classification_name = body.classification_name || null
    try {
      let res = await this.ctx.model.Article.create(params)
      this.ctx.body = this.success(res.id)
    } catch (err) {
      this.ctx.body = this.error(err)
    }
  }
  // put article
  async update () {
    let body = this.ctx.request.body
    let ctx = this.ctx
    let id = ctx.params.id
    if (!id) {
      this.ctx.body = this.error('文章id不能空')
      return
    }
    let params = Object.assign({ updateTime: Date.now()}, {...body})
    try {
      let res = await this.ctx.model.Article.updateOne({id}, params)
      this.ctx.body = this.success(true)
    } catch (err) {
      this.ctx.body = this.error(err)
    }
  }
  // delete /article/:id
  async destroy () {
    let ctx = this.ctx
    let id = ctx.params.id
    if (!id) {
      this.ctx.body = this.error('文章id不能空')
      return
    }
    let params = {
      is_delete: 1
    }
    try {
      let res = await this.ctx.model.Article.updateOne({id}, params)
      this.ctx.body = this.success(true)
    } catch (err) {
      this.ctx.body = this.error(err)
    }
  }
}

module.exports = ArticleController
