<template>
<img v-if="!src" src="@/assets/img/loading.gif" v-bind="$attrs">
<img v-else :src="src" v-bind="$attrs">
</template>

<script>
// 有默认的 loading 效果
export default {
    name: 'Img',
    props: {
        src: {
            type: String,
            required: true
        }
    }
};
</script>
<style lang="less" scoped>
@import (reference) "~mobile-base.less";

</style>
