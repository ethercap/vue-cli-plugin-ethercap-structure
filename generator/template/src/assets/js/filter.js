import Vue from 'vue';

// 防止接口返回后页面跳动
Vue.filter('occupy', value => {
    if (!value.trim()) return '加载中...';
    return value;
});