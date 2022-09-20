<template>
  <div class="left_nav">
    <div class="left_nav_inner">
      <div class="top_logo">
        <router-link to="/">
          <span>{{ $site.themeConfig.blogTitle }}</span>Blog
        </router-link>
      </div>
      <div class="left_menu_box">
        <ul id="left_menu" class="menu">
          <li :class="`${['home','categoryItem'].includes($page.pageType) || $page.pid === 'post' ? 'active' : ''}`">
            <router-link to="/">
              <i class="ri-home-line"/>
              <span>首页</span>
            </router-link>
          </li>
          <li v-for="(item,idx) in $site.themeConfig.nav" :key="idx"
              :class="`${$route.fullPath.includes(item.link) ? 'active' : ''}`">
            <router-link :to="item.link">
              <i :class="item.icon"/>
              <span>{{ item.text }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>


  <!--  &lt;!&ndash;  顶部菜单 start &ndash;&gt;-->
  <!--  <nav id="nav">-->
  <!--    <div id="nav-group">-->
  <!--      <div id="blog_name">-->
  <!--        <router-link id="site-name" to="/">-->
  <!--          <span>{{ blogTitle }}</span>-->
  <!--        </router-link>-->
  <!--      </div>-->
  <!--      <div id="menus">-->
  <!--        <div class="menus_items">-->
  <!--          <div class="menus_item" v-for="(item,index) in nav" :key="index">-->
  <!--            <template v-if="item.items">-->
  <!--              <ul class="menus_item_child">-->
  <!--                <li v-for="el in item['items']">-->
  <!--                  <router-link class="site-page child" :to="`${el.link ? `/${el.link}/` : `javascript:void(0);`}`">-->
  <!--                    <font-awesome-icon v-if="el.icon" :icon="['fas',`${el.icon}`]"/>-->
  <!--                    <span :style="el.icon ? 'margin-left:8px' : ''">{{ el.text }}</span>-->
  <!--                  </router-link>-->
  <!--                </li>-->
  <!--              </ul>-->
  <!--            </template>-->
  <!--            <a class="site-page" href="javascript:void(0);" rel="external nofollow">-->
  <!--              <span>{{ item.text }}</span>-->
  <!--            </a>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <div id="nav-right">-->
  <!--        <div class="nav-button" id="travellings_button" style="display: flex" v-show="$page.pageType === 'home'">-->
  <!--          <a class="site-page" @click="goTaveling" title="随机前往一个开往项目网站" href="javascript:void(0);"-->
  <!--             rel="external nofollow">-->
  <!--            <font-awesome-icon :icon="['fas','train-subway']"/>-->
  <!--          </a>-->
  <!--        </div>-->
  <!--        <div class="nav-button" id="search_button" style="display: flex">-->
  <!--          <a class="site-page" @click="goSeach" title="站内搜索" href="javascript:void(0);"-->
  <!--             rel="external nofollow">-->
  <!--            <font-awesome-icon :icon="['fas','magnifying-glass']"/>-->
  <!--          </a>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </nav>-->
  <!--  &lt;!&ndash;  顶部菜单 end &ndash;&gt;-->
</template>

<script>
export default {
  data() {
    return {
      // nav: [],
      // blogTitle: ''
    }
  },
  mounted() {
    // this.nav = this.$site.themeConfig.nav
    // this.blogTitle = this.$site.themeConfig.blogTitle
  },
  methods: {
    // goTaveling() {
    //   this.$toast.info("即将跳转到「开往」项目的成员博客", {
    //     position: "top-center",
    //     timeout: 2500,
    //     closeButton: false,
    //     onClose: () => {
    //       window.open("https://travellings.link", "_blank");
    //       console.log('点击了开往 exit')
    //     }
    //   })
    // },
    // goSeach() {
    //   console.log(1)
    // }
  }
}
</script>

<style lang="stylus" scoped>
.dark {
  .top_logo {
    a {
      color: #fff !important;
    }
  }

  .left_nav_inner {
    background: var(--dark-bg) !important;
  }

  .left_menu_box {
    ul {
      border-bottom: 1px solid var(--dark-border) !important;

      li {
        a {
          color: var(--dark-color) !important;
        }

        &.active a {
          background: var(--dark-ac-btn) !important;
          color: #fff !important;
        }
      }
    }
  }
}

.left_nav {
  z-index: 899;
  width: 25%;
  box-sizing: border-box;
  max-width: 100%;
  margin: 0;
  padding-left: 0;
  height: 100%;

  .left_nav_inner {
    background: var(--light-bg);
    display: flex;
    flex-direction: column;
    height: 100%;
    border-top-left-radius: 12px;

    .top_logo {
      padding: 20px 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Lobster';
      font-size: 30px;

      a {
        color: #000;

        span {
          margin-right: 15px;
        }
      }
    }

    .left_menu_box {
      ul {
        margin: 0 0 20px 0;
        list-style: none;
        padding: 0 40px;
        margin-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e1eae4;

        li {
          width: 100%;

          &.active a {
            background: var(--light-ac-btn);
            color: var(--light-color);
          }

          i {
            line-height: 1;
            font-size: 18px;
            margin-right: 8px;
          }

          a {
            display: flex;
            width: 100%;
            color: var(--light-color);
            padding: 15px;
            border-radius: 12px;
            margin-bottom: 5px;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: nowrap;
            align-content: center;
            position: relative;
          }
        }
      }
    }
  }
}

//@-moz-keyframes sub_menus
//  0% {
//    opacity: 0;
//    -webkit-transform: translateY(10px);
//    -moz-transform: translateY(10px);
//    -o-transform: translateY(10px);
//    -ms-transform: translateY(10px);
//    transform: translateY(10px)
//  }
//  100% {
//    opacity: 1;
//    -ms-filter: none;
//    filter: none;
//    -webkit-transform: translateY(0);
//    -moz-transform: translateY(0);
//    -o-transform: translateY(0);
//    -ms-transform: translateY(0);
//    transform: translateY(0)
//  }
//
//@-webkit-keyframes sub_menus
//  0% {
//    opacity: 0;
//    -webkit-transform: translateY(10px);
//    -moz-transform: translateY(10px);
//    -o-transform: translateY(10px);
//    -ms-transform: translateY(10px);
//    transform: translateY(10px)
//  }
//  100% {
//    opacity: 1;
//    -ms-filter: none;
//    filter: none;
//    -webkit-transform: translateY(0);
//    -moz-transform: translateY(0);
//    -o-transform: translateY(0);
//    -ms-transform: translateY(0);
//    transform: translateY(0)
//  }
//
//
//@-o-keyframes sub_menus
//  0% {
//    opacity: 0;
//    -webkit-transform: translateY(10px);
//    -moz-transform: translateY(10px);
//    -o-transform: translateY(10px);
//    -ms-transform: translateY(10px);
//    transform: translateY(10px)
//  }
//  100% {
//    opacity: 1;
//    -ms-filter: none;
//    filter: none;
//    -webkit-transform: translateY(0);
//    -moz-transform: translateY(0);
//    -o-transform: translateY(0);
//    -ms-transform: translateY(0);
//    transform: translateY(0)
//  }
//
//
//@keyframes sub_menus
//  0% {
//    opacity: 0;
//    -webkit-transform: translateY(10px);
//    -moz-transform: translateY(10px);
//    -o-transform: translateY(10px);
//    -ms-transform: translateY(10px);
//    transform: translateY(10px)
//  }
//  100% {
//    opacity: 1;
//    -ms-filter: none;
//    filter: none;
//    -webkit-transform: translateY(0);
//    -moz-transform: translateY(0);
//    -o-transform: translateY(0);
//    -ms-transform: translateY(0);
//    transform: translateY(0)
//  }
//
//
//#nav
//  background: transparent;
//  box-shadow: 0 5px 6px -5px #85858500;
//  transition: .3s;
//  display: flex;
//  justify-content: center;
//  position: absolute;
//  width: 100%;
//  z-index: 1000 !important;
//  flex-wrap: nowrap;
//
//  #nav-group
//    max-width: 1400px;
//    width: 100%;
//    display: flex;
//    position: relative;
//    padding: 0 1.5rem;
//
//    #nav-right {
//      position: absolute;
//      right: 0;
//      z-index: 102;
//      display: flex;
//      flex-direction: row;
//      height: 100%;
//      align-items: center;
//      margin-right: 1.5rem;
//      overflow: hidden;
//
//      div {
//        margin-left: .5rem;
//        padding: 0;
//      }
//
//      .nav-button {
//        cursor: pointer;
//
//        a {
//          height: 35px;
//          width: 35px;
//          display: flex;
//          align-items: center;
//          justify-content: center;
//          border-radius: $cardRadius;
//          color: #fff;
//
//          &:hover {
//            color: #fff !important;
//            background: $buttonBackgroundColor;
//            transition: .3s;
//            box-shadow: 0 8px 12px -3px #0084FF23;
//          }
//
//          svg {
//            font-size: 1.2rem;
//          }
//        }
//      }
//
//      #travellings_button {
//        display: inline;
//        padding: 0 .4rem;
//        transition: .3s;
//      }
//    }
//
//    #menus
//      display: flex;
//      justify-content: center;
//      width: 100%;
//      position: absolute;
//      height: 60px;
//      left: 0;
//
//      .menus_items
//        position: relative;
//        width: fit-content;
//        text-align: center;
//        left: 0;
//        right: 0;
//        top: 0;
//        display: flex;
//        flex-direction: row;
//        justify-content: center;
//
//        .menus_item
//          position: relative;
//          padding: 0 .4rem;
//          display: flex;
//          align-items: center;
//          justify-content: center;
//          flex-direction: column;
//
//          &:hover > .site-page
//            color: #fff !important;
//            background: $buttonBackgroundColor;
//            transition: .3s;
//            box-shadow: 0 8px 12px -3px #0084FF23;
//            border-radius: $cardRadius;
//
//
//          .site-page
//            color: rgba(255, 255, 255, 0.9);
//            text-shadow: none;
//            line-height: 35px;
//            letter-spacing: .3rem;
//            padding-left: .8rem;
//            padding-right: .5rem;
//            font-weight: 700;
//            text-decoration: none;
//            border-radius: $cardRadius;
//
//            &:hover
//              color: #fff !important;
//              background: $buttonBackgroundColor;
//              transition: .3s;
//              box-shadow: 0 8px 12px -3px #0084FF23;
//              border-radius: $cardRadius;
//
//
//          &:hover .menus_item_child
//            display: block;
//
//
//          .menus_item_child
//            margin-top: 8px;
//            position: absolute;
//            display: none;
//            padding: 8px 4px;
//            border-radius: $cardRadius;
//            background-color: $cardBackgroundColor;
//            box-shadow: 0 0 12px 4px rgba(0, 0, 0, .05);
//            border: 1px solid #42444a;
//            transition: .3s;
//            backdrop-filter: blur(20px);
//            -webkit-backdrop-filter: blur(20px);
//            top: 50px;
//            white-space: nowrap;
//            -webkit-animation: sub_menus .3s .1s ease both;
//            -moz-animation: sub_menus .3s .1s ease both;
//            -o-animation: sub_menus .3s .1s ease both;
//            -ms-animation: sub_menus .3s .1s ease both;
//            animation: sub_menus .3s .1s ease both;
//
//            &:hover
//              border: 1px solid $hoverBorderColor;
//              box-shadow: 0 8px 12px -3px #0084FF23;
//
//
//            &:hover ~ .site-page
//              color: #fff !important;
//              background: $buttonBackgroundColor;
//              transition: .3s;
//              box-shadow: 0 8px 12px -3px #0084FF23;
//              border-radius: $cardRadius;
//
//
//            li
//              display: inline-flex;
//              margin: 0 .4rem;
//              list-style: none;
//              border-radius: 5px;
//
//              a
//                letter-spacing: 0;
//                display: inline-block;
//                width: 100%;
//                color: rgba(255, 255, 255, 0.9) !important;
//                text-shadow: none !important;
//
//    #blog_name
//      flex-wrap: nowrap;
//      height: 60px;
//      display: flex;
//      align-items: center;
//      z-index: 102;
//      transition: .3s;
//
//      #site-name
//        color: #fff;
//        transition: .3s;
//        display: flex;
//        justify-content: center;
//        align-items: center;
//        text-shadow: none;
//        font-size: 25px;
//        line-height: 35px;
//        padding: 0 12px;
//        text-decoration: none;
//        font-weight: 400;
//        letter-spacing: .1rem;
//        font-family: "Lobster", serif;
//        border-radius: $cardRadius;
//
//        &:hover
//          background: $buttonBackgroundColor;
//          transition: .3s;
//          box-shadow: 0 8px 12px -3px #0084FF23;
//          transform: scale(1.03);
//          border-radius: $cardRadius;
//
//
//        &:hover span
//          opacity: 0;
//          transition: .3s;
//
//
//        &:hover:after
//          opacity: 1;
//          transform: translateY(0) scale(.3);
//          transition-timing-function: ease-in;
//
//
//        &:after
//          background: url(/images/icon/home.webp) no-repeat 50% 50%;
//          opacity: 0;
//          position: absolute;
//          display: flex;
//          z-index: 1;
//          width: 74px;
//          height: 58px;
//          content: "";
//          transition: 0s;
//          transition-timing-function: ease-in;
//          transform: scale(.4);
</style>