<template>
<div>
  跨域暂时没解决,需要借助nginx
  <el-upload
      class="upload-demo"
      action="http://192.168.12.122:8080/print/uploadpdf"
      :headers="headerObj"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeUpload"
      ref="upload"
  >
    <el-button size="small" type="primary">点击打印</el-button>
    <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>
  </el-upload>
</div>
</template>

<script>
export default {
  name: "Print.vue",
  data(){
    return{
      headerObj: {
        Authorization: localStorage.getItem('token'),
        userid:localStorage.getItem('userid')
      },
    }
  },
  created() {
  },
  methods:{
    handleAvatarSuccess (response, file, fileList) {//上传图片成功的回调
      console.log(file)
      console.log(fileList)
      // 拼接down接口预览
      if (String(response.code)==='1'){
        this.$message.success(response.msg)
      }else {
        this.$message.error(response.msg)
      }
      this.isimageupload = false
      this.$refs.upload.clearFiles()
    },
    beforeUpload(file) {
      this.isimageupload = true
      const suffix = file.name.split('.')[1]
      const size = file.size / 1024 / 1024 < 8
      if (!['pdf'].includes(String(suffix))) {
        this.$message.error('上传只支持 pdf')
        this.$refs.upload.clearFiles()
        return false
      }
      if (!size) {
        this.$message.error('上传文件大小超过 8MB')
        return false;
      }

    },
  }

}
</script>

<style scoped>

</style>