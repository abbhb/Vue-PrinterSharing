import Vue from 'vue';
import ProgressExtendElement from "@/components/progress/ProgressExtendElement.vue";
import {addClass} from "@/utils/dom";

const LoadingConstructor = Vue.extend(ProgressExtendElement);

LoadingConstructor.prototype.close = function () {
    this.visible = false;
}

const loadingService = () => {
    let instance = new LoadingConstructor({
        el: document.createElement('div'),
    });
    if (instance.originalPosition !== 'absolute' && instance.originalPosition !== 'fixed') {
        addClass(parent, 'el-loading-parent--relative');
    }

    document.body.appendChild(instance.$el);
    instance.visible = true;

    return instance;
}

export default loadingService;

//
// // $myloading
// const $myloading = this.$myloading();
//
// // $myloading
// $myloading.close();