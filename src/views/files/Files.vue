<template>
<div style="display: flex;flex-direction: column;">
  <iframe
      id="iframeId" src="https://10.15.247.254/ai/file/"  class="iframe"  scrolling="auto">
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