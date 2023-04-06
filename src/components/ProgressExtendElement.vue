<template>
    <div>
        <transition name="el-loading-fade">
            <div class="el-loading-mask">
                <div>
                    <j-hover-btn bgColor = 'pink'
                                 :text = jHoverBtnText
                                 :btn-style = "btnStyle"
                                 @hoverBtnClick = "hoverBtnClick()">
                    </j-hover-btn>
                </div>


                <div class="el-loading-spinner" :style="this.longtime?'top:69vh;margin-left: auto;max-width: 5rem;':''">
                    <el-progress :class="this.longtime?'el-progress-small':'el-progress'" id="el-progressone" type="circle" :percentage="parseInt(fake.progress*100)" :status="getStatus"></el-progress>
                    <div v-if="!longtime" class="swiper-body">
                        <Swiper class="swiper"></Swiper>
                    </div>

                </div>
                <iframe v-if="longtime"  id="iframe"
                        name="iframe"
                        height="100%"
                        width="100%" src="https://tool.liumingye.cn/music/#/"  scrolling="auto"
                        frameborder="0"></iframe>
            </div>
        </transition>
    </div>

</template>

<script>
//依赖element-progress
//依赖npm install fake-progress

import FakeProgress from "fake-progress"
import Swiper from "@/components/swiper.vue";
export default {
    name: "ProgressExtendElement",
    components: {Swiper},
    props:{
        status:{
            type:String,
            default:undefined
        },
    },
    computed: {
        getStatus(){
            if (this.status==='success'){
                this.fake.end()
                if (this.longtime){
                    //询问是否推出
                    this.exit()
                }else {
                    //退出
                    this.exit();
                }

            }else if (this.status==='error'){
                this.fake.stop()
                this.exit();
            }
            return this.status
        }
    },
    data(){
        return{
            fake:new FakeProgress({
                timeConstant:15000,
                autoStart:true
            }),
            longtime:false,//等着急了，看会视频
            btnStyle:{
                "fontSize":'small',
                "top":'70vh',
                "left":'1vw'
            },
            jHoverBtnText:"省时模式",
            node2:undefined,
        }
    },
    created() {

    },
    mounted() {
        this.node2 = document.getElementById("el-progressone").getElementsByClassName('el-progress-circle')[0]
        this.node2.style.width='226px';
        this.node2.style.height='226px';

    },
    methods:{
        hoverBtnClick(){
            if (this.longtime == true){
                this.longtime = false;
                this.node2.style.width='226px';
                this.node2.style.height='226px';
                this.jHoverBtnText = "省时模式"

            }else if (this.longtime == false){
                this.longtime = true;
                this.node2.style.width='40px';
                this.node2.style.height='40px';
                this.jHoverBtnText = "纯净模式"
            }

        },
        exit(){
            this.$emit('exitloading');
        },
//onresize属性可以用来获取或设置当前窗口的resize事件的事件处理函数
//onresize事件会在窗口或框架被调整大小时发生
    }
}
</script>

<style scoped>

div .el-loading-mask .el-progress{
    margin-top: -100rem;
}
div .el-loading-mask .el-progress-small{
    margin-top: -100rem;
    background-color: rgba(243, 228, 230, 0.93);
    border-radius: 1rem;
}

div .el-loading-mask .swiper-body{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 5rem;

}
div .el-loading-mask .swiper-body .swiper{

    width: 30rem;
    justify-content: center;
    align-items: center;
    background-color: rgba(253, 246, 227, 1);
    border-radius: 1.5rem;

}

</style>