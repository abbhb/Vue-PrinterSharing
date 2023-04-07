<template>
    <div>

        <div class="printbigbody">
            <div style="display: flex;flex-direction: row;">
                <div :class="this.isdrop?'yuanjiao shupin xuanzhong':'yuanjiao shupin'" v-if="hengshu==='1'"
                     :style="formData==undefined?'':'background-color: #be0010;'"
                     @drop="enentDrop($event)" @dragleave="dragleave($event)" @dragover="dragover($event)">
                    <span>需要保证原文件内本来就为竖屏</span>
                    <span>目前仅支持pdf[pdf],word格式[docx]直接打印(推荐使用PDF).</span>
                    <span v-if="formData!=undefined" style="font-size: 36px;">已选择文件</span>
                    <div v-if="formData==undefined" style="color: #000000;font-weight: 800">
                        多次验证证明，word无法打印的时候手动转成pdf再打印成功率更高
                    </div>
                    <div v-if="formData==undefined" style="color: #d96222;font-size: 36px;font-weight: 500;">
                        支持拖拽文件到此处
                    </div>
                    <span>暂时仅支持单文件</span>
                </div>
                <div class="yuanjiao hengpin" v-else-if="hengshu==='0'"
                     :style="formData==undefined?'':'background-color: #be0010;'">
                    <span>需要保证原文件内本来就为横屏</span>
                    <span>目前仅支持pdf[*.pdf],word格式[*.docx]直接打印(推荐使用PDF).</span>
                    <span v-if="formData!=undefined" style="font-size: 36px;">已选择文件</span>
                    <div v-if="formData==undefined" style="color: #000000;font-weight: 800">
                        多次验证证明，word无法打印的时候手动转成pdf再打印成功率更高
                    </div>
                    <div v-if="formData==undefined" style="color: #d96222;font-size: 36px;font-weight: 500;">
                        支持拖拽文件到此处
                    </div>
                    <span>暂时仅支持单文件</span>
                </div>
                <div class="yuanjiao caozuoqu"
                     style="display: flex;flex-direction: column;align-items: center;margin-left: 2rem">
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
                        <el-input disabled="true" style="width: 3rem" placeholder="1"></el-input>
                        <span style="width: 10%;margin-left: 1rem;margin-right: 1rem;">-</span>
                        <el-input maxlength="3" style="width: 8rem" v-model="numberOfPrintedPagesIndex"
                                  placeholder="输入格式X"></el-input>
                    </div>

                    <div class="upmargin">
                        <span class="texttip">注:输入 </span>
                        <i style="color: #d96222"> all</i>
                        <span class="texttip">就是全部</span>
                    </div>
                    <div class="upmargin">
                        <el-switch
                                v-model="isDUPLEX"
                                active-text="双面打印"
                                inactive-text="单面打印">
                        </el-switch>
                    </div>

                </div>
            </div>

            <div style="display: flex;flex-direction: row">
                <el-button @click="getFile" style="margin-top: 10px">
                    <i class="el-icon-upload"></i>选择文件
                </el-button>
                <input id="fileupload" type="file" ref="file" style="display: none;"
                       v-on:change="handleFileUpload($event)">
                <el-button :disabled="formData==undefined" style="margin-top: 10px;margin-left: 10px;" type="danger"
                           @click="cleanFile">清空选择
                </el-button>
                <el-button :disabled="isPost||formData==undefined" @click="printsopenforpdf"
                           style="margin-top: 10px;margin-left: 10px">
                    <i class="el-icon-upload"></i>开始打印
                </el-button>
            </div>
        </div>
        <div style="display: flex;flex-flow: wrap;">
            <PrintTopBody :type="1" ztitle="总" ftitle="每日4:00更新" style="margin-right: 5px;"></PrintTopBody>
            <PrintTopBody :type="2" ztitle="每日" ftitle="每日4:00更新"></PrintTopBody>
        </div>

        <ProgressExtendElement @exitloading="exitloading()" :status="myloadingstatus"
                               v-if="myloading"></ProgressExtendElement>
    </div>
</template>

<script>
import {postUploadFile} from "@/api/login";
import PrintTopBody from "@/components/PrintTopBody.vue";
import ProgressExtendElement from "@/components/progress/ProgressExtendElement.vue";


