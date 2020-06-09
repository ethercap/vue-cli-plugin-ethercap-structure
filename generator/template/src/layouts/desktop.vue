<template>
<div class="root">
    <DesktopHeader/>
    <router-view />
    <DesktopFooter/>
</div>
</template>

<script>
import DesktopHeader from './components/DesktopHeader.vue';
import DesktopFooter from './components/DesktopFooter.vue';

export default {
    name: 'DesktopLayout',
    components: {
        DesktopHeader,
        DesktopFooter
    }
}
</script>

<style lang="less">
@import "../assets/less/desktop/common.less";
</style>

<style lang="less" scoped>
@import (reference) "~base.less";

.root {
    padding-bottom: 178px;
}
// 每一页的根元素必须有这个类名
.page-content {
    margin: 0 auto;
    width: @page-width;
    padding-top: 52px;
}
</style>
