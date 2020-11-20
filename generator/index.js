module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        scripts: {
            init: 'envinit run && npm i --no-save',
            watch: 'vue-cli-service build --mode development --watch --no-clean',
            build: 'vue-cli-service build --no-clean'
        }
    });

    api.extendPackage({
        devDependencies: {
            'ledap': "^0.1.9",
            'bekit': "0.1.2",
            'axios': "^0.19.2",
            'crypto-js': "^4.0.0"
        }
    });

    //渲染template下的模板
    api.render("./template", {
        ...options
    });
};