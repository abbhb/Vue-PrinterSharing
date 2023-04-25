import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.scss'
import './assets/scss/global.scss'

//全局变量
let globl = {
  isNeedZoom:false,
  Version:'3.0.1',
}
Vue.config.productionTip = false;
Vue.prototype.$globl=globl



import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

//swiper轮播图组件样式
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min'

//注册服务

import loadingService from './components/progress/service.js'

//
//引入组件库:jvuewheel
import jvuewheel from '@jyeontu/jvuewheel'
//引入样式
import '@jyeontu/jvuewheel/lib/jvuewhell.css'
Vue.use(jvuewheel);

VMdEditor.Codemirror = Codemirror;

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(VMdEditor);

//预览版组件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';


VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(VMdPreview);

Vue.use(ElementUI);


//注册loading服务
Vue.prototype.$myloading = loadingService;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
