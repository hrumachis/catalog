import Vue from 'vue'
import Router from 'vue-router';
import { Position, Route } from 'vue-router/types/router';

// Views
import ViewCatalog from './views/catalog.vue';
import ViewCart from './views/cart.vue';

// Attach router to Vue
Vue.use( Router );

export default new Router( {
    mode: 'history',
    routes: [
        { path: '/cart', name: 'Cart', component: ViewCart },
        { path: '/cart/*', name: 'CartShared', component: ViewCart },
        { path: '/*', name: 'Intro', component: ViewCatalog }
    ],
    // Every page opens at scroll Position( x: 0, y: 0 )
    scrollBehavior ( to: Route, from: Route, savedPosition: void | Position ) {
        return { x: 0, y: 0 }
    }
} );