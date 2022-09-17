<template>
  <div>
    <!--  文章头部 start -->
    <div class="cover-div loaded">
      <img id="post-cover" :src="postInfo.cover" alt="cover" class="entered loading">
    </div>
    <div id="post-info">
      <div id="post-firstinfo">
        <div class="meta-firstline">
          <a v-show="postInfo.original" class="post-meta-original" title="该文章为原创文章，注意版权协议">原创</a>
          <span class="post-meta-categories" :style="`${!postInfo.original ? 'margin-left:0' : ''}`">
            <a class="post-meta-categories"
               :href="`/categories/${category.link}/`"># {{ category.text }}</a>
          </span>
          <div class="tag_share">
            <div class="post-meta__tag-list">
              <a class="post-meta__tags" v-for="item in postInfo.tags" :href="`/tags/${item}/`">#{{ item }}</a>
            </div>
          </div>
        </div>
      </div>
      <h1 class="post-title">{{ postInfo.title }}</h1>
      <div id="post-meta">
        <div class="meta-secondline">
          <span class="post-meta-wordcount" :title="`该文章有${postInfo.wordCount}个字，约${postInfo.readTime}分钟读完`">
            <font-awesome-icon class="post-meta-icon" :icon="['fas', 'file-word']"/>
            <span class="word-count">{{ $page.wordCount }}</span>
            <span class="post-meta-separator"></span>
            <font-awesome-icon class="post-meta-icon" :icon="['fas', 'stopwatch']"/>
            <span>{{ $page.readingTime }}分钟</span>
          </span>
          <span class="post-meta-date">
            <font-awesome-icon class="post-meta-icon" :icon="['fas', 'calendar']"/>
            <time :datetime="resolvedDate()" :title="resolvedDate()">{{ resolvedDate() }}</time>
          </span>
          <span class="post-meta-wechat" title="该文章在博客首发">
            <font-awesome-icon class="post-meta-icon" :icon="['fas', 'compass']"/>博客独享
          </span>
          <span class="post-meta-position" :title="`作者IP属地为${postInfo.location}`">
            <font-awesome-icon class="post-meta-icon" :icon="['fas', 'location-dot']"/>{{ postInfo.location }}
          </span>
          <span :id="pagePath" class="post-meta-pv leancloud_visitors">
            <font-awesome-icon class="post-meta-icon" :icon="['fab', 'hotjar']"/>
            <span id="busuanzi_value_page_pv" class="leancloud-visitors-count">0</span>
          </span>
          <span class="post-meta-commentcount" title="评论数">
            <font-awesome-icon class="post-meta-icon" :icon="['fas', 'message']"/>
            <a href="#vcomments" data-pjax-state=""><span id="twikoo-count">{{ commentCount }}</span></a>
          </span>
        </div>
      </div>
    </div>
    <!--  文章头部 end -->
  </div>
</template>

<script>
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'

dayjs.extend(dayjsPluginUTC)

export default {
  data() {
    return {
      pagePath: '',
      commentCount: 0
    }
  },
  computed: {
    postInfo: function () {
      return this.$page.frontmatter
    },
    category: function () {
      return this.$site.themeConfig.category.filter(el => el.link === this.$page.frontmatter.category)[0]
    }
  },
  mounted() {
    this.pagePath = window.location.pathname
    this.getCommentCount()
  },
  methods: {
    getCommentCount() {
      setTimeout(() => {
        this.commentCount = document.querySelector(".vnum") ? document.querySelector(".vnum").textContent : 0
      }, 1000)
    },
    resolvedDate() {
      return dayjs.utc(this.$page.frontmatter.date).format('YYYY-MM-DD')
    },
  }
}
</script>

<style lang="stylus" scoped>
.cover-div {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  transform: rotate(10deg) translateY(-10%) scale(2);
  filter: blur(10px);

  .loaded {
    display: block;
  }

  #post-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-width: 50vw;
    min-height: 20rem;
    opacity: .8;
    filter: brightness(1);
  }
}

#post-info {
  padding: 1rem 2rem;
  height: calc(100% + 30px);
  top: 0;
  left 50%;
  transform translateX(-50%)
  display: flex;
  justify-content: center;
  position: absolute;
  margin: 0 auto;
  z-index: 10;
  color: #fff;
  max-width: 1400px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  text-align: center;

  .post-title {
    color: #fff;
    font-weight: 700;
    font-size: 3rem;
    line-height: 1.2;
    text-align: left;
    margin: 2rem 0;
    -webkit-line-clamp: 2;
    padding: 0;
  }

  #post-meta {
    color: #fff;
    margin-top: .4rem;
    height: 30px;
    transition: .3s;
    opacity: .6;

    .meta-secondline {
      display: flex !important;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      text-align: left;

      .post-meta-separator {
        margin: 0 .4rem;
      }

      .post-meta-date, .post-meta-wechat, .post-meta-position, .post-meta-pv {
        margin-right: .8rem;
      }

      .post-meta-icon {
        margin-right: .4rem;
        text-align: center;
        width: 1.25em;
      }

      span {
        &:first-child {
          display: inline;
          margin-right: .8rem;
        }

        a {
          color: #fff;
          text-decoration: none;
        }

        .post-meta-wordcount {
          opacity: .6;
        }
      }
    }
  }

  #post-firstinfo {
    text-align: left;
    display: flex;
    white-space: nowrap;

    .meta-firstline {
      display: flex;
      align-items: center;
    }

    a {
      text-decoration: none;
    }

    a.post-meta-original {
      background: rgba(255, 255, 255, 0.2) !important;
      color: #fff !important;
      padding: 0 .8rem;
      font-size: 1rem;
      margin: auto;
      border-radius: $cardRadius;
      font-weight: 700;
      height: 32px;
      line-height: 32px;
      transition: all .2s;
      cursor: default;

      &:hover {
        color: #7d7d5d !important;
        background: #fff !important;
      }
    }

    span.post-meta-categories {
      background-color: rgba(255, 255, 255, 0.2);
      padding: 0 .8rem;
      border-radius: $cardRadius;
      line-height: 32px;
      height: 32px;
      transition: .3s;
      margin-left: 8px;

      &:hover {
        background: #fff !important;

        a {
          color: #7d7d5d !important;
        }
      }

      a {
        color: #fff;
        text-decoration: none;
        font-weight: 800;
        transition: .3s;
      }
    }

    .tag_share {
      margin-left: 1rem;

      .post-meta__tags {
        color: #fff;
        opacity: .4;
        margin-right: 1rem;

        &:hover {
          opacity: 1;
          transition: all .2s;
        }
      }
    }
  }
}
</style>