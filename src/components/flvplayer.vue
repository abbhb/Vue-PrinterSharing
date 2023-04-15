<template>
<div>
  <video autoplay controls width="100%" height="500" id="myFlvVideo"></video>
</div>
</template>

<script>
import flvjs from 'flv.js'

export default {
  name: "flvplayer",
  props: {
    msg: String
  },
  watch:{
    'msg'(nel){
      console.log(nel)
      this.videoPlayer()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.videoPlayer()
    })
  },
  methods: {
    videoPlayer() {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('myFlvVideo');
        var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: './api/ipc/flv/'+this.msg, //你的url地址
          isLive: true,
        },{
          enableWorker: false, //不启用分离线程
            enableStashBuffer: false, //关闭IO隐藏缓冲区
            reuseRedirectedURL: true, //重用301/302重定向url，用于随后的请求，如查找、重新连接等。
            autoCleanupSourceBuffer: true, //自动清除缓存
          headers:{
            'Authorization':localStorage.getItem('token')
          }
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
        setInterval(function() {
          // console.log(videoElement.buffered,"idididid");
          if (videoElement.buffered.length > 0) {
            const end = videoElement.buffered.end(0); // 视频结尾时间
            const current = videoElement.currentTime; //  视频当前时间
            const diff = end - current; // 相差时间
            // console.log(diff);
            const diffCritical = 4; // 这里设定了超过4秒以上就进行跳转
            const diffSpeedUp = 1; // 这里设置了超过1秒以上则进行视频加速播放
            const maxPlaybackRate = 4; // 自定义设置允许的最大播放速度
            let playbackRate = 1.0; // 播放速度
            if (diff > diffCritical) {
              //  this.flvPlayer.load();
              // console.log("相差超过4秒，进行跳转");
              videoElement.currentTime = end - 1.5;
              playbackRate = Math.max(1, Math.min(diffCritical, 16));
            } else if (diff > diffSpeedUp) {
              // console.log("相差超过1秒，进行加速");
              playbackRate = Math.max(1, Math.min(diff, maxPlaybackRate, 16));
            }
            videoElement.playbackRate = playbackRate;
            if (videoElement.paused) {
              videoElement.play();
            }
          }
        }, 1000);

      }


    }
  }

};
</script>

<style scoped>

</style>