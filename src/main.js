import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios';

Vue.config.productionTip = false
Axios.defaults.baseURL = 'https://mqtt-api-101.herokuapp.com'

new Vue({
  render: h => h(App),
}).$mount('#app')
