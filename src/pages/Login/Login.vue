<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                name="phone"
                v-model="phone"
                v-validate="'required|mobile'"
              />
              <!-- disabled:限制用户是否可以重复点击，
              当不是一个正确手机号的时候
              或者计数器还大于0的时候---》解决倒计时的时候点击 开启多个定时器，造成倒计数错误
              不能点击
              -->
              <button
                :disabled="!isRightPhone || computeTime>0"
                class="get_verification"
                :class="{right_phone_number:isRightPhone}"
                @click.prevent="sendCode"
              >{{computeTime>0?`短信已发送(${computeTime})`:'获取验证码'}}</button>
              <span style="color:red">{{errors.first('phone')}}</span>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                name="code"
                v-validate="{required:true,regex:/^\d{6}$/}"
                v-model="code"
              />
              <span style="color:red">{{errors.first('code')}}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  name="name"
                  v-model="name"
                  placeholder="手机/邮箱/用户名"
                  v-validate="'required'"
                />
                <span style="color: red">{{errors.first('name')}}</span>
              </section>
              <section class="login_verification">
                <input
                  :type="isShowPwd ? 'text' :'password'"
                  name="pwd"
                  maxlength="8"
                  v-model="pwd"
                  placeholder="密码"
                  v-validate="{required:true}"
                />
                <div
                  class="switch_button"
                  @click="isShowPwd = !isShowPwd"
                  :class="isShowPwd ? 'on':'off'"
                >
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':'...'}}</span>
                </div>
                <span style="color: red">{{errors.first('pwd')}}</span>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  name="captcha"
                  v-model="captcha"
                  placeholder="验证码"
                  v-validate="{required:true,regex:/^.{4}$/}"
                />
                <img
                  ref="captcha"
                  class="get_verification"
                  src="http://localhost:5000/captcha"
                  @click="updateCaptcha"
                  alt="captcha"
                />
                <span style="color: red">{{errors.first('captcha')}}</span>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:;" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
import { reqSendCode, reqPwdLogin, reqSmsLogin } from '../../api'
import { Toast, MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      // 登录方式切换：true：短信登录，false：密码登录
      loginWay: 'true',
      phone: '', // 手机号
      computeTime: 0, // 倒计时剩余时间
      isShowPwd: false, // 显示/隐藏密码  false:隐藏   true：显示
      code: '', // 一次性短信验证码
      name: '', // 用户名
      pwd: '', // 密码
      captcha: '' // 一次性图片验证码
    }
  },
  computed: {
    // 判断是否是一个正确的手机号
    isRightPhone() {
      const reg = /^1\d{10}$/
      return reg.test(this.phone)
    }
  },
  methods: {
    // 发送验证码
    async sendCode() {
      // 在点击后，computeTime设置为最大值、
      this.computeTime = 20
      // 启动一个定时器来每隔一秒 computeTime-1
      const intervalId = setInterval(() => {
        if (this.computeTime === 0) {
          clearInterval(intervalId)
        }
        this.computeTime--
      }, 1000)
      // 点击后发送验证码的请求
      const result = await reqSendCode(this.phone)
      if (result.code === 0) {
        // alert('短信发送成功')
        // 使用mint-ui的方法
        Toast('短信发送成功')
      } else {
        // 清除计时器
        this.computeTime = 0
        // alert(result.msg)
        MessageBox.alert(result.msg)
      }
    },
    // 点击登录后
    async login() {
      const { loginWay, phone, code, name, pwd, captcha } = this
      let names
      let result
      // 根据当前显示的登录方式进行验证
      if (loginWay) {
        //短信登录
        result = await reqSmsLogin(phone, code)
        // 在发送请求之后，暂定倒计时
        this.computeTime = 0
        names = ['phone', 'code']
      } else {
        result = await reqPwdLogin({ name, pwd, captcha })
        // 如果登录失败，刷新验证码、清空输入框中的内容
        if (result.code === 1) {
          this.updateCaptcha()
          this.captcha = ''
        }
        names = ['用户名', '密码', '验证码']
      }
      // 根据请求的结果进行下一步响应处理
      if (result.code === 0) {
        const user = result.data
        // 把用户信息存到state中
        this.$store.dispatch('saveUser', user)
        // 跳转到个人中心
        this.$router.replace('/profile')
      } else {
        MessageBox.alert(result.msg)
      }
      // 对所有表单项进行验证；不管当前登录方式是哪种，所有的表单项都要验证
      // const success = await this.$validator.validateAll()
      // const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证
      // // 验证返回的是promise对象，是一个布尔值
      // if (success) {
      //   console.log('表单验证通过，发送登录请求')
      // }
    },
    // 验证码刷新发请求
    updateCaptcha() {
      const time = Date.now()
      // 指定的src请求的地址，需要每次请求的地址不能一样，所以加一个时间戳
      this.$refs.captcha.src = 'http://localhost:5000/captcha?time=' + time
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl'

.loginContainer
  width 100%
  height 100%
  background #fff

  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto

    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center

      .login_header_title
        padding-top 40px
        display flex
        align-items center
        justify-content center

        >a
          color #333
          font-size 14px
          padding-bottom 4px

          &:first-child
            margin-right 40px

          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774

    .login_content
      >form
        >div
          display none

          &.on
            display block

          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial

            &:focus
              border 1px solid #02a774

          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent

              &.right_phone_number
                color black

          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)

              &.off
                background #fff

                .switch_text
                  float right
                  color #ddd

              &.on
                background #02a774

              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s

                &.right
                  transform translateX(27px)

          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px

            >a
              color #02a774

        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0

      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999

    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px

      >.iconfont
        font-size 20px
        color #999
</style>
