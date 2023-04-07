<template>
    <div class="sdss" id="nav-management">
        <div class="container">
            <div class="tableBar">
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
                        width="100"
                ></el-table-column>
                <el-table-column
                        label="单双面"
                        width="100"
                >
                    <template slot-scope="scope">
                        <span style="margin-right: 10px;">{{ String(scope.row.isDuplex) === '0' ? '单面' : (String(scope.row.isDuplex) === '1' ? '双面' : '缺失') }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="this.type==='admin'"
                        prop="createUser"
                        label="打印人"
                        width="300"
                ></el-table-column>
                <el-table-column
                        prop="createTime"
                        label="打印时间"
                        width="200"
                ></el-table-column>

                <el-table-column
                        label="操作"
                        width="160"
                        align="center"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="small"
                                class="blueBug"
                                @click="tryDownload(scope.row)"
                        >
                            尝试下载
                        </el-button>

                    </template>
                </el-table-column>
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

export default {
    name: "PrinterHistoryComponent",
    props: {
        // 控制是否展示或隐藏对话框
        type: {
            type: String,
            default: 'user',
        },
        filenameinput: {
            type: String,
            default: '',
        },
        counts: {
            type: Number,
            default: 0,
        },
        page: {
            type: Number,
            default: 1,
        },
        pageSize: {
            type: Number,
            default: 5,
        },
        tableData: {
            default: [],
        }
    },
    data() {
        return {
            navState: '',
            navtableloading: false,
            token: '',
            inputStyle: {'flex': 1},
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.$emit("init", false);
        },


        handleSizeChange(val) {
            this.$emit("handleSizeChange", val);
        },
        handleCurrentChange(val) {
            this.$emit("handleCurrentChange", val);

        },
        tryDownload(row) {
            console.log("尝试下载")
            if (row.url) {
                window.open(row.url)
            } else {
                alert("该功能逐步开放中")
            }
        }

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

#nav-management .uploadImg .el-form-item__label::before {
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