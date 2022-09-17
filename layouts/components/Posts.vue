<template>
  <div class="recent-posts" id="recent-posts">
    <div id="category-bar">
      <div class="category-bar-items">
        <div class="category-bar-item select">
          <router-link to="/">首页</router-link>
        </div>
        <div class="category-bar-item" v-for="item in this.$site.themeConfig.category">
          <router-link :to="`/categories/${item.link}`">{{ item.text }}</router-link>
        </div>
      </div>
      <a class="category-bar-more" href="/categories/">更多</a>
    </div>
    <div v-for="(item,idx) in $pagination.pages" :key="idx"
         :class="`recent-post-item ${idx === 0 ? 'lastestpost-item' : ''}`" @click="goPage(item.path)">
      <div class="post_cover right_radius">
        <router-link :to="item.path" :title="item.frontmatter.title">
          <img class="post_bg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
               :data-src="item.frontmatter.cover" :alt="item.frontmatter.title">
        </router-link>
      </div>
      <router-link class="article-meta__categories" :to="`/categories/${item.frontmatter.category}/`">
        {{ getCategoryText(item.frontmatter.category) }}
      </router-link>
      <div class="recent-post-info">
        <div class="recent-post-info-top">
          <span class="lastestpost" v-if="!idx">最新文章</span>
          <router-link class="article-title" :to="item.path">
            {{ item.frontmatter.title }}
          </router-link>
        </div>
        <div class="article-meta-wrap">
          <span class="article-meta tags">
            <router-link v-for="items in item.frontmatter.tags" class="article-meta__tags" :to="`/tags/${items}/`">
              <span class="tags-punctuation"># </span>{{ items }}
            </router-link>
          </span>
          <span class="post-meta-date">{{ item.timeAgo }}</span>
        </div>
      </div>
    </div>
    <nav id="pagination" v-if="$pagination.length > 1">
      <Pagination/>
    </nav>
  </div>
</template>

<script>
import {Pagination} from "@vuepress/plugin-blog/lib/client/components";

export default {
  components: {Pagination},
  methods: {
    goPage(path) {
      this.$router.push({
        path
      })
    },
    getCategoryText(link) {
      return this.$site.themeConfig.category.filter(e => e.link === link)[0]['text']
    }
  }
}
</script>

<style lang="stylus">
#pagination {
  overflow: visible;
  margin-top: .8rem;
  width: 100%;

  .pagination {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 0;
    border-radius: 0;

    li {
      a {
        width: 2.3rem;
        background: #1d1b26;
        height: 2.3rem;
        line-height: calc(2rem - 2px);
        border-radius: $cardRadius !important;
        margin: 0 .3rem;
        box-shadow: 0 8px 16px -4px #00000050;
        border: 1px solid #42444a;
        transition: .3s;
        text-align: center;
        color: #fff;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          cursor: pointer;
          transform: scale(1.03);
          border: 1px solid #0084FF;
          background: transparent !important;
          color: #fff !important;
        }

        &.active {
          background: $buttonBackgroundColor !important;
          border: 1px solid #0084FF;
          box-shadow: 0 8px 12px -3px #0084FF23;
        }


      }

      &.disabled {
        display: none;
      }

      &:first-child a {
        width: 5rem;
        height: 2.2rem;
        border-radius: $cardRadius !important;
        background: #1d1b26;
        box-shadow: 0 8px 16px -4px #00000050;
        position: absolute;
        border: 1px solid #42444a;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        left: 0;
        transition: .3s;
        text-align: center;
        font-family: Icon;

        &:after {
          margin-left: 3px;
          font-size: 20px;
          content "\E90A"
        }
      }

      &:last-child a {
        width: 5rem;
        height: 2.2rem;
        border-radius: $cardRadius !important;
        background: #1d1b26;
        box-shadow: 0 8px 16px -4px #00000050;
        position: absolute;
        border: 1px solid #42444a;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        right: 0;
        transition: .3s;
        text-align: center;
        font-family: Icon;

        &:after {
          margin-left: 3px;
          font-size: 20px;
          content "\E909"
        }

      }

      &:first-child a:hover, &:last-child a:hover {
        cursor: pointer;
        transform: scale(1);
        color: #0084FF !important;
        border: 1px solid $hoverBorderColor;
        font-size: 20px;
      }

      &.active a:hover {
        background: #0084FF !important;
      }

      &.active a {
        background: #0084FF;
        border: 1px solid #0084FF;
        box-shadow: 0 8px 12px -3px #0084FF23;
      }
    }
  }
}
</style>

