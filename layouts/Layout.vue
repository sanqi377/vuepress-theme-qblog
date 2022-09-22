<template>
  <div>
    <div id="page" class="main_wrap">
      <div class="main_body">
        <Nav/>
        <div class="page_main">
          <header id="masthead" class="site-header">
            <div class="top_bar">
              <div class="top_left">
                <div class="top_tool" @click="changeMode"><a><i class="ri-contrast-2-line"></i></a></div>
                <div class="top_tool"><a><i class="ri-search-line s_toogle_btn"></i></a></div>
              </div>
              <div class="top_right">
                <div class="top_tool"><a title="随机前往一个开往项目网站" @click="goTaveling"><i
                    class="ri-train-fill"></i></a></div>
              </div>
            </div>
          </header>
          <div class="index_banner"
               style="background-image: url(https://www.ideaopen.cn/wp-content/uploads/2022/09/14303736_1589188083306_android.jpg);">
            <div class="user_info">
              <div class="top">
                <div class="left">
                  <div class="name">叁柒</div>
                  <div class="des">楼外的蒹葭、傍晚的月亮和鸡鸣寺的樱花</div>
                </div>
                <div class="avatar"><img src="/logo.png"></div>
              </div>
            </div>
          </div>
          <Home v-if="['home','categoryItem'].includes($page.pageType)"/>
          <Circles v-else-if="$page.pageType === 'circle'"/>
          <Link v-else-if="$page.pageType === 'link'"/>
          <Post v-else/>
        </div>
      </div>
    </div>
    <Comment v-if="$page.pid === 'post' || ['link'].includes($page.pageType)"/>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Home from './components/Home'
import Post from "./components/Post";
import Link from "./components/Link";
import Circles from "./components/Circles";
import 'remixicon/fonts/remixicon.css'

export default {
  mounted() {
    this.initSite()
  },
  watch: {
    $route: {
      handler(to, from) {
        document.querySelector('.page_main').scrollTop = 0
      },
    }
  },
  methods: {
    /**
     * 初始化站点
     */
    initSite() {
      // 检测主题模式
      if (window.localStorage.getItem('mode') === 'dark') {
        document.querySelector("body").className = 'dark'
      } else {
        document.querySelector("body").className = ''
      }

      // 顶部滚动
      document.querySelector('.page_main').addEventListener("scroll", (e) => {
        let dom = e.target.children[0].children[0]
        // 初始化 top_bar 滚动
        if (e.target.scrollTop > 15) {
          if (!dom.className.includes("top_bar_scroll")) {
            dom.className += " top_bar_scroll";
            dom.style.background = 'rgba(255, 255, 255, 0.8)'
          }
        } else {
          dom.removeAttribute('style')
          dom.className = dom.className.replace(/top_bar_scroll/, " ")
        }
      })
    },
    /**
     * 初始化 leancloud
     * @returns {Promise<void>}
     */
    async initAV() {
      const AV = await import('leancloud-storage')
      AV.init({
        appId: this.$site.themeConfig.comment.appId,
        appKey: this.$site.themeConfig.comment.appKey,
        serverURL: "https://oyhywvay.lc-cn-n1-shared.com"
      });
      return AV
    },
    /**
     * 主题切换
     */
    changeMode() {
      if (window.localStorage.getItem('mode') === 'dark') {
        document.querySelector("body").className = ''
        window.localStorage.setItem('mode', null)
      } else {
        document.querySelector("body").className = 'dark'
        window.localStorage.setItem('mode', 'dark')
      }
    },
    /**
     * 点击开往
     */
    goTaveling() {
      this.$toast.info("即将跳转到「开往」项目的成员博客", {
        position: "top-center",
        timeout: 2500,
        closeButton: false,
        onClose: () => {
          window.open("https://travellings.link", "_blank");
          console.log('点击了开往 exit')
        }
      })
    }
  },
  components: {
    Nav,
    Home,
    Post,
    Link,
    Circles
  },
}
</script>

<style lang="stylus">
@require '../assets/css/font.css'
@require '../assets/css/markdown.styl'
@require '../assets/css/dark.styl'
</style>