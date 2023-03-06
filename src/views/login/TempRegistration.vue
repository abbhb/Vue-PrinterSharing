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
  <span
      slot="footer"
      class="dialog-footer"
  >
    <el-button
        type="primary"
        size="medium"
        @click="ret()"
    >返回登录</el-button>
        </span>
</div>
</template>

<script>
import * as Api from "@/api/login";
import router from "@/router";

export default {
  name: "TempRegistration",
  data() {
    return {
      sexoptions:[{label:"男",value:"男"},{label:"女",value:"女"}],
      classData: {
        idNumber: '',
        sex:'男',
        name: '',//用户名
        username:'',
        phone:'',
        password:'',
        status:'1',//默认启用
        avatar:'',//url
        permission:'2',//默认为用户
      },
    }
  },
  computed: {
    rules () {
      return {
        'name': [
          {'required': true, 'message': '请填写用户名称', 'trigger': ['blur','change']}
        ],
        'username': [
          {'required': true, 'message': '请输入用户名', 'trigger': ['blur','change']}
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
        'idNumber': [
          {
            'required': true,
            // 'message': '请填写用户密码',
            validator: (rules, value, callback) => {
              if (!value) {
                this.$message.error("请填写用户身份证号")
                callback(new Error('请填写用户身份证号'))
              }else {
                if (!/(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/.test(value)){
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


  },
  mounted() {
  },
  methods: {
    ret(){
      router.push({name:'login'})
    },
    async submitForm() {
      this.$refs["classData"].validate(async (valid) => {  //开启校验
        if (valid) {   // 如果校验通过，请求接口，允许提交表单
          let data = {}
          if (!this.classData.name) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.classData.sex) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.classData.password) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.classData.permission) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.classData.phone) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.classData.status) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.classData.username) {
            this.$message.error("请你输入完整")
            return false;
          }
          if (!this.classData.idNumber) {
            this.$message.error("请你输入身份证号")
            return false;
          }
          data.name = this.classData.name
          data.sex = this.classData.sex
          data.avatar = this.classData.avatar
          data.password = this.classData.password
          data.permission = this.classData.permission
          data.phone = this.classData.phone
          data.status = this.classData.status
          data.username = this.classData.username
          data.idNumber = this.classData.idNumber
          const res = await Api.createUser(data)
          if (String(res.code) === '1') {
            this.$message.success(res.msg)
            router.push({"path":'/login'})

          } else {
            this.$message.error(res.msg)
          }
          console.log(res)
        } else {   //校验不通过
          return false;
        }
      });
    },
  }
}
</script>

<style>
.sdss {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  min-height: 35rem;
  padding: 1rem 1rem 1rem 1rem;
}

.selectInput {
  position: relative;
  width: 100%;
  min-width: 100px;
}
.selectInput .flavorSelect {
  position: absolute;
  width: 100%;
  padding: 0 10px;
  border-radius: 3px;
  border: solid 1px #807974;
  line-height: 30px;
  text-align: center;
  background: rgba(255, 255, 255, 0.98);
  top: 50px;
  z-index: 99;
}
.selectInput .flavorSelect .items {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  line-height: 15px;
  /*border-bottom: solid 1px #a85151;*/
  /*color: #383737;*/
  /*padding: 1px 1px 1px 1px;*/
}
.selectInput .flavorSelect .none {
  font-size: 14px;
}
#user-management .uploadImg .el-form-item__label::before{
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.dashboard-container {
  padding: 20px;
}
.container {
  background: #fff;
  position: relative;
  z-index: 1;
  padding: 30px 28px;
  border-radius: 4px;
}
.container .tableBar {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}
.container .tableBox {
  width: 100%;
  border: solid 2px #f3f4f7;
  border-radius: 2px;
}
.container .tableBox .el-image img {
  width: 40px;
  border-radius: 5px;
}
.container .pageList {
  text-align: center;
  margin-top: 30px;
}
.tableLab .span-btn {
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  padding: 0 20px;
  color: #818693;
  border-right: solid 1px #d8dde3;
}
.container .tableLab .el-button {
  margin-left: 10px;
}
.el-table-column--selection .cell {
  padding-left: 10px;
}
/* 添加 */
.addBrand-container .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.addBrand-container .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.addBrand-container .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.addBrand-container .avatar {
  width: 160px;
  height: 160px;
  display: block;
}
.addBrand-container .el-form--inline .el-form-item__content {
  width: 293px;
}
.addBrand-container .el-input {
  width: 293px;
}
.addBrand-container {
  margin: 30px;
}
.addBrand-container .container {
  position: relative;
  z-index: 1;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  min-height: 500px;
}
.addBrand-container .container .subBox {
  padding-top: 30px;
  text-align: center;
  border-top: solid 1px #f3f4f7;
}
.flavorBox {
  width: 777px;
}
.flavorBox .addBut {
  background: #ffc200;
  display: inline-block;
  padding: 0px 20px;
  border-radius: 3px;
  line-height: 40px;
  cursor: pointer;
  border-radius: 4px;
  color: #333333;
  font-weight: 500;
}
.flavorBox .flavor {
  border: solid 1px #dfe2e8;
  border-radius: 3px;
  padding: 15px;
  background: #fafafb;
}
.flavorBox .flavor .title {
  color: #606168;
}
.flavorBox .flavor .cont .items {
  display: flex;
  margin: 10px 0;
}
.flavorBox .flavor .cont .items .itTit {
  width: 150px;
  margin-right: 15px;
}
.flavorBox .flavor .cont .items .itTit input {
  width: 100%;
  line-height: 40px;
  border-radius: 3px;
  padding: 0 10px;
}
.flavorBox .flavor .cont .items .labItems {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  border-radius: 3px;
  min-height: 39px;
  border: solid 1px #d8dde3;
  background: #fff;
  padding: 0 5px;
}
.flavorBox .flavor .cont .items .labItems span {
  display: inline-block;
  color: #f19c59;
  margin: 5px;
  line-height: 26px;
  height: 26px;
  padding: 0 10px;
  background: #fdf4eb;
  border-radius: 3px;
  border: solid 1px #fae2cd;
}
.flavorBox .flavor .cont .items .labItems span i {
  cursor: pointer;
  font-style: normal;
}
.flavorBox .flavor .cont .items .labItems .inputBox {
  display: inline-block;
  width: 100%;
  height: 36px;
  line-height: 36px;
  overflow: hidden;
}
.flavorBox .flavor .cont .items .delFlavor {
  display: inline-block;
  padding: 0 10px;
  color: #f19c59;
  cursor: pointer;
}
.addBrand-container .address .el-form-item__content {
  width: 777px !important;
}
.el-button--text {
  font-weight: 400 !important;
  font-size: 13px !important;
}
.el-table td {
  font-size: 13px !important;
}
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 12px;
}
.xuanzeqi {
  padding: 5px 10px 5px 10px;
  margin: 0px 3px 15px 13px;
  /*border: rgba(162, 156, 156, 0.47) 1px solid;*/
  /*border-radius: 10px;*/
}

</style>