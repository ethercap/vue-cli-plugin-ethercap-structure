export const requestBus = {
    ving: []
};

export default {
    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    requestBus: requestBus
                }
            },
            created() {
                this.requestBus.ving.push(true);
            },
            mounted() {
                this.requestBus.ving.shift();
            }
        });
    }
};