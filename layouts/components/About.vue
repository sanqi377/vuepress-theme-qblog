<template>
  <div id="about-page">
    <header id="page-header">
      <Nav/>
    </header>
    <main class="layout">
      <div class="author-img">
        <img src="/logo.png" class="entered loading" alt="头像">
      </div>
      <div class="author-title">关于本站</div>
      <div class="author-content">
        <div class="author-content-item myInfoAndSayHello">
          <div class="title1">你好，很高兴认识你👋</div>
          <div class="title2">我叫 <span class="inline-word">叁柒</span></div>
          <div class="title1">是一名 学生、前端、独立开发者、<span class="inline-word">博主</span></div>
        </div>
        <div class="author-content-item aboutsiteTips">
          <div class="author-content-item-tips">追求</div>
          <h2>
            源于<br>热爱而去创造
            <div class="mask">
              <span class="first-tips" data-show>代码</span>
              <span>设计</span>
              <span>程序</span>
              <span>体验</span>
            </div>
          </h2>
        </div>
      </div>
      <div class="author-content">
        <div class="author-content-item about-statistic">
          <div class="card-content">
            <div class="author-content-item-tips">数据</div>
            <span class="author-content-item-title">访问统计</span>
            <div id="statistic"></div>
            <div class="post-tips">
              统计信息来自
              <a href="https://invite.51.la/1NzKqTeb?target=V6" target="_blank" rel="noopener nofollow">51la网站统计</a>
            </div>
            <div class="banner-button-group">
              <a class="banner-button">
                <font-awesome-icon class="post-meta-icon" :icon="['fas', 'square-arrow-up-right']"/>
                <span class="banner-button-text">文章统计</span>
              </a>
            </div>
          </div>
        </div>
        <div class="author-content-item-group mapAndInfo column">
          <div class="author-content-item map">
            <span class="map-title">我现在住在 <b>中国，天水市</b></span>
          </div>
          <div class="author-content-item selfInfo single">
            <div>
              <span class="selfInfo-title">生于</span>
              <span class="selfInfo-content" style="color:#43a6c6">2003</span>
            </div>
            <div>
              <span class="selfInfo-title">目标职业</span>
              <span class="selfInfo-content" style="color:#c69043">前端工程师</span>
            </div>
            <div>
              <span class="selfInfo-title">现在职业</span>
              <span class="selfInfo-content" style="color:#b04fe6">学生</span>
            </div>
          </div>
        </div>
      </div>
      <div class="author-content">
        <div class="author-content-item personalities">
          <div class="author-content-item-tips">性格</div>
          <span class="author-content-item-title">鉴赏家</span>
          <div class="title2" style="color:#ac899c">ISTP-A</div>
          <div class="image">
            <img class="entered loading" src="/images/assets/common/character.svg" alt="性格">
          </div>
          <div class="post-tips">
            在
            <a href="https://www.16personalities.com/" target="_blank" rel="noopener nofollow">16personalities</a>
            了解更多关于
            <a target="_blank" rel="noopener external nofollow"
               href="https://www.16personalities.com/ch/istp-%E4%BA%BA%E6%A0%BC">鉴赏家</a>
          </div>
        </div>
        <div class="author-content-item myphoto"/>
      </div>
      <div class="author-content">
        <div class="author-content-item maxim">
          <div class="author-content-item-tips">座右铭</div>
          <span class="maxim-title">
            <span style="opacity:.6;margin-bottom:8px">坚持，</span>
            <span>是对平庸最好的打击。</span>
          </span>
        </div>
        <div class="author-content-item buff">
          <div class="card-content">
            <div class="author-content-item-tips">特长</div>
            <span class="buff-title">
              <span style="opacity:.6;margin-bottom:8px">玄学流电脑疑难问题解决专家</span>
              <span>瞎鼓捣能力MAX</span>
            </span>
          </div>
        </div>
      </div>
      <div class="author-content">
        <div class="author-content-item game-ys">
          <div class="card-content">
            <div class="author-content-item-tips">爱好游戏</div>
            <span class="author-content-item-title">原神</span>
            <div class="content-bottom">
              <div class="tips">UID 176230116</div>
              <div class="tips">天空岛</div>
            </div>
          </div>
        </div>
        <div class="author-content-item game-wzry">
          <div class="card-content">
            <div class="author-content-item-tips">爱好游戏</div>
            <span class="author-content-item-title">王者荣耀</span>
            <div class="content-bottom">
              <div class="icon-group"><i class="icon-pos-dy"></i><i class="icon-pos-xl"></i></div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
let pursuitInterval = null;
import Nav from './Nav.vue'
import Footer from "./Footer.vue";

