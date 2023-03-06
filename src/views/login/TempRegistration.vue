<template>
<div style="display: flex;flex-direction: column;">
  <span>临时注册，丑点就丑点吧，后续集成到登录页加动画</span>

  <el-form
      ref="classData"
      :model="classData"
      :rules="rules"
      :inline="true"
      label-width="180px"
      class="demo-classData"
  >
    <div>
      <el-form-item
          label="用户名称:"
          prop="name"
      >
        <el-input
            v-model="classData.name"
            placeholder="请填写用户昵称"
            maxlength="20"
        />
      </el-form-item>
      <el-form-item
          label="用户名:"
          prop="username"
      >
        <el-input
            v-model="classData.username"
            placeholder="请填写用户名"
            maxlength="26"
        />
      </el-form-item>
      <el-form-item
          label="用户密码:"
          prop="password"
      >
        <el-input
            :disabled="this.action==='edit'"
            v-model="classData.password"
            type="password"
            :placeholder="this.action==='edit'?'密码不可编辑':'请填写用户密码'"
            maxlength="32"
        />
      </el-form-item>
      <el-form-item
          label="手机号:"
          prop="phone"
      >
        <el-input
            v-model="classData.phone"
            placeholder="请填写用户手机号"
            maxlength="11"
        />
      </el-form-item>
      <el-form-item
          label="身份证号:"
          prop="idNumber"
      >
        <el-input
            v-model="classData.idNumber"
            placeholder="请填写用户身份证号"
            maxlength="18"
        />
      </el-form-item>
      <el-form-item label="用户性别：" prop="sex">
        <el-select v-model="classData.sex" placeholder="请选择用户性别">
          <el-option
              v-for="item in sexoptions"
              :key="item.label"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </div>


    <div>
    </div>

  </el-form>

  <span
      slot="footer"
      class="dialog-footer"
  >
    <el-button
        type="primary"
        size="medium"
        @click="submitForm()"
    >注册</el-button>
        </span>
</div>
</template>

<script>
import {checkToken, loginApi} from "@/api/login";
import router from "@/router";

export default {
  name: "TempRegistration"
  ,
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