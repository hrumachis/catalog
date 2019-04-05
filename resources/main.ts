import Vue from 'vue'
import App from './views/app.vue'
import router from './router'
import store from './store'
import cookies from 'vue-cookies'
import Api from './api'

Vue.config.productionTip = false;
Vue.use( cookies );
Vue.use( Api );

new Vue( {
    router,
    store,
    render: h => h( App )
} ).$mount( '#app' );