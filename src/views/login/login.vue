<template>
  <div class="login" id="login-app">
    <div class="login-box">
      <div class="gQMFXb imn">
        <div class="sc-hLBbgP ipKqCS">
          <div class="sc-hLBbgP bVBmg promoContainer">
            <div class="sc-hLBbgP bVBmg promoHeader">AI&nbsp;综合服务平台</div>
            <div class="sc-hLBbgP bVBmg promoInfo">AI综合服务平台集成了常用服务,大大简化了操作步骤.</div>
            <div class="sc-hLBbgP bVBmg promoInfo">AI综合服务平台集成了常用服务,大大简化了操作步骤.</div>
            <div class="sc-hLBbgP bVBmg promoInfo">AI综合服务平台集成了常用服务,大大简化了操作步骤.</div>
            <div class="sc-hLBbgP bVBmg promoInfo">AI综合服务平台集成了常用服务,大大简化了操作步骤.</div>
          </div>
        </div>
        <div class="sc-hLBbgP bVBmg videoContainer">
        <video autoplay playsinline loop disablepictureinpicture
               poster="@/assets/static/media/loginAnimationPoster.9aa924bfe619e71d5d29.png" class="videoBG">
          <source src="@/assets/static/media/videoBG.17363418b3c2246a0e27.mp4" type="video/mp4">
        </video>
        </div>
      </div>
      <div class="waiqian bWXzON">
        <div class="login-form">
          <div class="sc-hLBbgP bWXzON logoContainer">
            <img width="70%" src="@/assets/static/media/AI3.png">
          </div>
          <div class="logins" v-if="!isRegistration">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" >
              <el-form-item prop="username">
                <el-input
                          v-model="loginForm.username"
                          type="text"
                          auto-complete="off"
                          placeholder="账号"
                          maxlength="20"
                          prefix-icon="el-icon-user" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" show-password placeholder="密码" prefix-icon="el-icon-lock" maxlength="20"
                          @keyup.enter.native="handleLogin" />
              </el-form-item>

              <el-form-item style="width:100%;">

                <div style="display: flex;flex-flow: column;justify-content: center;align-items: flex-end;">
                  <el-button :loading="loading" class="login-btn" size="medium" type="primary" style="width:100%;"
                             @click.native.prevent="handleLogin">
                    <span v-if="!loading">登录</span>
                    <span v-else>登录中...</span>
                  </el-button>
                  <el-button :loading="loading" class="login-btn" size="medium" type="primary" style="width:100%;"
                             @click.native.prevent="handleRe">
                    <span>注册</span>

                  </el-button>
                </div>

              </el-form-item>
            </el-form>
          </div>
          <div class="logins" v-else-if="isRegistration">
            <el-form ref="registrationForm" :model="registrationForm" :rules="registrationRules" >
              <el-form-item prop="username">
                <el-input
                          v-model="registrationForm.username"
                          type="text"
                          auto-complete="off"
                          placeholder="用户名"
                          maxlength="20"
                          prefix-icon="el-icon-user" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="registrationForm.password" type="password" show-password placeholder="密码" prefix-icon="el-icon-lock" maxlength="20"
                          @keyup.enter.native="handleLogin" />
              </el-form-item>
              <el-form-item prop="name">
                <el-input
                    v-model="registrationForm.name"
                    type="text"
                    auto-complete="off"
                    placeholder="昵称"
                    maxlength="20"
                    prefix-icon="el-icon-user" />
              </el-form-item>
              <el-form-item prop="sex">
                <el-select v-model="registrationForm.sex" placeholder="请选择用户性别">
                  <el-option
                      v-for="item in sexoptions"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>


              <el-form-item
                  prop="phone"
              >
                <el-input
                    v-model="registrationForm.phone"
                    placeholder="请填写用户手机号"
                    maxlength="11"
                />
              </el-form-item>
              <el-form-item
                  prop="studentId"
              >
                <el-input
                    v-model="registrationForm.studentId"
                    placeholder="请填写用户学号"
                    maxlength="18"
                />
              </el-form-item>


              <el-form-item style="width:100%;">

                <div style="display: flex;flex-flow: column;justify-content: center;align-items: flex-end;">
                  <el-button :loading="loading" :disabled="loading" class="login-btn" size="medium" type="primary" style="width:100%;"
                             @click.native.prevent="ButtonRe">
                    <span v-if="!loading">注册</span>
                    <span v-else>注册中...</span>
                  </el-button>
                  <el-button class="login-btn" size="medium" type="primary" style="width:100%;"
                             @click.native.prevent="handleLo">
                    <span>返回登录</span>

                  </el-button>
                </div>

              </el-form-item>
            </el-form>
          </div>







        </div>
      </div>

    </div>
  </div>
