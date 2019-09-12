import Vue from 'vue';
import $ from 'webpack-zepto';
import VueRouter from 'vue-router';
import filters from './filters';
import routes from './routers';
import Alert from './libs/alert';

Vue.use(VueRouter);
Vue.use(Alert);

$.ajaxSettings.crossDomain = true;

// 实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

// 实例化VueRouter
const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({router}).$mount('#app');