export default {
  name: "About",
  components: {Nav, Footer},
  mounted() {
    this.initLaData()
    this.initCarousel()
  },
  beforeDestroy() {
    clearInterval(pursuitInterval)
  },
  methods: {
    initLaData() {
      fetch('https://v6-widget.51.la/v6/JoiYK6sJFL1Lz2pa/quote.js').then(res => res.text()).then((data) => {
        let title = ['最近活跃', '今日人数', '今日访问', '昨日人数', '昨日访问', '本月访问', '总访问量']
        let num = data.match(/(?<=<\/span><span>).*?(?=<\/span><\/p>)/g)
        let s = document.getElementById('statistic')
        for (let i = 0; i < num.length; i++) {
          if (i === 0 || i === num.length - 1) continue;
          s.innerHTML += '<div style="display: flex;justify-content: space-between;flex-direction: column;width: 50%;margin-bottom: 1rem;"><span style="opacity: .8;font-size: .6rem;margin-bottom: 8px;">' + title[i] + '</span><span style="font-weight: 700;font-size: 34px;line-height: 1;white-space: nowrap;">' + num[i] + '</span></div>'
        }
      })
    },
    initCarousel() {
      pursuitInterval = setInterval(function () {
        const show = document.querySelector('span[data-show]')
        const next = show.nextElementSibling || document.querySelector('.first-tips')
        const up = document.querySelector('span[data-up]')
        if (up) {
          up.removeAttribute('data-up')
        }
        show.removeAttribute('data-show')
        show.setAttribute('data-up', '')
        next.setAttribute('data-show', '')
      }, 2000)
    }
  }
}
</script>

<style lang="stylus" scoped>
#statistic {
  font-size: 16px;
  border-radius: 15px;
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-bottom: 3rem;
}

#page-header {
  position: relative;
  width: 100%;
  height: 60px;
  background-image: none !important;
  display: flex;
  justify-content: center;
}

