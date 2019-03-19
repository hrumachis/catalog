import Vue from 'vue'
import Router from 'vue-router';

import ViewCatalog from './views/catalog.vue';

Vue.use( Router );

export default new Router( {
    mode: 'history',
    routes: [
        {
            path: '/*',
            name: 'Intro',
            component: ViewCatalog
        }
    ],
    scrollBehavior ( to, from, savedPosition ) {
        return { x: 0, y: 0 }
    }
} );