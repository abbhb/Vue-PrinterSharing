<template>
<div>
    <PrinterHistoryComponent type="admin" @init="init" :counts="counts" :page="page" :page-size="pageSize" :table-data="tableData"
                             @handleSizeChange="this.handleSizeChange" @handleCurrentChange="this.handleCurrentChange">
        <el-input class="tiaojian"
            v-model="filenameinput"
            placeholder="请输入文件名称"
            style="width: 250px"
            clearable
            @clear="cleanQuery"
            @keyup.enter.native="handleQuery"
        >
            <i
                slot="prefix"
                class="el-input__icon el-icon-search"
                style="cursor: pointer"
                @click="init"
            ></i>
        </el-input>
        <el-select class="tiaojian" v-model="userseletevalue" filterable placeholder="请选择用户" clearable @clear="cleanQuery"
                   @change="handleQuery">
            <el-option
                v-for="item in userseleteoptions"
                :key="item.label"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </PrinterHistoryComponent>
</div>
</template>

<script>
import PrinterHistoryComponent from "@/components/PrinterHistoryComponent.vue";
import {getAllListPrinter, getAllUserPrinter} from "@/api/printer";

export default {
  name: "AllUserHistoryPrints",
    components: {PrinterHistoryComponent},
    data(){
      return{
          filenameinput: '',
          counts: 0,
          page: 1,
          pageSize: 5,
          tableData : [],
          userseletevalue:"",
          userseleteoptions:[],
      }
    },
    methods:{
        async init () {
            this.navtableloading = true
            let params = {}
            params.pageNum = this.page
            params.pageSize = this.pageSize
            if (this.filenameinput){
                params.name = this.filenameinput ? this.filenameinput : undefined
            }
            if (this.userseletevalue){
                params.user = this.userseletevalue ? String(this.userseletevalue) : undefined
            }
            const res =  await getAllListPrinter(params)
            this.getAllUserOptions()
            console.log(res)
            if (String(res.code) === '1') {
                this.tableData = res.data.records || []
                this.counts = Number(res.data.total)
            }else {
                this.$message.error('请求出错了：' + res.msg)
            }
            this.navtableloading = false

        },
        handleQuery() {
            this.page = 1;
            this.init();
        },
        async getAllUserOptions() {
            const res = await getAllUserPrinter()
            if (String(res.code)==='1'){
                this.userseleteoptions = res.data
            }else {
                this.$message.error(res.msg)
            }

        },
        cleanQuery(){
            this.page = 1;
            this.input = undefined
            this.userseletevalue = ""
            this.init()
        },
        handleSizeChange (val) {
            console.log(val)
            this.pageSize = val
            this.init()
        },
        handleCurrentChange (val) {
            if (val>(Number(this.counts)/Number(this.pageSize))+1){
                this.$message.info("最大页了")
                return
            }
            this.page = val
            this.init()
        },
    }
}
</script>

<style scoped>
.tiaojian {
    margin-right: 1rem;
}
</style>