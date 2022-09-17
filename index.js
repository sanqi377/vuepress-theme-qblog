const path = require('path')
module.exports = (options, {themeConfig}) => {
    /**
     * Default theme configuration
     */
    themeConfig = Object.assign(themeConfig, {
        blogTitle: themeConfig.blogTitle || 'San\' qi',
        nav: themeConfig.nav || [
            {
                text: '文库',
                items: [
                    {
                        text: '文章列表',
                        icon: 'book-open',
                        link: 'archives'
                    }
                ]
            }
        ],
        category: themeConfig.category || [
            {
                text: "经验分享",
                link: "experience"
            }
        ],
        bannerGroup: themeConfig.bannerGroup || [
            [
                {
                    background: '#989bf8',
                    imgUrl: '/images/icon/6320adb6425f0.webp',
                    title: 'AfterEffect'
                },
                {
                    background: '#fff',
                    imgUrl: '/images/icon/6320ae1c443e1.webp',
                    title: 'Sketch'
                }
            ],
            [
                {
                    background: '#57b6e6',
                    imgUrl: '/images/icon/6320ae611acb4.webp',
                    title: 'docker'
                },
                {
                    background: '#4082c3',
                    imgUrl: '/images/icon/6320ae86dae3e.webp',
                    title: 'Photoshop'
                }
            ],
            [
                {
                    background: '#fff',
                    imgUrl: '/images/icon/6320aea440bc2.webp',
                    title: 'video'
                },
                {
                    background: '#fff',
                    imgUrl: '/images/icon/6320aece3325a.webp',
                    title: 'Python'
                }
            ],
            [
                {
                    background: '#eb6840',
                    imgUrl: '/images/icon/6320aeee7c182.webp',
                    title: 'Swift'
                },
                {
                    background: '#8f55ba',
                    imgUrl: '/images/icon/6320af12e692b.webp',
                    title: 'Principle'
                }
            ],
            [
                {
                    background: '#f29e39',
                    imgUrl: '/images/icon/6320af2eb0a38.webp',
                    title: 'illustrator'
                },
                {
                    background: '#2c51db',
                    imgUrl: '/images/icon/6320af4ab2683.webp',
                    title: 'CSS3'
                }
            ],
            [
                {
                    background: '#f7cb4f',
                    imgUrl: '/images/icon/6320af7860a7f.webp',
                    title: 'JS'
                },
                {
                    background: '#e9572b',
                    imgUrl: '/images/icon/6320af934f9e4.webp',
                    title: 'HTML'
                }
            ]
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
        alias: {
            assets: path.resolve(__dirname, 'assets'),
        }
    }
}