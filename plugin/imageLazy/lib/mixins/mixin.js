export default {
    updated() {
        let _this = this
        const timer = setInterval(() => {
            if (document.querySelectorAll('img[data-src]').length > 0) {
                _this.reRenderImage()
                document.addEventListener("scroll", _this.reRenderImage)
                clearInterval(timer)
            }
        }, 100)
    },
    methods: {
        reRenderImage() {
            const viewHeight = document.documentElement.clientHeight
            let ele = document.querySelectorAll('img[data-src]')
            Array.prototype.forEach.call(ele, (item) => {
                let rect;
                if (item.dataset.src === "") {
                    return
                }
                rect = item.getBoundingClientRect() // 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
                if (rect.bottom >= 0 && rect.top < viewHeight) {
                    !function () {
                        const img = new Image();
                        img.src = item.dataset.src
                        img.onload = function () {
                            item.src = img.src
                        }
                        item.removeAttribute("data-src")//移除属性，下次不再遍历
                    }()
                }
            })
        }
    },
};
