import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import titleMixin from './titleMixin'

Vue.mixin(titleMixin)
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
