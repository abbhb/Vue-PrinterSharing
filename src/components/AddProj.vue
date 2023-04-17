<template>
  <div>
    <el-dialog title="新建文集" :visible.sync="visible" width="80%">
        <div>
        <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                :inline="true">
            <el-form-item label="文集编号" prop="id" >
                <el-input class="i1" v-model="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item label="文集标题" prop="title">
                <el-input class="i2" v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="分类id" prop="classify_id">
                <el-input v-model="ruleForm.classify_id"></el-input>
            </el-form-item>
            <el-form-item label="是否公开" prop="type">
                <el-select v-model="value" placeholder="请选择" class="sel1">
                    <el-option
                            v-for="item in ruleForm.type"
                            :label="item.label"
                            :key="item.value"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item> <br>
            <el-form-item label="创建时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.create_time" style="width: 200px;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="最后修改时间">
                <el-input v-model="ruleForm.modify_time"></el-input>
            </el-form-item> <br>
            <el-form-item label="文档创建者" prop="create_user" class="it1">
                <el-input v-model="ruleForm.create_user"></el-input>
            </el-form-item>
            <el-form-item label="最后修改者" prop="modify_user">
                <el-input v-model="ruleForm.modify_user"></el-input>
            </el-form-item> <br>
            <el-form-item label="访问码" prop="password">
                <el-input v-model="ruleForm.password" show-password></el-input>
            </el-form-item> <br>
            <el-form-item label="文档介绍" prop="intro">
                <el-input
                        type="textarea"
                        :rows="10"
                        placeholder="作者很懒没有介绍"
                        v-model="ruleForm.intro"
                        style="width: 700px">
                </el-input>
            </el-form-item>
        </el-form>
        </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: 'AddProj',
    props: {
        show: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        visible: {
            get() {
                console.assert(this.show)
                return this.show
            },
            set(val) {
                console.log(val)
                this.$emit('update:show', val) // visible 改变的时候通知父组件
            }
        }
    },
    created() {
        this.getTimes()
    },
    beforeDestroy() {
        if (this.ruleForm.modify_time) {
            clearInterval(this.getTimesInterval);
        }
    },
    data() {
        return {
            value2:true,
            ruleForm: {
                id: '',
                title: '',
                type:[
                    {
                        value: '0',
                        label: '私有'
                    }, {
                        value: '1',
                        label: '公开'
                    }, {
                        value: '2',
                        label: '访问码'
                    },
                ],
                classify_id:'',
                is_del:'',
                create_time:'',
                modify_time:'',
                state:'',
                create_user:'',
                modify_user:'',
                password:'',
                intro:''
            },
            rules: {
                id: [
                    {required: true, message: '请输入您的编号', trigger: 'blur'},
                    {min: 3, max: 3, message: '长度为3个字符例如：001', trigger: 'blur'}
                ],
                title: [
                    {required: true, message: '请您输入文集的标题', trigger: 'change'}
                ],
                classify_id:[
                    {required: true, message: '请您输入文集的分类id', trigger: 'change'}
                ],
                type:[
                    {required: true,}
                ],
                create_user:[
                    {required: true,trigger: 'blur',message: '请您输入您的昵称'}
                ],
                modify_user:[
                    {required: true,trigger: 'blur',message: '请您输入您的昵称'}
                ]
            },
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getTimes(){
            setInterval(this.getTimesInterval, 1000);
        },
        getTimesInterval:function() {
            let _this = this;
            let year = new Date().getFullYear(); //获取当前时间的年份
            let month = new Date().getMonth() + 1; //获取当前时间的月份
            let day = new Date().getDate(); //获取当前时间的天数
            let hours = new Date().getHours(); //获取当前时间的小时
            let minutes = new Date().getMinutes(); //获取当前时间的分数
            let seconds = new Date().getSeconds(); //获取当前时间的秒数
            //当小于 10 的是时候，在前面加 0
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            //拼接格式化当前时间
            _this.ruleForm.modify_time = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        },
    }

}

</script>

<style scoped>
    .it1{
        margin-left: 5px;
    }
    .i1{
        width: 100px;
    }
    .i2 {
        width: 120px;
    }
    .sel1{
        margin-left: 5px;
        width: 100px;
    }
</style>