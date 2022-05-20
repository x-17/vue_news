import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'

Vue.config.productionTip = false
Vue.use(Vant)
//自动聚焦方法全局封装
const directiveObj = {
  install(vue) {
    vue.directive('getFocus', {
      inserted(el) {
        if (el.nodeName === 'INPUT') {
          el.focus()
          return
        }
        const ipt = el.querySelector('input')
        ipt.focus()
      },
      update(el) {
        if (el.nodeName === 'INPUT') {
          el.focus()
          return
        }
        const ipt = el.querySelector('input')
        ipt.focus()
      },
    })
  }
}
Vue.use(directiveObj)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
