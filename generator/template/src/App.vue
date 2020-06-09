<template>
<div id="app">
    <div v-if="requestBus.ving.length" class="page-loading-container">
        <div class="page-loading">{{ loadingMsg }}</div>
    </div>
    <router-view/>
</div>
</template>

<script>
export default {
    computed: {
        loadingMsg() {
            const item = this.requestBus.ving[0];
            return typeof item === 'string' ? item : '加载中…';
        }
    }
}

</script>

<style lang="less">
@import "./assets/less/app.less";

#app {
    min-height: 100%;
}
</style>
