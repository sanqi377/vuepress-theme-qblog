const path = require('path')
module.exports = (options, {themeConfig}) => {
    /**
     * 默认主题配置
     */
    themeConfig = Object.assign(themeConfig, {
        blogTitle: themeConfig.blogTitle || 'San\' qi',
        homeCoverHide: themeConfig.homeCoverHide || true,
        nav: themeConfig.nav || [
            {
                text: '友链',
                icon: 'ri-link',
                link: '/link'
            }
        ],
        category: themeConfig.category || [
            {
                text: "经验分享",
                link: "experience"
            }
        ],
        logo: themeConfig.logo || '/logo.png',
    })
    const plugins = [
        ['@vuepress/blog', themeConfig.blog || {
            directories: [
                {
                    id: 'post',
                    dirname: '_post',
                    path: '/',
                    frontmatter: {title: ''},
                    pagination: {
                        lengthPerPage: 10,
                        prevText: '',
                        nextText: ''
                    },
                }
            ],
            frontmatters: [
                {
                    id: "tag",
                    keys: ['tag', 'tags'],
                    path: '/tags/',
                    frontmatter: {title: 'Tag'},
                    pagination: {
                        lengthPerPage: 10,
                        prevText: '',
                        nextText: ''
                    }
                },
                {
                    id: "category",
                    keys: ['category', 'categories'],
                    path: '/categories/',
                    frontmatter: {title: 'Category'},
                    pagination: {
                        lengthPerPage: 10,
                        prevText: '',
                        nextText: ''
                    }
                }
            ],
        }],
        ['@vuepress/nprogress'],
        [require('./plugin/imageLazy'), {
            loading: true,
            loadingSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            loadingWidth: 30,
            loadingHeight: 30,
            minWidth: 100,
            minHeight: 100,
        }],
        require('./plugin/imageFancybox'),
        require('./plugin/theme-utils'),
    ];
    return {
        plugins,
    }
}