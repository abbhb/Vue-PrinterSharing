<template>
  <div>

<!--    <flvplayer :msg="String(2)"></flvplayer>-->
    <iframe :src="srcs" width="1200" height="580" allowfullscreen allow="autoplay; fullscreen"></iframe>
  </div>
</template>

<script>


import aiServer from "@/config/config";

export default {
  name: "ipcview2",
  data(){
    return{
      srcs:"http://"+aiServer+":18800/play.html?channel=2&stretch=yes&iframe=yes"
    }
  }
};
</script>

<style scoped>

</style>