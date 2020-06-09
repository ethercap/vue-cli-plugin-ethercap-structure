<template>
<div class="logout">
    <button class="btn btn-primary is-round" @click="logout">退出登录</button>
</div>
</template>

<script>
import * as bekit from 'bekit';
import hosts from '@/config/hosts-local.json';
const { Ua, Url } = bekit.helper;

export default {
    name: 'Logout',
    data() {
        return {
            auth: ['TOKEN', 'u']
        };
    },
    methods: {
        logout() {
            this.$ls.removeSync(this.auth);
            let params = {
                appname: '<%= options.appname %>',
                gotoURL: location.origin + '/login?after_login=/index'
            };
            location.replace(hosts.sso_url + 'account/logout/?' + Url.stringifyParams(params));
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) "~base.less";

.logout {
    padding: 200px 40px 0;
    text-align: center;
}
</style>
