import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import { getMenu } from "@/utils/menu"

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  },
  created() {
    if (store.getters.userId) {
      getMenu(store.getters.userId)
    }
  }
}).$mount('#app')