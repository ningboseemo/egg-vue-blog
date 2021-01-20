const BaseController = require('../lib/base.controller')
const fs = require('fs')
const path = require('path')
const day = require('dayjs')
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')

class UploadController extends BaseController {
  async images () {
    const ctx = this.ctx
    let filesStream = await ctx.getFileStream()
    let savePath = this.app.baseDir + '/public/upload'
    let time = Date.now()
    let filename = formatFilename(filesStream.filename, time)

    function formatFilename (name) {
      let nameArr = name.split('.')
      if (nameArr.length > 1) {
        nameArr.splice(-1, 0, time)
      }
      return nameArr.join('.')
    }
    // 递归创建目录
    function makeDirSync (dir) {
      if (fs.existsSync(dir)) {
        return true
      } else {
        if (makeDirSync(path.dirname(dir))) { // path.dirname是查询上一级目录
          fs.mkdirSync(dir)
          return true
        }
      }
    }
    let dirname = day().format('YYYY-MM-DD')
    makeDirSync(path.join(savePath, dirname))
    let target = path.join(savePath, dirname, filename)
    let writeStream = fs.createWriteStream(target)
    try {
      await awaitWriteStream(filesStream.pipe(writeStream))
    } catch (err) {
      await sendToWormhole(filesStream)
      ctx.body = this.error(err)
    }
    const filePath = path.join('/public/upload/', dirname, filename)
    ctx.body = this.success(filePath)
  }
}

module.exports = UploadController