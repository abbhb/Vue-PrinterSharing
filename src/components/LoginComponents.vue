
<template>
    <div>
        <div class="logins">
            <el-form>
                <el-form-item style="width:100%;">
                    <div style="display: flex;flex-flow: column;justify-content: center;align-items: flex-end;">
                        <el-button class="login-btn" size="medium" type="primary"
                                   style="width:17rem;height: 5rem;border-radius: 10px;"
                                   @click.native.prevent="ButtonCAS">
                            <span>CAS登录</span>
                        </el-button>
                    </div>

                </el-form-item>
            </el-form>
        </div>

    </div>


</template>

<script>/**
 * 登录模块
 */
import { loginApi } from "@/api/auth";
import router from "@/router";


export default {
    name: "LoginComponents",
    data() {
        return {
            ticket:'',
        }
    },
    async created() {
        if (window.location.search.startsWith('?ticket=')) {
            // console.log(window.location.search.split("?ticket=")[1])
            const tickets =  window.location.search.split("?ticket=")
            this.ticket = tickets[tickets.length-1]
            const res = await loginApi(this.ticket)
            if (String(res.code)==='1'){
                window.location.search=''
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                localStorage.setItem("permission", res.data.permission)
                localStorage.setItem('userId', String(res.data.id))
                if (this.$route.path.indexOf("login") == -1) {
                    //说明此时不是在login处调用,刷新即可!信息已经返回了
                    window.location.reload()
                } else {
                    //此时时login调用,跳转导航页
                    router.push({name: 'dh'})
                }

            }else {
                this.$message.error(res.msg)
                if (window.location.search.indexOf("?") !== -1) {
                    let wenhao = window.location.href.indexOf("?")
                    let arraytemp = window.location.href.split("")
                    arraytemp.splice(wenhao, window.location.search.length)
                    let sss = arraytemp.join("")
                    console.log(sss)
                    window.location.href = sss
                }
            }

        }
    },
    methods: {
        ButtonCAS(){
            let asa = window.location.href
            if (asa.indexOf('#')){
                asa = asa.substring(0,asa.indexOf('#'))
            }
            // window.location.hostname
            window.location.href ='http://10.15.245.153'+':55554/?service='+asa
        },
    }
}
</script>

<style scoped>
.logins {

    display: flex;
    flex-flow: row wrap;
    box-sizing: content-box;
    justify-content: center;
    align-items: center;

}

.logins .el-form {
    margin-top: 3rem;
    width: 214px;
    height: 307px;
}

.logins .el-form-item {
    margin-bottom: 15px;
}

.logins .el-form-item.is-error .el-input__inner {
    border: 0 !important;
    border-bottom: 1px solid #fd7065 !important;
    background: #fff !important;
}

.logins .input-icon {
    height: 32px;
    width: 18px;
    margin-left: -2px;
}

.logins .el-input__inner {
    border: 0;
    border-bottom: 1px solid #e9e9e8;
    border-radius: 0;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    height: 32px;
    line-height: 32px;
}

.logins .el-input__prefix {
    left: 0;
}

.logins .el-input--prefix .el-input__inner {
    padding-left: 26px;
}

.logins .el-input__inner::placeholder {
    color: #aeb5c4;
}

.logins .el-form-item--medium .el-form-item__content {
    line-height: 32px;
}

.logins .el-input--medium .el-input__icon {
    line-height: 32px;
}

.login-btn {
    border-radius: 17px;
    padding: 11px 20px !important;
    margin-top: 10px;
    font-weight: 500;
    font-size: 14px;
    border: 0;
    background-color: #2fa4de;
}

.login-btn:hover,
.login-btn:focus {
    /* background: #FFC200; */
    /* color: #ffffff; */
}

.login-form-title {
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
}

.login-form-title .title-label {
    font-weight: 500;
    font-size: 20px;
    color: #333333;
    margin-left: 10px;
}

.goto {
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #0f84ff;
}
</style>