</template>

<script>

import {loginApi,checkToken} from "@/api/login";
import router from "@/router";
import * as Api from "@/api/login";
export default {
  name: "login",
  el: '#login-app',
  data() {
    return {
      loginForm:{
        username: '',
        password: ''
      },
      sexoptions:[{label:"男",value:"男"},{label:"女",value:"女"}],
      registrationForm:{
        username: '',
        password: '',
        name:'',
        phone:'',
        studentId:'',
        sex:'',
        permission:'2',
        status:'1',//默认启用
        avatar:'',//url
      },
      loading: false,
      isRegistration:false,//默认是登录
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
    },
    registrationRules () {
      return {
        'name': [
          {'required': true, 'message': '请填写用户名称', 'trigger': ['blur']}
        ],
        'username': [
          {'required': true,
            // 'message': '请填写用户密码',
            validator: async (rules, value, callback) => {
              if (!value) {
                this.$message.error("请填写用户名称")
                callback(new Error('请填写用户名称'))
              } else {
                let params = {"username": this.registrationForm.username}
                const res = await Api.hasUserName(params)
                if (String(res.code)==='1'){
                  callback()
                }else {
                  callback(new Error(res.msg))
                }


              }
            },
            'trigger': ['blur']}
        ],
        'password': [
          {
            'required': true,
            // 'message': '请填写用户密码',
            validator: (rules, value, callback) => {
              if (!value) {
                this.$message.error("请填写用户密码")
                callback(new Error('请填写用户密码'))

              }
              callback()
            },
            'trigger': ['blur']
          },
        ],
        'phone': [
          {
            'required': true,
            // 'message': '请填写用户密码',
            validator: (rules, value, callback) => {
              if (!value) {
                this.$message.error("请填写用户手机号")
                callback(new Error('请填写用户手机号'))
              } else {
                if (!/^1[34578]\d{9}$/.test(value)){
                  this.$message.error("格式错误")
                  callback(new Error('格式错误'))
                }
                callback()

              }
            },
            'trigger': ['blur']
          },
        ],
        'studentId': [
          {
            'required': true,
            // 'message': '请填写用户密码',
            validator: (rules, value, callback) => {
              if (!value) {
                this.$message.error("请填写用户学号")
                callback(new Error('请填写用户学号'))
              }else {
                if (!/^[2-2][0-0][2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/.test(value)){
                  this.$message.error("格式错误")
                  callback(new Error('格式错误'))
                }
                callback()
              }
            },
            'trigger': ['blur']
          },
        ],
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
            router.push({name:'dh'})

          } else {
            this.$message.error(res.msg)
            sessionStorage.setItem("userLastStoreId","")

            this.loading = false
          }
        }
      })
    },
    async ButtonRe() {
      this.$refs["registrationForm"].validate(async (valid) => {  //开启校验
        if (valid) {   // 如果校验通过，请求接口，允许提交表单
          let data = {}
          if (!this.registrationForm.name) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.registrationForm.sex) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.registrationForm.password) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.registrationForm.permission) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.registrationForm.phone) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.registrationForm.status) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.registrationForm.username) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.registrationForm.studentId) {
            this.$message.error("请你输入学号")
            return false;
          }
          data.name = this.registrationForm.name
          data.sex = this.registrationForm.sex
          data.avatar = this.registrationForm.avatar
          data.password = this.registrationForm.password
          data.permission = this.registrationForm.permission
          data.phone = this.registrationForm.phone
          data.status = this.registrationForm.status
          data.username = this.registrationForm.username
          data.studentId = this.registrationForm.studentId
          const res = await Api.createUser(data)
          if (String(res.code) === '1') {
            this.$message.success(res.msg)
            this.handleLo()
          } else {
            this.$message.error(res.msg)
          }
          console.log(res)
        } else {   //校验不通过
          return false;
        }
      });
    },
    cancelForm(){
      this.registrationForm.sex = ''
      this.registrationForm.password = ''
      this.registrationForm.name = ''
      this.registrationForm.avatar = ''
      this.registrationForm.studentId = ''
      this.registrationForm.phone = ''
      this.registrationForm.username = ''
      this.loginForm.password = ''
      this.loginForm.username = ''
    },
    handleRe(){
      this.isRegistration = true;
    },
    handleLo() {
      this.isRegistration = false;
      this.cancelForm()
    },
    async checkToken() {
      const res = await checkToken()

      if (String(res.code) === '1'){
        console.log("验证")

        localStorage.setItem("type",res.data.permissions)
        localStorage.setItem('userInfo',JSON.stringify(res.data))
        localStorage.setItem('userId',String(res.data.id))
        // localStorage.setItem('token',res.data.token)
        router.push({name:'dh'})
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
  width: 100%;
  height: 100%;
  flex-flow: row nowrap;
  box-sizing: content-box;
  border-radius: 8px;
  display: flex;
}


.login-box .imn {
  position: relative;
  background-color: rgb(0, 1, 16);
}
@media (min-width: 768px){
  .gQMFXb {
    -webkit-box-flex: 1;
    flex-grow: 1;
  }
}

@media (min-width: 520px) and (max-width: 768px){
  .gQMFXb {
    display: none;
  }
}
@media (min-width: 576px){
  .gQMFXb {

    -webkit-box-flex: 1;
    flex-grow: 1;
  }
}
@media (min-width: 0px){
  .gQMFXb {
    -webkit-box-flex: 1;
    flex-grow: 1;
  }
}
.gQMFXb {
  box-sizing: border-box;
}


.ipKqCS {
  display: flex;
  flex-flow: row wrap;
  box-sizing: content-box;
}
.promoContainer {
  z-index: 100;
  width: 80%;
  max-width: 687px;
  position: absolute;
  top: 190px;
  left: 50%;
  transform: translateX(-50%);
}
.bVBmg {
  box-sizing: border-box;
}
.promoHeader {
  color: rgb(255, 255, 255);
  font-size: 46px;
  text-align: left;
  font-weight: 900;
  line-height: 60px;
}
.bVBmg {
  box-sizing: border-box;
}
.sc-hLBbgP {
  color: #FFFFFF;
}
.promoInfo {
  margin-top: 31px;
  max-width: 542px;
  color: rgb(166, 223, 239);
  font-size: 18px;
  text-align: left;
  font-weight: 300;
  line-height: 30px;
}
.bVBmg {
  box-sizing: border-box;
}
.promoInfo a {
  color: rgb(166, 223, 239);
  text-decoration: none;
  font-weight: bold;
}
.videoContainer {
  width: 100%;
  height: auto;
  min-height: 200px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  filter: none;
}
.videoBG {
  width: 100%;
}
.bVBmg {
  box-sizing: border-box;
}
video {
  object-fit: contain;
  overflow-clip-margin: content-box;
  overflow: clip;
}


.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
@media (min-width: 0px){
  .logins {
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-basis: 100%;
    width: 100%;
  }
}
.waiqian {
  max-width: 520px;
  background-color: rgb(255, 255, 255);
}
@media (min-width: 0px){
  .bWXzON {
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-basis: 100%;
    width: 100%;
  }
}
.bWXzON {
  box-sizing: border-box;
}

.logoContainer {
  display: flex;
  height: 215px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  box-shadow: rgb(0 0 0 / 6%) 0px 3px 10px 2px;

}
@media (min-width: 0px){
  .bWXzON {
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-basis: 100%;
    width: 100%;
  }
}
.bWXzON {
  box-sizing: border-box;
}
.eczWhG .formPanel .logoContainer svg {
  width: 325px;
}


.logins {

  display: flex;
  flex-flow: row wrap;
  box-sizing: content-box;
  justify-content: center;
  align-items: center;

}
.logins .el-form {
  margin-top: 3rem;
  width: 214px;
  height: 307px;
}
.logins .el-form-item {
  margin-bottom: 15px;
}
.logins .el-form-item.is-error .el-input__inner {
  border: 0 !important;
  border-bottom: 1px solid #fd7065 !important;
  background: #fff !important;
}
.logins .input-icon {
  height: 32px;
  width: 18px;
  margin-left: -2px;
}
.logins .el-input__inner {
  border: 0;
  border-bottom: 1px solid #e9e9e8;
  border-radius: 0;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  height: 32px;
  line-height: 32px;
}
.logins .el-input__prefix {
  left: 0;
}
.logins .el-input--prefix .el-input__inner {
  padding-left: 26px;
}
.logins .el-input__inner::placeholder {
  color: #aeb5c4;
}
.logins .el-form-item--medium .el-form-item__content {
  line-height: 32px;
}
.logins .el-input--medium .el-input__icon {
  line-height: 32px;
}
.login-btn {
  border-radius: 17px;
  padding: 11px 20px !important;
  margin-top: 10px;
  font-weight: 500;
  font-size: 14px;
  border: 0;
  background-color: #2fa4de;
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