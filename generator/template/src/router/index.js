import Vue from 'vue';
import VueRouter from 'vue-router';
import * as bekit from 'bekit';
import Index from '../views/desktop/Index.vue';
import { ls } from '@/assets/js/ls.js';
import request from '@/assets/js/http.js';
const { Ua } = bekit.helper;

Vue.use(VueRouter);

const commonRoutes = [{
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/login.vue'),
}, {
    path: '/logout',
    name: 'Logout',
    component: () => import( /* webpackChunkName: "logout" */ '../views/logout.vue'),
}, {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import( /* webpackChunkName: "forbidden" */ '../views/forbidden.vue')
}, {
    path: '/refresh',
    name: 'Refresh',
    component: () => import( /* webpackChunkName: "refresh" */ '../views/refresh.vue')
}];
const platformRoutes = {
    desktop: {
        path: '/',
        component: () => import( /* webpackChunkName: "desktop-layout" */ '../layouts/desktop.vue'),
        children: [{
            path: '/',
            name: 'DesktopIndex',
            component: Index
        }]
    },
    mobile: {
        path: '/',
        component: () => import( /* webpackChunkName: "mobile-layout" */ '../layouts/mobile.vue'),
        children: [{
            path: '/',
            name: 'MobileIndex',
            component: () => import( /* webpackChunkName: "mobile-index" */ '../views/mobile/Index.vue')
        }]
    }
};
// 为防止 pc、mobile 有相同的路由，先注册的路由生效，后注册路由无效
const platforms = Ua.isMob() ? ['mobile', 'desktop'] : ['desktop', 'mobile'];
let routes = commonRoutes.concat(platforms.map(platform => {
    return platformRoutes[platform];
}));
// 在结尾增加 404 页面
routes.push({
    path: '*',
    component: () => import( /* webpackChunkName: "forbidden" */ '../views/forbidden.vue')
});

const router = new VueRouter({
    mode: '<%= options.routerMode %>',
    base: process.env.BASE_URL,
    routes: routes
});

router.beforeEach((to, from, next) => {
    // 无效路由处理
    if (!to.matched.length) {
        return next({
            path: '/forbidden',
            replace: true
        });
    }
    // 不需要登录的页面
    if (!to.meta.requiresAuth) return next();
    // 需要登录的逻辑
    return verifyAuth(to, next);
});

function verifyAuth(to, next) {
    let token = ls.getSync('TOKEN');
    if (!token) return toLogin(to, next);
    next();
}

function toLogin(to, next) {
    next({
        path: '/login',
        query: {
            after_login: to.fullPath
        },
        replace: true
    });
}

export default router;