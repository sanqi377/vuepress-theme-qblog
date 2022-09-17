<template>
  <div id="home_top">
    <div id="bbTimeList">
      <div class="bb_title"><span>即刻</span></div>
      <swiper id="bb-talk" class="swiper" :options="swiperOption">
        <swiperSlide class="li-style" v-for="(el,i) in bbLIst" :key="i">{{ el.title }}</swiperSlide>
      </swiper>
      <div class="more">
        <font-awesome-icon class="banner-right icon" :icon="['fas', 'arrow-circle-right']"/>
      </div>
    </div>
    <div class="recent-top-post-group">
      <div class="recent-post-top">
        <div id="bannerGroup">
          <div id="banners">
            <div class="banners-title">
              <div class="banners-title-big">经验分享</div>
              <div class="banners-title-big">与琐碎生活</div>
              <div class="banners-title-small">QBLOG.CC</div>
            </div>
            <div class="tags-group-all">
              <div class="tags-group-wrapper">
                <template v-for="el in 2">
                  <div class="tags-group-icon-pair" v-for="item in $site.themeConfig.bannerGroup">
                    <div class="tags-group-icon" v-for="items in item" :style="`background:${items.background}`">
                      <img :src="items.imgUrl" :title="items.title" alt="img">
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <a id="banner-hover">
              <span class="bannerText">随便逛逛</span>
              <font-awesome-icon class="banner-right icon" :icon="['fas', 'arrow-right']"/>
            </a>
          </div>
          <div class="categoryGroup">
            <div class="categoryItem" style="box-shadow:0 8px 12px -3px rgba(40, 109, 234,.20)">
              <a class="categoryButton bikan" href="/tags/必看/">
                <span class="categoryButtonText">必看精选</span>
                <font-awesome-icon :icon="['fas', 'dove']"/>
              </a>
            </div>
            <div class="categoryItem" style="box-shadow:0 8px 12px -3px rgba(40, 109, 234,.20)">
              <a class="categoryButton remen" href="/tags/必看/">
                <span class="categoryButtonText">热门文章</span>
                <font-awesome-icon :icon="['fas', 'burn']"/>
              </a>
            </div>
            <div class="categoryItem" style="box-shadow:0 8px 12px -3px rgba(40, 109, 234,.20)">
              <a class="categoryButton shiyong" href="/tags/必看/">
                <span class="categoryButtonText">实用教程</span>
                <font-awesome-icon :icon="['fas', 'book']"/>
              </a>
            </div>
          </div>
        </div>
        <div class="topGroup">
          <div class="recent-post-item" v-for="(item,idx) in post" :key="idx">
            <span class="recent-post-top-text">荐</span>
            <div class="post_cover">
              <router-link :to="item.path">
                <img class="post_bg"
                     src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                     :alt="item.frontmatter.title" :data-src="item.frontmatter.cover">
              </router-link>
            </div>
            <div class="recent-post-info">
              <router-link class="article-title" :to="item.path" :title="item.frontmatter.title">
                {{ item.frontmatter.title }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

export default {
  data() {
    return {
      swiperOption: {
        direction: 'vertical',
        autoplay: true,
      },
      bbLIst: [{title: "呃呃呃呃呃呃呃呃"}, {title: "哈哈哈哈哈哈"}],
      post: [],
    }
  },
  mounted() {
    this.initPost()
  },
  methods: {
    initPost() {
      this.post = this.$pagination['_matchedPages'].filter(e => e.frontmatter.recommend).filter((e, i) => i < 6)
    }
  }
}
</script>

<style lang="stylus" scoped>
@keyframes rowup {
  from {
    transform: translateX(0)
  }
  to {
    transform: translateX(-50%)
  }
}

#home_top {
  max-width: 1400px;
  margin: .5rem auto auto;
  padding: 0 1.5rem;

  .recent-top-post-group {
    overflow: visible;
    border-radius: 12px;
    width: 100%;
    margin-bottom: 0;

    .recent-post-top {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      width: 100%;
      overflow-x: visible;

      .topGroup {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        height: calc(330px + .5rem);
        align-content: space-between;
        width: calc(600px + 1.5rem);

        .recent-post-item {
          margin-right: 0;
          margin-bottom: .5rem;
          display: flex;
          width: 198px;
          flex-direction: column;
          align-items: flex-start;
          margin-left: .5rem;
          background: $cardBackgroundColor;
          border-radius: $cardRadius;
          overflow: hidden;
          min-width: 198px;
          height: 162px;
          max-height: 164px;
          border: 1px solid #42444a;
          transition: .3s;
          position: relative;

          &:hover {
            border: 1px solid $hoverBorderColor;
            box-shadow: 0 8px 12px -3px #0084FF23;
            transform: scale(1.03);
          }

          &:hover .recent-post-top-text {
            left: 0;
          }

          &:hover .recent-post-info a {
            color: $buttonBackgroundColor;
            transition: .3s;
          }

          .recent-post-info {
            padding: .3rem .5rem .3rem .5rem !important;
            transition: .3s;

            .article-title {
              -webkit-line-clamp: 2;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              line-height: 1.5;
              justify-content: center;
              align-items: flex-end;
              align-content: center;
              font-weight: 700;
              font-size: 1rem !important;
              padding: 0 !important;
            }

            a {
              color: #F7F7FA;
              text-decoration: none;
            }
          }

          .post_cover {
            width: 100%;

            a {
              height: 100px;
              overflow: hidden;
              display: flex;
            }

            img {
              transform: scale(1);
              object-fit: cover;
              width: 100%;
              background: #30343f;
              filter: brightness(1);
            }
          }

          .recent-post-top-text {
            position: absolute;
            top: 0;
            left: -40px;
            display: flex;
            z-index: 1;
            background: $buttonBackgroundColor;
            color: #fff;
            padding: 2px 8px;
            font-size: .6rem;
            border-radius: 0 0 12px 0;
            transition: .3s;
            cursor: pointer;
          }
        }
      }

      #bannerGroup {
        width: calc(100% - 600px - 1.5rem);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(328px + .5rem);

        #banner-hover {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: #0084FF;
          color: #fff;
          padding-left: .5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          opacity: 0;
          transition: cubic-bezier(.71, .15, .16, 1.15) .6s;

          .bannerText {
            font-size: 5rem;
            line-height: 4rem;
            font-weight: 700;
            margin-bottom: 18px;
          }

          .banner-right {
            font-size: 5rem;
            opacity: .6;
          }
        }

        .categoryGroup {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          min-width: 200px;

          .categoryItem {
            width: calc(100% / 3 - .33rem);
            height: 100%;
            margin-right: .5rem;
            overflow: hidden;
            transform: scale(1);
            transition: all .8s cubic-bezier(.65, .15, .37, 1.19);
            border-radius: $cardRadius;

            &:hover {
              width: 50%;
            }

            &:last-child {
              margin-right: 0;
            }

            .categoryButton {
              height: 100%;
              width: 100%;
              background: #1d1b26;
              display: inline-block;
              text-align: left;
              line-height: 4em;
              font-weight: 700;
              color: #fff;
              transition: all .8s cubic-bezier(.39, .575, .565, 1);
              transform: scale(1);
              overflow: hidden;
              font-size: 1rem;
              text-decoration: none;

              & svg {
                font-size: 5rem;
                opacity: .4;
                position: absolute;
                right: 0;
                top: 20%;
                transition: .3s;
                width: 100px;
                text-align: center;
              }

              &.remen {
                background: linear-gradient(to right, #f65, #ffbf37);
                background-size: 200%;
              }

              &.bikan {
                background: linear-gradient(to right, #358bff, #15c6ff);
                background-size: 200%;
              }

              &.shiyong {
                background: linear-gradient(to right, #18e7ae, #1eebeb);
                background-size: 200%;
              }

              &:after {
                top: 50px;
                width: 1rem;
                left: 21px;
                height: 2px;
                background: #fff;
                content: "";
                border-radius: 1px;
                position: absolute;
              }

              .categoryButtonText {
                padding-left: 21px;

              }
            }
          }
        }

        #banners {
          display: flex;
          width: 100%;
          height: 100%;
          background: $backgroundColor;
          margin-bottom: .5rem;
          border: 1px solid #42444a;
          border-radius: $cardRadius;
          overflow: hidden;
          position: relative;
          box-shadow: 0 8px 16px -4px #00000050;
          flex-direction: column;
          transition: .3s;

          .tags-group-all {
            display: flex;
            transform: rotate(-30deg);
          }

          .tags-group-wrapper {
            margin-top: 5rem;
            display: flex;
            flex-wrap: nowrap;
            animation: rowup 60s linear infinite;
          }

          .tags-group-icon-pair {
            margin-left: 1rem;
          }

          .tags-group-icon {
            width: 120px;
            height: 120px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 66px;
            font-weight: 700;
            box-shadow: 0 2px 16px -3px rgba(0, 0, 0, .15);
          }

          .tags-group-icon-pair .tags-group-icon:nth-child(even) {
            margin-top: 1rem;
            transform: translate(-60px);
          }

          .tags-group-icon img {
            width: 60%;
          }

          .banners-title {
            top: 2rem;
            left: 1.5rem;
            position: absolute;
            display: flex;
            color: #fff;
            flex-direction: column;

            .banners-title-big {
              font-size: 36px;
              line-height: 1;
              font-weight: 700;
              margin-bottom: 8px;
            }

            .banners-title-big {
              font-size: 36px;
              line-height: 1;
              font-weight: 700;
              margin-bottom: 8px;
            }

            .banners-title-small {
              font-size: 12px;
              line-height: 1;
              color: #a1a2b8;
              margin-top: 8px;
              margin-bottom: .5rem;
            }
          }

          &:hover {
            box-shadow: 0 8px 12px -3px #0084FF23;
            cursor: pointer;
          }

          &:hover #banner-hover {
            opacity: 1;
            padding-left: 2rem;
            background: #4259efc9;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            -webkit-backface-visibility: hidden;
            -webkit-transform-style: preserve-3d;
            transition: .3s;
            background-size: 200%;
          }
        }
      }
    }
  }

  #bbTimeList {
    background: $cardBackgroundColor;
    color: #F7F7FA;
    padding: 0 1rem;
    border-radius: $cardRadius;
    box-shadow: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
    display: flex;
    transition: .3s;
    border: 1px solid #42444a;
    align-items: center;
    height: 50px;
    margin-bottom: .5rem;
    justify-content: space-between;

    &:hover {
      border: 1px solid $hoverBorderColor;
      box-shadow: 0 8px 12px -3px #0084FF23;
    }

    .bb_title {
      font-family: "Lobster", serif;
      font-weight: 800;
      font-size: 1rem;
      line-height: 22px;
      margin-right: 1rem;
      cursor: pointer;
      width: 100%;

      span {
        transition: .3s;

        &:hover {
          opacity: .8;
          color: #0084FF;
        }
      }
    }

    .more {
      font-family: "Lobster", serif;
      font-weight: 800;
      font-size: 1rem;
      width: 100%;
      display: flex;
      justify-content: end;

      svg {
        transition: .3s;
        cursor: pointer;

        &:hover {
          opacity: .8;
          color: #0084FF;
        }
      }
    }

    #bb-talk {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 100%;

      .li-style {
        display: flex;
        align-items: center;
        width: auto;
        max-width: 100%;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 700;
        margin: auto;
        cursor: pointer;
        white-space: nowrap;
        transition: .3s;

        &:hover {
          opacity: .8;
          color: #0084FF;
        }
      }
    }
  }
}
</style>