import router from './router'
import Vue from 'vue'
import App from './App'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import './plugins/axios'




Vue.config.productionTip = false


  //ls.remove("user")
  

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
