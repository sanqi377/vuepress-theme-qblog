<template>
  <footer id="footer">
    <div id="footer_deal">
      <a class="deal_link" target="_blank" href="https://github.com/sanqi377/" rel="external nofollow" title="github">
        <font-awesome-icon class="deal_link" :icon="['fab', 'github']"/>
      </a>
      <img class="footer_mini_logo" :src="$site.themeConfig.logo"
           title="返回顶部" alt="返回顶部"/>
      <a class="deal_link" target="_blank" href="mailto:sanqi377@outlook.com" rel="external nofollow" title="github">
        <font-awesome-icon class="deal_link" :icon="['fas', 'envelope']"/>
      </a>
    </div>
    <div id="footer-banner">
      <div class="footer-banner-links">
        <div class="footer-banner-left">
          <div id="footer-banner-tips">
            <div class="copyright">© 2021 - 2022 By San' qi Blog</div>
          </div>
        </div>
        <div class="footer-banner-right">
          <a class="footer-banner-link" href="/rss/" data-pjax-state="">订阅</a>
          <a class="footer-banner-link" href="/update/" data-pjax-state="">主题</a>
          <a class="footer-banner-link" href="/about/" data-pjax-state="">关于</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="stylus" scoped>
#footer {
  background: linear-gradient(180deg, #1d1b2600 0, #1d1b26 25%);
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 1002;
  position: relative;

  &:before {
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
    content: '' !important;
    z-index: -1;
  }

  #footer-banner {
    padding: 1.5rem;
    color: #F7F7FA;
    margin-top: 1rem;
    background: #30343f;
    display: flex;
    overflow: hidden;
    z-index: 1002;
    transition: .3s;
    font-size: 16px;

    .footer-banner-links {
      display: flex;
      justify-content: space-between;
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;
      flex-wrap: wrap;
      align-items: center;
      font-weight: 700;

      .footer-banner-left {
        display: flex;
        flex-wrap: wrap;
      }

      .footer-banner-right {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .footer-banner-link {
          margin-right: 1rem;
          color: #F7F7FA;
          font-size: 16px;
          font-weight: 700;
          white-space: nowrap;
          text-decoration: none;
          transition: all .3s;

          &:hover {
            color: #f2b94b;
          }
        }
      }
    }
  }

  #footer_deal {
    justify-content: center;
    display: flex;
    padding-top: 2rem;
    align-items: center;

    a.deal_link {
      margin: 1rem 27px;
      color: #a1a2b8;
      line-height: 1.3rem;
      border-radius: 3rem;

      &:last-child {
        svg {
          height: 1rem;
        }
      }

      svg {
        color: #1b1a23;
        transition: .3s;
        line-height: 1.1rem;
        height: 1.1rem;
        background: #F7F7FA;
        border-radius: 50%;
        padding: 8px;

        &:hover {
          background: #0084FF;
        }
      }
    }

    img.footer_mini_logo {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      margin: 0 1rem;
      cursor: pointer;
      transition: cubic-bezier(0, 0, 0, 1.29) .5s;
      filter: drop-shadow(0 0 12px rgba(150, 255, 246, .4));

      &:hover {
        filter: drop-shadow(0 0 15px rgba(144, 255, 246, .7));
      }
    }
  }
}
</style>