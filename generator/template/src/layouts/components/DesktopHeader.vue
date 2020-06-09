<template lang="html">
<header class="page-header">
    header
</header>
</template>

<script>
export default {
    name: 'DesktopHeader',
    data() {
        return {
            user: null,
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'getUserInfo'
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            // TODO: 补充用户信息接口
            return false;
            let { requiresAuth } = this.$route.meta,
                user = this.user;
            if (!requiresAuth || user) return user;
            this.$request({
                url: 'xxx'
            }, data => {
                this.user = data;
            });
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) "~base.less";

.page-header {
}
</style>
