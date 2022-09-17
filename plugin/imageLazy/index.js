const {resolve} = require("path");
module.exports = (options, ctx) => {
    return {
        name: 'vuepress-plugin-image',
        extendMarkdown: md => {
            md.use(require('markdown-it-image-lazy-loading'))
            if (options.loading === undefined || options.loading) {
                md.use(require('markdown-it-image-loading'), options)
            }
        },
        clientRootMixin: resolve(__dirname, "./lib/mixins/mixin.js"),
    }
}