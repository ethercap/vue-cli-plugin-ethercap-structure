<template>
<div>登录中...</div>
</template>

<script>
import * as bekit from 'bekit';
import hosts from '@/config/hosts-local.json';
import { domain } from '@/config/main.json';
const { Ua, Url } = bekit.helper;

export default {
    name: 'login',
    created() {
        // 登陆回来之后存ticket并跳转
        if (this.$route.query.ticket) return this.afterLogin();
        // 跳到 sso 做自动登录
        return this.beforeLogin();
    },
    methods: {
        beforeLogin() {
            document.domain = domain;

            const params = Url.stringifyParams({
                appname: '<%= options.appname %>',
                gotoURL: location.origin + this.$route.fullPath,
            });
            const path = 'account/login/';
            location.replace(hosts.sso_url + path + '?' + params);
        },
        afterLogin() {
            this.$ls.setSync('TOKEN', this.$route.query.ticket, 3600 * 24 * 7);
            this.$ls.setSync('u', +this.$route.query.u, 3600 * 24 * 7);

            const redirectUrl = this.$route.query.after_login.slice(1) || '/';
            this.$router.replace(redirectUrl);
        }
    }
}
</script>
