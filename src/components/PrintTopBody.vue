<template>
    <div class="PrintFileTopList">
        <div class="titlebody">
            <span class="title">打印用户榜单({{Ztitle}})</span>
            <span class="intro">{{Ftitle}}</span>
        </div>
        <div>
            <el-table
                    :data="UserTopList"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="用户id"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="昵称"
                        width="100">
                </el-table-column>
                <el-table-column
                        label="头像"
                        width="100">
                    <template slot-scope="{ row }">
                        <el-image style="width: 40px; height: 40px; border:none;cursor: pointer;"
                                  :src="row.avatar"
                                  :preview-src-list="[ `${row.avatar}` ]" >
                            <div slot="error" class="image-slot">
                                <!--                  <i class="el-icon-picture-outline"></i>-->
                                <img src="@/assets/notimage.png">
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="total"
                        label="总打印页数"
                        width="100">
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
import {getUserPrintTopList} from "@/api/printer";

export default {
    name: "PrintTopBody",
    props:{
        Ztitle:{
            type:String,
            default:""
        },
        Ftitle:{
            type:String,
            default:""
        },
        type:{
            type:Number,
            default:1,
        }
    },
    data() {
        return {
            UserTopList:[],
        }
    },
    async created() {
        const res = await getUserPrintTopList(this.type);
        if (String(res.code)==='1'){
            this.UserTopList = res.data
        }else {
            this.$message.error(res.msg)
        }
    },
}
</script>

<style scoped>
.PrintFileTopList {
    display: flex;flex-direction: column;justify-content: center;align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 3rem 3rem 3rem 3rem;
    border-radius: 1rem;
    background-image: url('~@/assets/pexels-codioful-(formerly-gradienta)-7130469.jpg');
}
.PrintFileTopList .titlebody{
    display: flex;flex-direction: column;justify-content: center;align-items: center;
}
.PrintFileTopList .titlebody .title{
    font-weight: 800;
    font-size: 28px;
    color: #9d3be5;
}
.PrintFileTopList .titlebody .intro{
    font-weight: 500;
    font-size: 14px;
    font-family: "Arial Rounded MT Bold";
}


</style>