export default {
    name: "PrintersForPDF.vue",
    components: {ProgressExtendElement, PrintTopBody},
    data() {
        return {
            headerObj: {
                Authorization: localStorage.getItem('token'),
                userid: localStorage.getItem('userid')
            },
            printNum: 1,
            hengshu: '1',//默认竖着着打
            formData: undefined,//实际传输的file文件
            isPost: false,//是否正在打印
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
            numberOfPrintedPagesIndex: 'all',//页码，字符串传递,默认全都打印
            isDUPLEX: false,//默认单面打印
            myloadingstatus: undefined,
            myloading: false,
            isdrop: false,
        }
    },
    created() {
    },
    watch: {
        hengshu: {
            handler(item1, item2) {
                console.log(item1)//新改变的值
                console.log(item2)//原来的值
                // item1为新值，item2为旧值

            }
        }
    },
    methods: {
        exitloading() {
            this.myloading = false;
            this.myloadingstatus = undefined;
        },
        cleanFile() {
            this.formData = undefined;
            document.getElementById('fileupload').value = null;
        },
        openFullScreen2() {
            // const loading = this.$loading({
            //   lock: true,
            //   text: '打印中(可能比较久),请耐心等待!\n显示打印成功后过几秒后打印机才会开始打印',
            //   spinner: 'el-icon-loading',
            //   background: 'rgba(0, 0, 0, 0.7)'
            // });
            //
            // return loading;
            this.myloading = true
        },
        printsopenforpdf: async function () {
            // debugger
            if (this.formData == undefined) {
                return
            }
            //请求未完成前不允许多次请求


            console.log(this.printBigValue)
            this.openFullScreen2();
            this.isPost = true
            let isDuplex = 0
            if (this.isDUPLEX) {
                isDuplex = 1
            }
            const res = await postUploadFile(this.formData, this.printNum, this.hengshu, this.printBigValue, this.numberOfPrintedPagesIndex, isDuplex);
            if (String(res.code) === '1') {
                this.myloadingstatus = 'success'
                this.$message.success(res.msg + "(显示打印成功后过几秒后打印机才会开始打印)")

                this.cleanFile()
                // formData.clean()
                this.formData = undefined
            } else {
                this.myloadingstatus = 'error'
                this.$message.error(res.msg)
            }
            this.isPost = false


        },
        // 打开文件
        getFile() {
            this.$refs.file.click()
        },
// 获取文件
        handleFileUpload(event) {
            // 阻止发生默认行为
            event.preventDefault();

            let formData = new FormData()
            let file = this.$refs.file.files[0]
            const temp = file.name.split('.')
            const suffix = temp[temp.length - 1]
            const size = file.size / 1024 / 1024 < 8
            console.log(temp)
            if (!['pdf', 'docx'].includes(String(suffix))) {
                this.$message.error('上传只支持 pdf和docx')
                this.$refs.file.clearFiles()
                return false
            }
            if (!size) {
                this.$message.error('上传文件大小超过 8MB')
                return false;
            }
            formData.append('file', file)
            this.formData = formData;
            this.$message.success('选择成功!')
        },
        enentDrop: function (e) {
            e.stopPropagation();
            e.preventDefault();
            this.isdrop = false;
            this.updataFun(e.dataTransfer.files)
        },
        dragleave(e) {
            e.stopPropagation();
            e.preventDefault();
            this.isdrop = false;
        },
        dragover(e) {
            e.stopPropagation();
            e.preventDefault();
            this.isdrop = true;
        },
        updataFun(data) {
            let formData = new FormData()
            const temp = data[0].name.split('.')
            const suffix = temp[temp.length - 1]
            this.isdrop = false;
            if (!['pdf', 'docx'].includes(String(suffix))) {
                this.$message.error('上传只支持 pdf和docx')
                this.$refs.file.clearFiles()
                return false
            }

            formData.append('file', data[0])
            this.formData = formData
        }


    }

}
</script>

<style scoped>
.texttip {
    width: 80%;
    font-weight: 200;
    font-size: 8px;
    font-family: Inter, "-apple-system", BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "noto sans", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.caozuoqu {
    border: #ffffff 1px solid;
    background-color: #ffffff;

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
    box-shadow: 0px 3px 6px rgba(114, 113, 113, 0.34);
    padding: 1rem 1rem 1rem 1rem;
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
    height: 26rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.printbigbody {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem 3rem 3rem 3rem;

    border-radius: 1rem;
    background-image: url('~@/assets/pexels-codioful-(formerly-gradienta)-7130469.jpg');

}


.xuanzhong {
    position: relative;
    border: 2px solid #03A9F3;
    box-shadow: 0px 0px 8px #00cafc;
    background-color: #c6cbd1;
}
</style>