<template>
<div>
<!--  <flvplayer :msg="String(1)"></flvplayer>-->
  <iframe :src="srcss" width="1200" height="580" allowfullscreen allow="autoplay; fullscreen"></iframe>
</div>
</template>

<script>

import aiServer from "@/config/config";

export default {
  name: "ipcview1",
  data(){
    return{
      srcss:"http://"+aiServer+":18800/play.html?channel=1&stretch=yes&iframe=yes"
    }
  }
};
</script>

<style scoped>

</style>