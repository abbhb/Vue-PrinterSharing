<template>
    <PrinterHistoryComponent type="user" @init="init"  :counts="counts" :page="page" :page-size="pageSize" :table-data="tableData"
    @handleSizeChange="this.handleSizeChange" @handleCurrentChange="this.handleCurrentChange"
    >
        <el-input
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
    </PrinterHistoryComponent>
</template>

<script>



import PrinterHistoryComponent from "@/components/PrinterHistoryComponent.vue";
import {getListPrinter} from "@/api/printer";

export default {
    name: "MyHistoryPrints",
    components: {PrinterHistoryComponent},
    data() {
        return {
            filenameinput: '',
            counts: 0,
            page: 1,
            pageSize: 5,
            tableData : [],
        }
    },
    created() {

    },
    mounted() {
    },
    methods: {

        async init () {
            this.navtableloading = true
            let params = {}
            params.pageNum = this.page
            params.pageSize = this.pageSize
            if (this.filenameinput){
                params.name = this.filenameinput ? this.filenameinput : undefined
            }
            const res =  await getListPrinter(params)
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
        cleanQuery(){
            this.page = 1;
            this.input = undefined
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

<style>


</style>