const path = require('path');

module.exports = {
    // ledap需要编译器
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            alias: {
                'base.less': path.resolve('./src/assets/less/desktop/base.less'),
                'mobile-base.less': path.resolve('./src/assets/less/mobile/base.less')
            }
        },
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '<%= options.title %>';
                return args;
            });
    }
};