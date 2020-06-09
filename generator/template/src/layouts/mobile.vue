<template>
<div class="root">
    <router-view />
</div>
</template>

<script>
import viewport from '@/assets/js/viewport.js';

export default {
    name: 'MobileLayout',
    beforeRouteEnter(to, from, next) {
        viewport.set();
        next();
    },
    beforeRouteLeave(to, from, next) {
        viewport.unset();
        next();
    },
}
</script>

<style lang="less">
@import "../assets/less/mobile/common.less";
</style>

<style lang="less" scoped>
@import (reference) "~mobile-base.less";
.root {
    max-width: 8rem;
    margin: 0 auto;
}
</style>
