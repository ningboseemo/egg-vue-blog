<template>
  <div class="login-vue">
    <div class="container">
      <p class="title">WELCOME</p>
      <div class="input-c">
        <v-input v-model="username" placeholder="用户名" />
      </div>
      <div class="input-c">
        <v-input type="password" v-model="password" placeholder="密码" />
      </div>
      <div class="input-c">
        <v-input v-model="captcha" placeholder="验证码" />
        <div class="captcha-img" v-html="captchaImg" @click="getCaptcha">
          <!-- <img :src="captchaImg"> -->
        </div>
      </div>
      <v-button class="submit" type="primary" @click="submit">登 陆</v-button>
    </div>
  </div>
</template>
<script>
let login
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      captcha: '',
      captchaImg: ''
    }
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    async getCaptcha () {
      let res = await this.$http.get('/captcha')
      if (res) {
        this.captchaImg = res
      }
    },
    vaildInput() {
      const re = /^[\w@%$#@\.]+$/
      if (!this.captcha) {
        this.$Message.error('请输入验证码')
        return false
      }
      if (!re.test(this.username) || !re.test(this.password)) {
        this.$Message.error('请输入正确的用户名和密码')
        return false
      }
      return true
    },
    async submit() {
      if (!this.vaildInput()) {
        return
      }
      this.isShowLoading = true
      let res = await this.$http.post('/signin', {
        username: this.username,
        password: this.password,
        captcha: this.captcha
      })
      if (res.data) {
        this.$Message.success('登陆成功')
        localStorage.setItem('nb-token', res.data.token)
        let path = sessionStorage.getItem('CURRENT_ROUTE')
        this.$router.push(path || '/')
        sessionStorage.getItem('')
      }
      this.isShowLoading = false
      // .then(res => {
      //   localStorage.setItem('token', res.data)
      //   this.$router.push('manage')
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.login-vue {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #5cadff;
  .container {
    background: rgba(255, 255, 255, .3);
    width: 500px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
  }
  // .ivu-input {
  //   background-color: transparent;
  //   color: #fff;
  //   outline: #fff;
  //   border-color: #fff;
  // }
  // ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  //   color: rgba(255, 255, 255, .8);
  // }
  // :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  //   color: rgba(255, 255, 255, .8);
  // }
  // ::-moz-placeholder { /* Mozilla Firefox 19+ */
  //   color: rgba(255, 255, 255, .8);
  // }
  // :-ms-input-placeholder { /* Internet Explorer 10-11 */
  //   color: rgba(255, 255, 255, .8);
  // }
  .title {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .input-c {
    margin: auto;
    margin-bottom: 30px;
    position: relative;
    width: 200px;
  }
  .captcha-img {
    position: absolute;
    right: -150px;
    top: -14px;
  }
  .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
  }
  .submit {
    width: 200px;
  }
  .user {
    margin-top: 30px;
  }
  .user span {
    cursor: pointer;
  }
  .ivu-icon {
    color: #eee;
  }
  .ivu-icon-ios-close-circle {
    color: #777;
  }
}
</style>