<style lang="stylus" scoped>
#recent-posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  width: 80%;

  .recent-post-item {
    width: calc(100% / 2 - .5rem);
    margin-top: .25rem;
    margin-bottom: .75rem;
    box-shadow: 0 8px 16px -4px #00000050;
    position: relative;
    overflow: hidden;
    flex-direction: column;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-align: center;
    align-items: center;
    transition: all .3s ease 0s;
    height: fit-content;
    background: $cardBackgroundColor;
    border-radius: $cardRadius;
    cursor: pointer;
    border: 1px solid #42444a;

    &:hover {
      border: 1px solid $hoverBorderColor;

      .post_cover img.post_bg {
        transform: scale(1.03);
        transition: .3s ease-in-out;
        filter: brightness(.85);
      }

      .article-title {
        color: $buttonBackgroundColor !important;
      }
    }

    .recent-post-info {
      height: 154px;
      width: 100%;
      cursor: pointer;
      position: relative;
      display: inline-block;
      overflow: hidden;
      padding: 0;

      .recent-post-info-top {
        position: absolute;
        top: 30px;
        transition: .3s;
        width: 100%;
        padding: 0 40px;

        .article-title {
          display: inline-block;
          white-space: nowrap;
          font-size: 1.3rem;
          text-overflow: ellipsis;
          line-height: 1.4;
          margin-top: 8px;
          font-weight: 700;
          color: #F7F7FA;
          margin-bottom: 0;
          transition: .3s;
          overflow: hidden;
          text-decoration: none;
          width: 100%;
        }

        .lastestpost {
          display: flex;
          color: #f2b94b;
          font-size: .5rem;
        }
      }

      .article-meta-wrap {
        bottom: 30px;
        position: absolute;
        transition: .3s;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        width: 100%;
        left: 0;
        padding: 0 40px;
        white-space: nowrap;

        .article-meta {
          margin: 0 8px 0 0;
          white-space: nowrap;
          overflow: hidden;
          display: inline-block;
          text-overflow: ellipsis;

          a {
            color: #F7F7FA;
            margin-right: 4px;
            padding: 0 .2rem;
            text-decoration: none;
            font-size: 14px;

            .tags-punctuation {
              opacity: .4;
            }
          }
        }

        .post-meta-date {
          right: 0;
          text-align: right;
          opacity: .6;
          color: #fff;
          font-size: 14px;
        }
      }
    }

    .article-meta__categories {
      position: absolute;
      padding: 5px 10px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: $cardRadius;
      margin-left: 0;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      top: 8px;
      left: 8px;
      backdrop-filter: saturate(180%) blur(20px);
      text-decoration: none;
      transition: all .3s;

      &:hover {
        background: #0084FF;
        color: #fff;
        box-shadow: 0 8px 12px -3px #0084FF23;
      }
    }

    .post_cover {
      border-top-left-radius: $cardRadius;
      border-top-right-radius: $cardRadius;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      width: 100%;
      display: flex;
      transition: 1s !important;
      height: 225px;
      overflow: hidden;
      -webkit-mask-image: -webkit-radial-gradient(#fff, #000);

      a {
        min-height: 100%;
        min-width: 100%;
        color: #F7F7FA;

        .post_bg {
          width: 100%;
          height: 100%;
          -webkit-transition: all .6s;
          -moz-transition: all .6s;
          -o-transition: all .6s;
          -ms-transition: all .6s;
          transition: all .6s;
          object-fit: cover;
        }
      }
    }
  }

  #category-bar {
    margin-bottom: .5rem;
    box-shadow: 0 8px 16px -4px #00000050;
    padding: .8rem 1rem .8rem .8rem;
    background: $cardBackgroundColor;
    border-radius: $cardRadius;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    border: 1px solid #42444a;
    transition: .3s;
    width: 100%;
    justify-content: space-between;

    &:hover {
      border: 1px solid $hoverBorderColor;
      box-shadow: 0 8px 12px -3px #0084FF23;
    }

    .category-bar-items {
      white-space: nowrap;
      display: flex;

      .category-bar-item {
        &.select a, &:hover a {
          background: $buttonBackgroundColor;
          color: #fff;
          border-radius: $cardRadius;
        }

        a {
          padding: .3rem 1.2rem;
          margin: 0 12px;
          font-weight: 700;
          border-radius: $cardRadius;
          color: #F7F7FA;
          text-decoration: none;
          transition: .2s;

          &:first-child {
            margin-left: 0;
          }
        }
      }
    }

    .category-bar-more {
      margin-left: 1rem;
      font-weight: 700;
      color: #F7F7FA;
      text-decoration: none;
      display: flex;
      align-items: center;
      transition: .2s;

      &:hover {
        color: #0084FF;
      }
    }
  }
}
</style>