<template>
    <div class="sdss" id="nav-management">
        <div class="container">
            <div class="tableBar">
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
                <slot></slot>
            </div>
            <el-table
                    :data="tableData"
                    stripe
                    class="tableBox"
                    v-loading="navtableloading"
            >
                <el-table-column
                        prop="name"
                        label="打印文件名称"
                        width="400"
                ></el-table-column>
                <el-table-column
                        prop="numberOfPrintedPages"
                        label="打印份数"
                        width="200"
                ></el-table-column>
                <el-table-column
                        label="单双面"
                        width="200"
                >
                    <template slot-scope="scope">
                        <span style="margin-right: 10px;">{{String(scope.row.isDuplex)==='0'?'单面':(String(scope.row.isDuplex)==='1'?'双面':'缺失')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="打印时间"
                        width="400"
                ></el-table-column>

            </el-table>

            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[5, 10, 20, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="counts">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {getListPrinter} from "@/api/printer";

export default {
    name: "PrinterHistoryComponent",
    props: {
        // 控制是否展示或隐藏对话框

    },
    data() {
        return {
            filenameinput: '',
            counts: 0,
            page: 1,
            pageSize: 5,
            tableData : [],
            navState : '',
            navtableloading:false,
            token:'',
            inputStyle  : {'flex':1},
        }
    },
    created() {
        this.init()
    },
    methods: {

        async init () {
            this.navtableloading = true
            let params = {}
            params.pageNum = this.page
            params.pageSize = this.pageSize
            if (this.input){
                params.name = this.input ? this.input : undefined
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

<style scoped>
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
#nav-management .uploadImg .el-form-item__label::before{
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
    flex-flow: wrap;
    margin-bottom: 20px;
    justify-content: left;
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