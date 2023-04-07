<template>
    <div>
        <transition name="el-loading-fade">
            <div class="el-loading-mask">
                <div class="el-loading-spinner" :style="this.longtime?'top:69vh;margin-left: auto;max-width: 5rem;':''">
                    <el-progress :class="this.longtime?'el-progress-small':'el-progress'" id="el-progressone" type="circle" :percentage="parseInt(fake.progress*100)" :status="getStatus"></el-progress>
                    <div v-if="!longtime" class="swiper-body">
                        <Swiper class="swiper"></Swiper>
                    </div>

                </div>

            </div>
        </transition>
    </div>

</template>

<script>
/**
 * 自定义加载中
 */
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
        exit(){
            this.$emit('exitloading');
        },
    }
}
</script>

<style scoped>

div .el-loading-mask .el-progress{
    margin-top: -100rem;
}
div .el-loading-mask .el-progress-small{
    margin-top: -100rem;
    background-color: #ffffff;
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