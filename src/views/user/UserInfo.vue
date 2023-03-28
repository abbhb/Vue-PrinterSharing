<template>
<div>
  <el-card class="box-card">
    <el-form :model="form" label-width="120px">
      <el-form-item :rules="[{ required: true, message: 'id is required' },]" label="id">
        <el-input v-model="form.id" disabled=""/>
      </el-form-item>
      <el-form-item :rules="[{ required: true, message: '用户名 is required' },]" label="用户名">
        <el-input v-model="form.username" disabled=""/>
      </el-form-item>
      <el-form-item :rules="[{ required: true, message: '昵称 is required' },]" label="昵称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :rules="[{ required: true, message: '性别 is required' },]" label="性别">
        <el-select v-model="form.sex" placeholder="请选择你的性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item   :rules="[
        { required: true, message: 'idNumber is required' },
        { type: 'number', message: 'idNumber must be a number' }
      ]"  label="身份证号码">
        <el-input v-model="form.idNumber" />
      </el-form-item>
      <el-form-item   :rules="[
        { required: true, message: '手机号码必须填写' },
        { type: 'number', message: '手机号码必须是数字' }
      ]"  label="手机号码">
        <el-input v-model="form.phone" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="(form_serve.id === form.id)&&(form_serve.username === form.username)&&(form_serve.name === form.name)&&(form_serve.sex === form.sex)&&(form_serve.idNumber === form.idNumber)&&(form_serve.phone === form.phone) ? true:false">更新</el-button>
        <el-button @click="reWrite">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import * as Api from "@/api/login";
import router from "@/router";


export default {
  name: "UserInfo",
  data(){
    return{
      form:{
        id:'',
        username:'',
        name: '',
        sex: '',
        idNumber:'',
        phone:'',

      },
      form_serve:{
        id:'',
        username:'',
        name: '',
        sex: '',
        idNumber:'',
        phone:'',
      },
      userInfo:{},
    };
  },
  created() {

    this.init()
  },
  methods:{
    reWrite(){
      this.form.name = this.userInfo.name
      this.form.phone =  this.userInfo.phone
      this.form.sex = this.userInfo.sex
      this.form.username = this.userInfo.username
      this.form.idNumber = this.userInfo.idNumber
      this.form.id = this.userInfo.id

      this.form_serve.name = this.userInfo.name
      this.form_serve.phone =  this.userInfo.phone
      this.form_serve.sex = this.userInfo.sex
      this.form_serve.username = this.userInfo.username
      this.form_serve.idNumber = this.userInfo.idNumber
      this.form_serve.id = this.userInfo.id

    },
    init(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo){
        this.userInfo = JSON.parse(userInfo)
        this.form.name = this.userInfo.name
        this.form.phone =  this.userInfo.phone
        this.form.sex = this.userInfo.sex
        this.form.username = this.userInfo.username
        this.form.idNumber = this.userInfo.idNumber
        this.form.id = this.userInfo.id

        this.form_serve.name = this.userInfo.name
        this.form_serve.phone =  this.userInfo.phone
        this.form_serve.sex = this.userInfo.sex
        this.form_serve.username = this.userInfo.username
        this.form_serve.idNumber = this.userInfo.idNumber
        this.form_serve.id = this.userInfo.id
        loading.close();

        //注意用户名不能有重复
      }else {
        this.$message.error("数据错误,请刷新重试!")
      }
    },
    async onSubmit() {
      var that = this
      let data = {}
      if (!this.form.name) {
        this.$message.error("请你输入完整")
        return false;
      }
      if (!this.form.sex) {
        this.$message.error("请你输入完整")
        return false;
      }
      if (!this.form.phone) {
        this.$message.error("请你输入完整")
        return false;
      }
      if (!this.form.username) {
        this.$message.error("请你输入完整")
        return false;
      }
      if (!this.form.idNumber) {
        this.$message.error("请你输入身份证号")
        return false;
      }
      data.id = this.form.id
      data.name = this.form.name
      data.sex = this.form.sex
      data.avatar = this.form.avatar
      data.permission = this.userInfo.permission
      data.phone = this.form.phone
      data.status = this.userInfo.status
      data.username = this.form.username
      data.idNumber = this.form.idNumber
      const res = await Api.updataforuser(data)

      if (String(res.code)==='1'){
        that.$message.success(res.msg);
        const data = await Api.checkToken()
        if (String(data.code) === '1'){
          localStorage.setItem('userInfo',JSON.stringify(data.data))
          // localStorage.setItem('token',res.data.token)
          that.init()
        }else {
          this.$message.error(data.msg)
          router.push({name:'login'})
        }
      }
      else {
        this.$message.error(res.msg)
        
      }
    }
  }
}
</script>

<style scoped>
.box-card{
  width: 50rem;
}
</style>