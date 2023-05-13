<template>
<div style="display: flex;flex-direction: column;">
  <iframe v-if="can"
      id="iframeId" :src="urls"  class="iframe"  scrolling="auto">
  </iframe>
  <span v-else>已为你在新窗口打开,后续支持一键从文件服务器打印支持的文件格式</span>

</div>
</template>

<script>


import aiServer from "@/config/config";

export default {
  name: "Files",
  data() {
    return {
      can:false,
      urls:'',
    }
  },
  created() {
    if (window.location.href.indexOf('10.15')!==-1){
      this.can = false
      window.open("http://"+aiServer)
    }
    else if (window.location.href.indexOf('192.168')!==-1){
      this.can = true
      this.urls = "http://192.168.12.12"
      // window.open("http://192.168.12.12")
    }else {
      this.can = false
      window.open("http://"+aiServer)
    }
    },
  mounted(){
    document.getElementById('iframeId').contentWindow.document.getElementsByTagName("form")[0].getElementsByTagName("input")[0].value='ai'
    document.getElementById('iframeId').contentWindow.document.getElementsByTagName("form")[0].getElementsByTagName("input")[1].setAttribute("type","text")
    document.getElementById('iframeId').contentWindow.document.getElementsByTagName("form")[0].getElementsByTagName("input")[1].value='123456'
    document.getElementById('iframeId').contentWindow.document.getElementsByTagName("form")[0].getElementsByTagName("input")[2].click()

  }
}
</script>

<style scoped>

.iframe {
  position: sticky;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 37.6rem;
  background: #fff;
  overflow-y: hidden;
}

</style>