<template>
<div>

<!--  <el-upload-->
<!--      class="upload-demo"-->
<!--      action="http://localhost:8080/print/uploadpdf"-->
<!--      :headers="headerObj"-->
<!--      :on-success="handleAvatarSuccess"-->
<!--      :before-upload="beforeUpload"-->
<!--      ref="upload"-->
<!--  >-->
<!--    <el-button size="small" type="primary">点击打印</el-button>-->
<!--    <div slot="tip" class="el-upload__tip">目前仅支持只能上传pdf文件</div>-->
<!--  </el-upload>-->
  <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
    <div style="display: flex;flex-direction: row">
      <div class="yuanjiao shupin" v-if="hengshu==='1'" :style="formData==undefined?'':'background-color: #be0010;'">
        <span>需要保证原文件内本来就为竖屏</span>
        <span>目前仅支持pdf[pdf],word格式[docx]直接打印(推荐使用PDF).</span>
        <span v-if="formData!=undefined">已选择文件</span>
      </div>
      <div class="yuanjiao hengpin" v-else-if="hengshu==='0'" :style="formData==undefined?'':'background-color: #be0010;'">
        <span>需要保证原文件内本来就为横屏</span>
        <span>目前仅支持pdf[*.pdf],word格式[*.docx]直接打印(推荐使用PDF).</span>
        <span v-if="formData!=undefined">已选择文件</span>
      </div>
      <div class="caozuoqu" style="display: flex;flex-direction: column;align-items: center;margin-left: 2rem">
        <span style="align-content: center;font-size: 18px;font-weight: 800;">打印配置</span>
        <div class="upmargin">
          <i>打印份数:</i>
          <el-input-number v-model="printNum" :min="1" :max="20" label="打印份数"></el-input-number>
        </div>
        <div class="upmargin">
          <i>横竖:</i>
          <el-radio v-model="hengshu" label="0">横</el-radio>
          <el-radio v-model="hengshu" label="1">竖</el-radio>
        </div>
        <div class="upmargin">
          <i>大小:</i>
          <el-select v-model="printBigValue" placeholder="请选择大小">
            <el-option
                v-for="item in printBigOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="upmargin">
          <i>打印页数:</i>
          <el-input style="width: 40%" v-model="numberOfPrintedPagesIndex" placeholder="输入格式X"></el-input>
        </div>
        <div class="upmargin">
          <span style="width: 80%;font-style: oblique;font-weight: 100;font-size: 8px;">注:(仅支持1-X页,输入5就是1-5,all就是全部)</span>
        </div>

      </div>
    </div>

    <div style="display: flex;flex-direction: row">
      <el-button @click="getFile" style="margin-top: 10px">
        <i class="el-icon-upload"></i>选择文件
      </el-button>
      <input type="file" ref="file" style="display: none;" v-on:change="handleFileUpload($event)">
      <el-button :disabled="formData==undefined"  style="margin-top: 10px;margin-left: 10px;" type="danger" @click="cleanFile">清空选择</el-button>
      <el-button :disabled="isPost||formData==undefined" @click="printsopenforpdf" style="margin-top: 10px;margin-left: 10px">
        <i class="el-icon-upload"></i>开始打印
      </el-button>
    </div>
  </div>


</div>
</template>

<script>
import {postUploadForPDF} from "@/api/login";

export default {
  name: "PrintersForPDF.vue",
  data(){
    return{
      headerObj: {
        Authorization: localStorage.getItem('token'),
        userid:localStorage.getItem('userid')
      },
      printNum:1,
      hengshu: '1',//默认竖着着打
      formData:undefined,//实际传输的file文件
      isPost:false,//是否正在打印
      printBigOptions: [{
        value: 3,
        label: '自动适应'
      }, {
        value: 0,
        label: '实际大小'
      }, {
        value: 1,
        label: '缩小'
      }, {
        value: 2,
        label: '拉伸'
      }],
      printBigValue: 3,//打印大小配置
      numberOfPrintedPagesIndex:'all',//页码，字符串传递,默认全都打印
    }
  },
  created() {
  },
  watch:{
    hengshu:{
      handler(item1,item2){
        console.log(item1)//新改变的值
        console.log(item2)//原来的值
        // item1为新值，item2为旧值

      }
    }
  },
  methods:{
    cleanFile(){
      this.formData = undefined;
    },
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: '打印中(可能比较久),请耐心等待!\n显示打印成功后过几秒后打印机才会开始打印',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      return loading;
    },
    printsopenforpdf: async function () {
      // debugger
      if (this.formData == undefined) {
        return
      }
      //请求未完成前不允许多次请求



      this.$confirm('打印不完整请检查打印机是否为error灯,缺纸加入纸后只需要按下打印机上GO,不需要重复提交打印任务!', '提示', {
        confirmButtonText: '我已了解',
        cancelButtonText: '我不听',
        type: 'warning'
      }).then(async () => {
        console.log(this.printBigValue)
        let elLoadingComponent = this.openFullScreen2();
        this.isPost = true
        const res = await postUploadForPDF(this.formData, this.printNum, this.hengshu, this.printBigValue, this.numberOfPrintedPagesIndex);
        elLoadingComponent.close();
        if (String(res.code) === '1') {
          this.$message.success(res.msg+"(显示打印成功后过几秒后打印机才会开始打印)")

          // formData.clean()
          this.formData = undefined
        } else {
          this.$message.error(res.msg)
        }
        this.isPost = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '不听你就憋使了'
        });
      });


    },
    // 打开文件
    getFile () {
      this.$refs.file.click()
    },
// 获取文件
    handleFileUpload(event){
      // 阻止发生默认行为
      event.preventDefault();

      let formData = new FormData()
      let file = this.$refs.file.files[0]
      const temp = file.name.split('.')
      const suffix = temp[temp.length-1]
      const size = file.size / 1024 / 1024 < 8
      console.log(temp)
      if (!['pdf','docx'].includes(String(suffix))) {
        this.$message.error('上传只支持 pdf和docx')
        this.$refs.file.clearFiles()
        return false
      }
      if (!size) {
        this.$message.error('上传文件大小超过 8MB')
        return false;
      }
      formData.append('file',file)
      this.formData = formData;
      this.$message.success('选择成功!')
    },


  }

}
</script>

<style scoped>
.caozuoqu {
  border: #ffffff 1px solid;
  padding: 2rem 2rem 2rem 2rem;
  background-color: #ffffff;
  border-radius: 2rem;
}
i {
  margin-right: 1rem;
}
.upmargin {
  margin-top: 1rem;
}
.yuanjiao {
  border: #ffffff 1px solid;
  background-color: #ffffff;
  border-radius: 2rem;
}
.shupin {
  width: 21rem;
  height: 29.7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hengpin {
  width: 29.7rem;
  height: 21rem;
  display: flex;flex-direction: column;
  justify-content: center;
  align-items: center;

}
</style>