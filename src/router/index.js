import Vue from 'vue'
import Router from 'vue-router'
import router from './router';
import authSv from "../common/sv/authSv";

Vue.use(Router)

const route = new Router({
    mode: 'history',
    base: '/lee',
    routes: router.routes
});

route.beforeEach((to, from, next) => {
    console.log(to, from, next);
    if (to.path.indexOf('/login') === -1)
        authSv.tokenCheck() ? next() : next('/login');
    else next()
});

export default route