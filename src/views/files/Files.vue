<template>
<div style="display: flex;flex-direction: column;">
  <iframe
      id="iframeId" src="http://10.15.245.215:8088/"  class="iframe"  scrolling="auto">

  </iframe>
</div>
</template>

<script>


export default {
  name: "Files",
  data() {
    return {
    }
  },
  created() {



    },
  mounted(){
    window.addEventListener('message',function(){
      //此处执行事件
      document.getElementById('iframeId').contentWindow.document.getElementsByTagName("form")[0].getElementsByTagName("input")[0].value='admin'
      document.getElementById('iframeId').contentWindow.document.getElementsByTagName("form")[0].getElementsByTagName("input")[1].setAttribute("type","text")
      document.getElementById('iframeId').contentWindow.document.getElementsByTagName("form")[0].getElementsByTagName("input")[1].value='aizhineng1404'
      document.getElementById('iframeId').contentWindow.document.getElementsByTagName("form")[0].getElementsByTagName("input")[2].click()

    })
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