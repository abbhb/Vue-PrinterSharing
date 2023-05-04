<template>
  <div>

<!--    <flvplayer :msg="String(2)"></flvplayer>-->
    <iframe src="http://10.15.245.153:18800/play.html?channel=2&stretch=yes&iframe=yes" width="1200" height="580" allowfullscreen allow="autoplay; fullscreen"></iframe>
  </div>
</template>

<script>


export default {
  name: "ipcview2",
  data(){
    return{
    }
  }
};
</script>

<style scoped>

</style>