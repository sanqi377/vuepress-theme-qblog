<template>
  <div id="link">
    <header id="page-header">
      <Nav/>
    </header>
    <main class="layout">
      <h3>小伙伴们
        <a href="#小伙伴们" class="header-anchor">#</a>
      </h3>
      <div class="site-card-group">
        <div class="site-card" v-for="item in $page.frontmatter.links">
          <a :href="item.url" target="_blank" class="img">
            <img :src="item.homeImg" alt="快照">
          </a>
          <a :href="item.url" target="_blank" class="info">
            <div class="site-card-avatar">
              <img :src="item.avatar" alt="avatar">
            </div>
            <div class="site-card-text">
              <span class="title">{{ item.title }}</span>
              <span class="desc" :title="item.desc">{{ item.desc }}</span>
            </div>
          </a>
        </div>
      </div>
      <h3>友链信息
        <a href="#友链信息" class="header-anchor">#</a>
      </h3>
      <Content class="vp-doc"/>
    </main>
    <Comment/>
    <Footer/>
  </div>
</template>

<script>
import Nav from './Nav.vue'
import Footer from "./Footer.vue";
import Comment from "./Comment.vue"

export default {
  components: {Nav, Footer, Comment},
}
</script>

<style lang="stylus" scoped>
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
  padding: 1rem 1.5rem;
  margin: 0 auto;

  h3 {
    font-size: 1.6rem;
    line-height: 1.3;
    border-bottom: 1px solid #42444a;
    padding-bottom: 1.5rem;
    color: #fff;

    &:hover .header-anchor {
      opacity: 1;
      color: #f2b94b;
    }

    .header-anchor {
      float: right;
      opacity: 0.08;
      border-bottom: none;
      position: relative;
      padding: 0;
      border-radius: 8px !important;
      line-height: 1;
      font-size: 1.6rem;
      color: #fff;
      text-decoration: none;
      transition: all 0.3s;
    }
  }

  .site-card-group {
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: start;
    justify-content: flex-start;
    margin: -8px;
    -webkit-box-align: stretch;
    align-items: stretch;

    .site-card {
      border: 1px solid #42444a;
      border-radius: $cardRadius;
      transition: .3s;
      transition-timing-function: ease-in-out;
      overflow: hidden;
      position: relative;
      width: calc(100% / 7 - 16px);
      background: #1d1b26;
      box-shadow: 0 8px 16px -4px #00000050;
      margin: 8px;
      display: block;
      line-height: 1.4;

      &:hover {
        border: 1px solid $hoverBorderColor;
        box-shadow: 0 8px 12px -3px #2080e023;
      }

      .info {
        display: flex;
        border: none;
        padding: .8rem .5rem;
        width: 100%;
        margin: 0;
        border-radius: 0 0 12px 12px;
        text-decoration: none;
        color: #fff;
        transition: all .2s;
        overflow-wrap: break-word;
        box-sizing: border-box;
        font-weight: 700;
        align-items: center;

        .site-card-text {
          display: flex;
          flex: 1;
          overflow: hidden;
          flex-direction: column;

          .title {
            color: #fff;
            text-align: left;
            font-weight: 600;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 1;
            margin-bottom: 5px;
          }

          .desc {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: .7rem;
            color: #fff;
            word-wrap: break-word;
            line-height: 1.2;
            opacity: .7;
            transition: .3s;
            text-align: left;
          }
        }

        .site-card-avatar {
          display: flex
          margin-right: 10px;

          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }
        }
      }

      a.img {
        -webkit-mask-image: -webkit-radial-gradient(center, #fff, #000);
        border-radius: $cardRadius $cardRadius 0 0;
        height: 120px;
        width: 100%;
        display: flex;
        border: none;
        padding: 0 !important;
        overflow: hidden;
        background: #f6f6f6;
        -webkit-transition: all .3s ease;
        text-decoration: none;
        color: #F7F7FA;
        font-weight: 700;

        img {
          pointer-events: none;
          border-radius: 12px 12px 0 0;
          transform: scale(1.03);
          transition: .3s;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          margin: 0 auto .8rem;
        }
      }
    }
  }
}

</style>