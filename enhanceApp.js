import Comment from './layouts/components/Comment'
import "vue-toastification/dist/index.css";

export default ({Vue, options, router, siteData, isServer}) => {
    Vue.mixin({
        mounted() {
            Vue.component('Comment', Comment)

            import('vue-toastification').then(({default: Toast}) => {
                Vue.use(Toast, {
                    transition: "Vue-Toastification__fade",
                    maxToasts: 20,
                    newestOnTop: true
                });
            })

            import('vue-tribute').then(VueTribute => {
                Vue.component('VueTribute', VueTribute.default)
            })

            // nprogress 魔改 start
            import('nprogress').then((nprogress) => {
                nprogress.configure({
                    showSpinner: false,
                    template: '<div class="bar"><div class="peg" role="bar"></div></div></div>',
                    speed: 500
                })
                router.beforeEach((to, from, next) => {

                    if (to.path !== from.path) {
                        nprogress.start()
                    }
                    next()
                })
                router.afterEach(() => {
                    nprogress.done()
                })
            })
            // nprogress 魔改 end
        }
    })
};
