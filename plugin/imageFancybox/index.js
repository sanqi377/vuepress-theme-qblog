const {resolve} = require("path");
module.exports = (options, ctx) => {
    return {
        name: 'vuepress-plugin-imageFancybox',
        clientRootMixin: resolve(__dirname, "./lib/mixins/mixin.js"),
    }
}