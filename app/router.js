module.exports = app => {
  const {router, controller} = app
  // console.log(controller)
  // router.resources('test', '/api/test', controller.test)

  router.resources('article', '/api/article', controller.article)

  router.get('/api/user', controller.user.index)
  router.get ('/api/captcha', controller.user.captcha)

  router.post('/api/checkCaptcha', controller.user.checkCaptcha)
  router.post('/api/signup', controller.user.signup) // 注册
  router.post('/api/signin', controller.user.signin) // 登陆

  router.post('/api/uploadImg', controller.upload.images) // 图片上传

  router.get(/(?!\/public\/)(?!\/api\/)/, controller.app.index)
  router.post(/(?!\/public\/)(?!\/api\/)/, controller.app.index)
}
