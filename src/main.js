import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/css/common.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(ElementUI);
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})