.layout {
  max-width: 1400px;
  padding: 2rem 1.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .author-img {
    margin: auto;
    border-radius: 50%;
    overflow: hidden;
    width: 180px;
    height: 180px;
    transition: cubic-bezier(0, 0, 0, 1.29) 0.5s;
    filter: drop-shadow(0 0 12px rgba(150, 255, 246, 0.4));
  }

  .author-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-top: 1.8rem;
    color: #fff;
  }

  .author-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-top: 1.8rem;

    .author-content-item-group {
      display: flex;
      flex-direction: column;
      width: 49%;
      justify-content: space-between;

      .map {
        &:hover {
          background-size: 120%;
          transition: 4s ease-in-out;
          background-position-x: 0;
          background-position-y: 36%;
        }

        &:hover .map-title {
          bottom: -100%
        }
      }

      .map-title {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
        padding: 1rem 3rem;
        backdrop-filter: saturate(180%) blur(20px);
        -webkit-backdrop-filter: blur(20px);
        transition: 1s ease-in-out;
        font-size: 20px;
        color: #fff;
      }

      &.column.mapAndInfo {
        width: 59%;
      }

      &.column {
        display: flex;
        flex-direction: column;
        width: 49%;
        justify-content: space-between;
      }
    }
  }

  .author-content-item {
    width: 49%;
    border-radius: $cardRadius;
    background: $cardBackgroundColor;
    border: 1px solid #42444a;
    box-shadow: 0 8px 16px -4px #00000050;
    position: relative;
    padding: 2rem 3rem;
    overflow: hidden;

    & .content-bottom {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon-group {
        display: flex;

        i {
          display: inline-block;
          width: 22px;
          height: 18px;
          margin-right: .5rem;

          &.icon-pos-dy {
            background: url(/images/assets/common/game-wzry-dy.png);
            background-size: 100% 100%;
          }

          &.icon-pos-xl {
            background: url(/images/assets/common/game-wzry-xl.png) no-repeat center;
            background-size: 80% 90%;
          }
        }
      }
    }

    &.game-ys {
      background: url(/images/assets/common/game-ys.webp) no-repeat top;
      background-size: cover;
      min-height: 300px;
      overflow: hidden;
      color: #fff;
      width: 59%;
    }

    &.game-wzry {
      width: 39%;
      background: url(/images/assets/common/game-wzry.webp) no-repeat top;
      background-size: cover;
      min-height: 300px;
      overflow: hidden;
      color: #fff;
    }

    &.buff {
      font-size: 36px;
      font-weight: 700;
      line-height: 1.1;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      background: linear-gradient(120deg, #ff27e8 0, #ff8000 100%);
      color: #fff;
      background-size: 200%;
      animation: gradient 15s ease infinite;
      min-height: 200px;
      height: fit-content;
      width: 59%;

      .buff-title {
        display: flex;
        flex-direction: column;
      }
    }

    &.maxim {
      font-size: 36px;
      font-weight: 700;
      line-height: 1.1;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      width: 39%;

      .maxim-title {
        display: flex;
        flex-direction: column;
        color: rgba(255, 255, 255, 0.9);
      }
    }

    &.myphoto {
      background: url(/images/assets/common/myphoto.webp) no-repeat center;
      background-size: cover;
      height: 60%;
      min-height: 240px;
      position: relative;
      overflow: hidden;
      width: 39%;
    }

    &.personalities {
      overflow: hidden;
      position: relative;
      width: 59%;

      &:hover .image {
        transform: rotate(-10deg);
      }

      .image {
        position: absolute;
        right: -40px;
        bottom: -12rem;
        transition: transform 2s cubic-bezier(.13, .45, .21, 1.02);
      }
    }

    &.selfInfo {
      display: flex;
      min-height: 100px;
      max-height: 400px;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      height: -webkit-fill-available;
      height: 40%;

      div {
        display: flex;
        flex-direction: column;
        margin: 1rem 3rem 1rem 0;

        .selfInfo-title {
          opacity: .8;
          font-size: .6rem;
          line-height: 1;
          margin-bottom: 8px;
          color: #fff;
        }

        .selfInfo-content {
          font-weight: 700;
          font-size: 34px;
          line-height: 1;
        }
      }
    }

    &.single {
      width: 100%;
    }

    .author-content-item-title {
      font-size: 36px;
      font-weight: 700;
      line-height: 1;
      color: rgba(255, 255, 255, 0.9);
    }

    .banner-button-group {
      position: absolute;
      bottom: 1.5rem;
      right: 3rem;

      .banner-button {
        height: 40px;
        width: 124px;
        border-radius: $cardRadius;
        justify-content: center;
        background: $cardBackgroundColor;
        color: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        z-index: 1;
        transition: .3s;
        cursor: pointer;

        svg {
          margin-right: 8px;
          font-size: 1.2rem;
        }

        &:hover {
          background: #998c5a;
          color: #fff;
        }
      }
    }

    .post-tips {
      color: #999999;
      font-size: 14px;
      position: absolute;
      bottom: 1rem;
      left: 3rem;

      a {
        color: #999999 !important;
        border: none !important;
      }
    }

    .card-content {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      padding: 2rem 3rem;
    }

    &.about-statistic {
      min-height: 380px;
      width: 39%;
      background: url(/images/assets/common/visitBg.webp) no-repeat top;
      background-size: cover;
      color: #fff;
      overflow: hidden;
    }

    &.map {
      background: url(/images/assets/common/location.webp) no-repeat center;
      min-height: 160px;
      max-height: 400px;
      position: relative;
      overflow: hidden;
      margin-bottom: .5rem;
      height: 60%;
      background-size: 100%;
      transition: 1s ease-in-out;
      width: 100%;
    }

    &.myInfoAndSayHello {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #fff;
      background: linear-gradient(120deg, #5b27ff 0, #00d4ff 100%);
      background-size: 200%;
      animation: gradient 15s ease infinite;
      width: 59%;
    }

    &.aboutsiteTips {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      width: 39%;
    }

    .author-content-item-tips {
      opacity: .8;
      font-size: .6rem;
      margin-bottom: 8px;
      color: #fff;
    }

    h2 {
      margin-right: auto;
      font-size: 36px;
      line-height: 1.06;
      letter-spacing: -.02em;
      color: rgba(255, 255, 255, 0.9);
      margin-top: 0;
    }

    .mask {
      height: 36px;
      position: relative;
      overflow: hidden;
      margin-top: 4px;

      span {
        display: block;
        box-sizing: border-box;
        position: absolute;
        top: 36px;
        padding-bottom: 0;
        background-size: 100% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        background-repeat: no-repeat;

        &[data-up] {
          transform: translateY(-200%);
          transition: .5s transform ease-in-out;
        }

        &[data-show] {
          transform: translateY(-100%);
          transition: .5s transform ease-in-out;
        }

        &:nth-child(1) {
          background-image: linear-gradient(45deg, #0ecffe 50%, #07a6f1);
        }

        &:nth-child(2) {
          background-image: linear-gradient(45deg, #18e198 50%, #0ec15d);
        }

        &:nth-child(3) {
          background-image: linear-gradient(45deg, #8a7cfb 50%, #633e9c);
        }

        &:nth-child(4) {
          background-image: linear-gradient(45deg, #fa7671 50%, #f45f7f);
        }
      }
    }

    .inline-word {
      word-break: keep-all;
      white-space: nowrap;
    }

    .title2 {
      font-size: 36px;
      font-weight: 700;
      line-height: 1.1;
      margin: .5rem 0;
    }

    .title1 {
      opacity: .8;
      line-height: 1.3;
    }
  }
}
</style>