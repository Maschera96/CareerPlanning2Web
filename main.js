import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'

Vue.config.productionTip = false
Vue.use(ElementUI);

App.mpType = 'app'

const app = new Vue({
    ...App,
	render: h => h(App)
})
app.$mount()
