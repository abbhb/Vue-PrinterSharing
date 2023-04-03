<template>
<!--    <div class="sdss" id="nav-management">-->
<!--        <div class="container">-->
<!--            <div class="tableBar">-->
<!--                <el-input-->
<!--                        v-model="input"-->
<!--                        placeholder="请输入文件名称"-->
<!--                        style="width: 250px"-->
<!--                        clearable-->
<!--                        @clear="cleanQuery"-->
<!--                        @keyup.enter.native="handleQuery"-->
<!--                >-->
<!--                    <i-->
<!--                            slot="prefix"-->
<!--                            class="el-input__icon el-icon-search"-->
<!--                            style="cursor: pointer"-->
<!--                            @click="init"-->
<!--                    ></i>-->
<!--                </el-input>-->
<!--            </div>-->
<!--            <el-table-->
<!--                    :data="tableData"-->
<!--                    stripe-->
<!--                    class="tableBox"-->
<!--                    v-loading="navtableloading"-->
<!--            >-->
<!--                <el-table-column-->
<!--                        prop="name"-->
<!--                        label="打印文件名称"-->
<!--                        width="400"-->
<!--                ></el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="numberOfPrintedPages"-->
<!--                        label="打印份数"-->
<!--                        width="200"-->
<!--                ></el-table-column>-->
<!--                <el-table-column-->
<!--                    label="单双面"-->
<!--                    width="200"-->
<!--                >-->
<!--                    <template slot-scope="scope">-->
<!--                        <span style="margin-right: 10px;">{{String(scope.row.isDuplex)==='0'?'单面':(String(scope.row.isDuplex)==='1'?'双面':'缺失')}}</span>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="createTime"-->
<!--                        label="打印时间"-->
<!--                        width="400"-->
<!--                ></el-table-column>-->

<!--            </el-table>-->

<!--            <el-pagination-->
<!--                    @size-change="handleSizeChange"-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    :current-page="page"-->
<!--                    :page-sizes="[5, 10, 20, 40]"-->
<!--                    :page-size="pageSize"-->
<!--                    layout="total, sizes, prev, pager, next, jumper"-->
<!--                    :total="counts">-->
<!--            </el-pagination>-->
<!--        </div>-->
<!--    </div>-->
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