import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.scss'
import './assets/scss/global.scss'
let globl = {
  isNeedZoom:false
}
Vue.config.productionTip = false;
Vue.prototype.$globl=globl
Vue.use(ElementUI);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
