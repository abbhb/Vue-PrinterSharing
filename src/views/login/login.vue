<template>
  <div class="login" id="login-app">
    <div class="login-box">
      <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
      <div class="login-form">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" >
          <div class="login-form-title">
<!--            <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" style="width:139px;height:42px;" alt="" />-->
                <span>AI综合服务平台</span>
          </div>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号" maxlength="20"
                      prefix-icon="iconfont icon-user" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码" prefix-icon="iconfont icon-lock" maxlength="20"
                      @keyup.enter.native="handleLogin" />
          </el-form-item>

          <el-form-item style="width:100%;">

            <div>
              <el-button :loading="loading" class="login-btn" size="medium" type="primary" style="width:100%;"
                         @click.native.prevent="handleLogin">
                <span v-if="!loading">登录</span>
                <span v-else>登录中...</span>
              </el-button>
              <el-button :loading="loading" class="login-btn" size="medium" type="primary" style="width:100%;"
                         @click.native.prevent="handleRe">
                <span>注册(临时使用)</span>

              </el-button>
            </div>

          </el-form-item>
        </el-form>


      </div>
    </div>
  </div>
</template>

<script>

import {loginApi,checkToken} from "@/api/login";
import router from "@/router";
export default {
  name: "login",
  el: '#login-app',
  data() {
    return {
      loginForm:{
        username: '',
        password: ''
      },
      loading: false
    }
  },
  computed: {
    loginRules() {
      const validateUsername = (rule, value, callback) => {
        if (value.length < 1 ) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码必须在6位以上'))
        } else {
          callback()
        }
      }
      return {
        'username': [{ 'validator': validateUsername, 'trigger': 'blur' }],
        'password': [{ 'validator': validatePassword, 'trigger': 'blur' }]
      }
    }
  },
  created() {
    this.checkToken()
  },
  methods: {
    async handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const res = await loginApi(this.loginForm.username,this.loginForm.password)
          if (String(res.code) === '1') {
            localStorage.setItem('userInfo',JSON.stringify(res.data))
            localStorage.setItem("permission",res.data.permission)
            localStorage.setItem('userId',String(res.data.id))
            localStorage.setItem('token',res.data.token)
            router.push({name:'index'})

          } else {
            this.$message.error(res.msg)
            sessionStorage.setItem("userLastStoreId","")

            this.loading = false
          }
        }
      })
    },
    handleRe() {
      router.push({name:'registration'})
    },
    async checkToken() {
      const res = await checkToken()

      if (String(res.code) === '1'){
        console.log("验证")

        localStorage.setItem("type",res.data.permissions)
        localStorage.setItem('userInfo',JSON.stringify(res.data))
        localStorage.setItem('userid',String(res.data.id))
        // localStorage.setItem('token',res.data.token)
        router.push({name:'index'})
      }else {
        sessionStorage.setItem("userLastStoreId","")
        // this.$message.error(res.msg)
        //此处就不提示token校验失败了，可能第一次本来就没有token
      }
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #333;
}
.login-box {
  width: 1000px;
  height: 474.38px;
  border-radius: 8px;
  display: flex;
}

.login-box img {
  width: 60%;
  height: auto;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
.login-form {
  background: #ffffff;
  width: 40%;
  border-radius: 0px 8px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form .el-form {
  width: 214px;
  height: 307px;
}
.login-form .el-form-item {
  margin-bottom: 30px;
}
.login-form .el-form-item.is-error .el-input__inner {
  border: 0 !important;
  border-bottom: 1px solid #fd7065 !important;
  background: #fff !important;
}
.login-form .input-icon {
  height: 32px;
  width: 18px;
  margin-left: -2px;
}
.login-form .el-input__inner {
  border: 0;
  border-bottom: 1px solid #e9e9e8;
  border-radius: 0;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  height: 32px;
  line-height: 32px;
}
.login-form .el-input__prefix {
  left: 0;
}
.login-form .el-input--prefix .el-input__inner {
  padding-left: 26px;
}
.login-form .el-input__inner::placeholder {
  color: #aeb5c4;
}
.login-form .el-form-item--medium .el-form-item__content {
  line-height: 32px;
}
.login-form .el-input--medium .el-input__icon {
  line-height: 32px;
}
.login-btn {
  border-radius: 17px;
  padding: 11px 20px !important;
  margin-top: 10px;
  font-weight: 500;
  font-size: 14px;
  border: 0;
  background-color: #ffc200;
}
.login-btn:hover,
.login-btn:focus {
  /* background: #FFC200; */
  /* color: #ffffff; */
}
.login-form-title {
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
.login-form-title .title-label {
  font-weight: 500;
  font-size: 20px;
  color: #333333;
  margin-left: 10px;
}

</style>