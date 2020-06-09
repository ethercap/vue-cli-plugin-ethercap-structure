import * as bekit from 'bekit';

export const ls = new bekit.helper.Ls({
    prefix: '#|g.'
});

export default {
    install(Vue, options) {
        Vue.prototype.$ls = ls;
    }
}