<template>
  <div :class="`${$parent.$data.isMobile ? 'tabbar' : 'left_nav'}`">
    <template v-if="$parent.$data.isMobile">
      <div class="footer_nav_box">
        <div class="inner">
          <ul>
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
    </template>
    <template v-else>
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
          <div class="adinfo_widget">
            <div class="wid_title">Follow Me</div>
            <div class="items wid_ad_social">
              <a href="https://github.com/sanqi377" target="_blank" class="ad_social" title="Github">
                <i class="ri-github-line"></i>
              </a>
              <a href="https://github.com/sanqi377" target="_blank" class="ad_social" title="Bilibili">
                <i class="ri-bilibili-line"></i>
              </a>
              <a href="mailto:sanqi377@outlook.com" class="ad_social" title="Send email">
                <i class="ri-mail-send-line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="stylus" scoped>
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
    border-bottom-left-radius: 12px;

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
      .adinfo_widget {
        border-bottom: 1px solid #e1eae4;
        padding: 0 40px 20px;
        margin: 0;
        margin-bottom: 20px;

        .wid_title {
          margin-bottom: 15px;
          font-size: 14px;
          color: #9098a7;
          font-weight: 600;
        }

        .wid_ad_social {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-content: center;

          a {
            margin-right: 8px;
            margin-bottom: 8px;
            display: flex;
            line-height: 1;
            justify-content: center;
            padding: 8px;
            background: var(--light-ac-btn);
            border-radius: 5px;

            i {
              display: flex;
              line-height: 1;
              width: 20%;
              justify-content: center;
              color: #fff !important;
              font-size: 18px;
            }
          }
        }
      }

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
</style>