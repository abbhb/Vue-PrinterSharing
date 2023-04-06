<template>
    <div class="container">
        <div class="containerBox">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide item" v-for="(item, index) in pointTextList" :key="index">
                        <div class="text">{{item.thumb1}}</div>
                    </div>
                </div>
<!--                &lt;!&ndash; 如果需要导航按钮 &ndash;&gt;-->
<!--                <div class="swiper-button-prev"></div>-->
<!--                <div class="swiper-button-next"></div>-->
<!--                <div class="swiper-pagination"></div>-->
            </div>
        </div>
    </div>
</template>

<script>
// npm install swiper@4.5.1 --save-dev  // 安装swiper
import  Swiper  from "swiper"
export default {
    name: "swiper",
    data() {
        return {
            pointTextList: [
                {
                    thumb1: "等着急了吧,着急也没有用哦~"
                },
                {
                    thumb1: "很快就会好哦~",
                },
                {
                    thumb1: "文案还没想好哦,有啥好的想法来ai~",
                },
                {
                    thumb1: "文案还没想好哦,有啥好的想法来ai~",
                },
            ]
        }
    },
    mounted() {
        this.bannerPoint()
    },
    methods: {
        bannerPoint() {
            new Swiper(".swiper-container", {
                loop: true,
                autoplay: {
                    delay: 4000, //1秒切换一次
                    disableOnInteraction: false
                },
                updateOnImagesReady: true,
                slidesPerView: 1,  //设置slider容器能够同时显示的slides数量
                // spaceBetween : '10%',//按container的百分比

                observer: true,//在 Swiper 的上启用动态检查器(Mutation Observer)，如果你更改swiper 的样式（隐藏/显示）或修改其子元素（添加/删除幻灯片），Swiper 会更新（重新初始化）并触发 observerUpdate 事件。
                observeParents: true,
                observeSlideChildren: true,

                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    paginationClickable:true,
                },
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next', // 右按钮
                    prevEl: '.swiper-button-prev', // 左按钮
                },
            })
        }

    },
}
</script>

<style scoped>
.containerBox {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    align-items: center;
    width: auto;
    .item {
        height: auto;
    }
    .text {

    }
}
</style>