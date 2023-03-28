<template>
  <div style="display: flex;flex-direction: column">
    <span style="font-size: 48px;">
      认证中,请稍安勿躁!
    </span>

    <div>
      <el-dialog
          :title="classData.title"
          :visible.sync="classData.dialogVisible"
          width="55%"
          :show-close="true"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :append-to-body="true"
          style="z-index: 2100"
      >
        <el-card class="box-card">
          <el-form ref="emailform" label-position="left" label-width="100px">
            <el-form-item label="请选择类型" prop="type">
              <el-radio v-model="classData.type" label="1">绑定原有账号</el-radio>
              <el-radio v-model="classData.type" label="2">新建账号</el-radio>
            </el-form-item>
            <div>
              <el-form-item label="用户名" prop="username">

                <el-input v-if="classData.type==='1'" v-model="classData.username" type="username" placeholder="请输入原用户名"/>
                <el-input v-else-if="classData.type==='2'" v-model="classData.username" type="username" placeholder="请输入新用户名"/>

              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-if="classData.type==='1'" v-model="classData.password" type="password" placeholder="请输入原密码"/>
                <el-input v-else-if="classData.type==='2'" v-model="classData.password" type="password" placeholder="请输入新密码"/>
              </el-form-item>
              <!--绑定-->
            </div>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确认</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import * as Auth from "@/api/auth";
import * as Api from "@/api/login";
import router from "@/router";

export default {
  name: "en",
  data(){
    return{
      code:'',

      classData:{
        title:"尊贵的用户,您首此使用该第三方登录授权本服务,请简单绑定一下资料",
        dialogVisible:true,
        type:'1',//默认绑定
        username:'',
        password:'',
        trId:'',
      }
    }
  },
  async created() {
    if (localStorage.getItem('token')){
      const res = await Api.checkToken()
      if (String(res.code) === '1'){
        localStorage.setItem("type",res.data.permissions)
        localStorage.setItem('userInfo',JSON.stringify(res.data))
        localStorage.setItem('userId',String(res.data.id))
        window.location.search=''
        router.push({name:'dh'})
      }else {
        sessionStorage.setItem("userLastStoreId","")
      }
    }
    if (!window.location.search){
      this.$message.error("认证服务出错了,请联系开发者!")
    }else {
      this.code = window.location.search.split('?')[1].split('&')[0].split('=')[1]
      if (!this.code){
        this.$message.error("认证服务出错了,请联系开发者!")
        return
      }
      const res = await Auth.redirectEN(this.code)
      console.log(res.data)
      if (String(res.code) === '1') {
        this.successLogin(res)
        router.push({name:'dh'})

      } else if (String(res.code)==='2'){
        //需要绑定或者注册
        this.classData.trId = res.data.id
        this.classData.dialogVisible = true
      }
      else {
        this.$message.error(res.msg)
        sessionStorage.setItem("userLastStoreId","")
      }
    }

  },
  methods:{
    async onSubmit() {
      if (!this.classData.trId) {
        this.$message.error("参数缺少,请从头再来")
        return
      }
      if (!this.classData.type) {
        this.$message.error("参数缺少")
        return
      }
      if (!this.classData.username) {
        this.$message.error("参数缺少")
        return
      }
      if (!this.classData.password) {
        this.$message.error("参数缺少")
        return
      }
      let data = {}
      data.trId = this.classData.trId
      data.type = this.classData.type
      data.username = this.classData.username
      data.password = this.classData.password
      const resd = await Auth.firstEN(data)
      console.log(resd)
      if (String(resd.code)==='1'){
        this.successLogin(resd)
        router.push({name:'dh'})
      }else {
        this.$message.error(resd.msg)
      }
    },
    successLogin(res){
      localStorage.setItem('userInfo',JSON.stringify(res.data))
      localStorage.setItem("permission",res.data.permission)
      localStorage.setItem('userId',String(res.data.id))
      localStorage.setItem('token',res.data.token)
      window.location.search=''
    }
  }
}
</script>

<style scoped>

</style>