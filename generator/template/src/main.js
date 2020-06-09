import Vue from 'vue';
import App from './App.vue';
import router from './router';

// 初始化ledap
import '@/assets/js/init-ledap.js';
// 引入bekit
import * as bekit from 'bekit';
Vue.use(bekit.plugin.vueNotice);
// 初始化localstorage
import lsPlugin from '@/assets/js/ls.js';
Vue.use(lsPlugin);
// 引入全局api封装
import request from '@/assets/js/http.js';
Vue.use(request);
// 引入event bus
import bus from '@/assets/js/bus.js';
Vue.use(bus);
// 引入全局filter
import '@/assets/js/filter.js';
// 注册全局组件
import '@/components/index.js';

Vue.config.productionTip = false;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');