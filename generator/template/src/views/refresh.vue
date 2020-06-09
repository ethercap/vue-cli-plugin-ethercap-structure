<template lang="html">
</template>

<script>
export default {
    name: 'Refresh',
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 为了灵活性，允许用户指定刷新的时候的回跳地址
            vm.back(to.query.from || from);
        });
    },
    methods: {
        back(route) {
            this.$router.replace(route);
        }
    }
}
</script>
