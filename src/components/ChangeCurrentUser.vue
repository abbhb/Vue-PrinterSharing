<template>
    <el-dialog
            title="切换用户"
            :visible.sync="changeUser"
            destroy-on-close="true"
            :before-close="handleClose"
            width="70%">
        <el-table
            :data="allUser"
            border
            style="width: 100%">
            <el-table-column
                fixed
                prop="username"
                label="用户名"
                width="150">
            </el-table-column>
            <el-table-column
                prop="name"
                label="用户昵称"
                width="150">
            </el-table-column>
            <el-table-column
                prop="id"
                label="用户ID"
                width="300">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button size="small" style="margin-left: auto" @click.native="changeUserById(scope.row)">切换</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="justify-content: center;align-items: center">
            <el-button style="margin-left: auto" @click.native="ToAddUser()">新增用户</el-button>
        </div>

        <el-dialog
                width="40%"
                title="登录"
                :visible.sync="LoginDialog"
                append-to-body>
            <LoginComponents></LoginComponents>
        </el-dialog>
    </el-dialog>
</template>

<script>
import LoginComponents from "@/components/LoginComponents.vue";
import {checkToken} from "@/api/login";
import router from "@/router";

export default {
    name: "ChangeCurrentUser",
    components: {LoginComponents},
    props:{
        changeUser: {
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            allUser: [],
            LoginDialog: false,
        }
    },
    created() {
        this.allUser = JSON.parse(localStorage.getItem("myAllUser"))
    },
    methods: {
        handleClose(done){
            this.$emit("update:changeUser", false);
            done();
        },
        async changeUserById(row) {
            console.log(row.id)
            if (String(row.id) === String(localStorage.getItem('userId'))) {
                this.$message.error("禁止切换到当前登录的用户上")
                this.changeUser = false
                this.$emit("update:changeUser", false);
                return
            }
            localStorage.setItem('userId', String(row.id))
            localStorage.setItem('token', row.token)

            const res = await checkToken()
            if (String(res.code) === '1') {
                console.log("验证")

                localStorage.setItem("type", res.data.permissions)
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                localStorage.setItem('userId', String(res.data.id))
                const sss = JSON.parse(localStorage.getItem('myAllUser'))
                let list = []
                let par = {}
                par.id = res.data.id
                par.token = res.data.token
                list.push(par)
                if (sss) {
                    for (let i = 0; i < sss.length; i++) {
                        if (sss[i].id === res.data.id) {
                            continue;
                        }
                        let par = {}
                        par.id = sss[i].id
                        par.token = sss[i].token
                        list.push(par)
                    }
                }
                localStorage.setItem('myAllUser', JSON.stringify(list))
                this.changeUser = false
                this.$emit("update:changeUser", false);
                // localStorage.setItem('token',res.data.token)
                router.push({name: 'dh'})
                window.location.reload()
            } else {
                sessionStorage.setItem("userLastStoreId", "")
                this.changeUser = false
                this.$emit("update:changeUser", false);
                // this.$message.error(res.msg)
                //此处就不提示token校验失败了，可能第一次本来就没有token
            }
        },
        ToAddUser() {
            this.LoginDialog = true;
        },
    }
}
</script>

<style scoped>

</style>