<template>
  <div>
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
export default {
  name: "ThreeLoginR",
  props: {
    // 控制是否展示或隐藏对话框
    classData: {
      type: Object,
      default: undefined,
    }
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    // 关闭弹出框
    onSubmit(){
      // 父组件监听@onSubmitF
      this.$emit("onSubmitF", false);
    }

  },
}
</script>

<style scoped>

</style>