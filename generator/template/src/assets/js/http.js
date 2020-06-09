import axios from 'axios';
import * as bekit from 'bekit';
import encrypt from './encrypt.js';
import { requestBus } from './bus.js';
import { ls } from './ls.js';
const { Url } = bekit.helper;

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = '/api';
axios.interceptors.request.use(config => {
    // 跨域时不作处理
    if (/^http/i.test(config.url)) return config;

    config.params = Object.assign({}, config.params);
    config.timeout = 1000 * 10;
    // 计算 x-token
    let options = {
        method: config.method,
        uri: config.baseURL + config.url,
        params: config.params,
        data: config.data
    };

    config.headers.common['X-token-1'] = encrypt.getTokenString(ls.getSync('TOKEN'));
    config.headers.common['X-token-2'] = encrypt.getURIHashString(options);

    // 默认是有loading message默认为布尔true
    config.loading = config.loading === undefined ? { show: true, message: '加载中…' } : config.loading;
    config.loading.show && requestBus.ving.push(config.loading.message);
    return config;
}, error => {
    bekit.notice.alert('', '请求错误, 请重试');
    return Promise.reject(error);
});


axios.interceptors.response.use((res) => {
    res.config.loading.show && requestBus.ving.shift();
    if (res.data.code) bekit.notice.toast(res.data.message);
    switch (res.data.code) {
        case 0:
            return Promise.resolve(res.data.data);
            break;
            // 未登录
        case 10:
            ls.removeSync(['TOKEN', 'u']);
            const query = Url.parseParams(location.search.slice(1));
            delete query.token;
            location.replace('/login?' + Url.stringifyParams({
                after_login: location.pathname + '?' + Url.stringifyParams(query),
            }));
            break;
            // 未绑定手机号
        case 15:
            ls.removeSync(['TOKEN', 'u']);
            const url = res.data.data.verifyUrl;
            location.replace(
                url + (~url.indexOf('?') ? '&' : '?') +
                Url.stringifyParams({
                    gotoURL: location.href
                })
            );
            break;
        default:
            break;
    }
    return Promise.reject({
        type: 'api',
        body: res.data,
    });
}, (error) => {
    error.config.loading.show && requestBus.ving.shift();
    if (!(error.request.readyState == 4 && error.request.status == 0)) {
        bekit.notice.alert('', '网络异常，请稍候再试');
    }
    return Promise.reject({
        type: 'network'
    });
});

function request(httpOptions, suc, fail) {
    return axios.request(httpOptions).then(suc).catch(err => {
        fail && typeof fail === 'function' && fail(err);
    });
}
request.install = function(Vue) {
    Vue.prototype.$request = request;
    Vue.prototype.$axios = axios;
};

export default request;