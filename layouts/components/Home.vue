<template>
  <div class="normal_list">
    <div class="posts_cat_nav">
      <ul>
        <li>
          <router-link to="/">全部</router-link>
        </li>
        <li v-for="item in $site.themeConfig.category">
          <router-link :to="`/categories/${item.link}`">
            {{ item.text }}
          </router-link>
        </li>
      </ul>
    </div>
    <div id="post_item">
      <div class="p_item" v-for="(item,idx) in post" :key="idx">
        <div class="normal_card_content">
          <div class="feature" v-if="!$site.themeConfig.homeCoverHide">
            <router-link :to="item.path">
              <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                   :data-src="item.frontmatter.cover" alt="cover">
            </router-link>
          </div>
          <div class="card_right">
            <div class="entry-content">
              <h2 class="entry-title">
                <router-link :to="item.path">
                  {{ item.frontmatter.title }}
                </router-link>
              </h2>
              <div class="entry_meta">
                <span class="nickname">@Sanqi</span> -
                <time>{{ item.timeAgo }}</time>
              </div>
              <p>{{ item.dsc }}</p>
            </div>
            <div class="entry-footer">
              <div class="post_footer_meta">
                <div class="left">
<!--                    <span class="comnum">-->
<!--                      <i class="ri-chat-4-line"></i>-->
<!--                      <small>2</small>-->
<!--                    </span>-->
                </div>
                <div class="right">
                  <div class="normal_cat" v-for="e in item.frontmatter.tags"># {{ e }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="loading" v-show="this.pageLoading">
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <circle fill="none" stroke="#8c92b3" cx="15" cy="15" r="14"></circle>
        </svg>
      </div>
      <div class="isBottom" v-show="this.pageIsBottom">人家都被你看光啦~</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: [], // 文章列表
      isGetPost: true, // 能否请求下一页文章
      pageSize: 0, // 请求文章的页数
      pageCount: 10, // 请求文章的数量
      pageIsBottom: false, // 文章是否触底
      pageLoading: false, // 是否正在请求中
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    $route: {
      handler(to, from) {
        this.post = []
        this.isGetPost = true
        this.pageSize = 0
        this.pageIsBottom = false
        this.pageLoading = false
        this.init()
      },
    }
  },
  methods: {
    init() {
      this.getPost()
      document.querySelector('.page_main').addEventListener("scroll", this.onScroll)
    },
    onScroll() {
      if (!['home', 'categoryItem'].includes(this.$page.pageType)) document.querySelector('.page_main').removeEventListener("scroll", this.onScroll)
      const scrollTop = document.querySelector('.page_main').scrollTop
      const windowHeight = document.querySelector('.page_main').clientHeight || document.querySelector('.page_main').clientHeight
      const scrollHeight = document.querySelector('.page_main').scrollHeight || document.querySelector('.page_main').scrollHeight
      if (scrollTop + windowHeight + 20 > scrollHeight && this.isGetPost) {
        ++this.pageSize
        this.getPost(this.pageSize)
      }
    },
    getPost(pageSize) {
      const _this = this
      if (pageSize) {
        _this.pageLoading = true
        _this.isGetPost = false
        setTimeout(() => {
          if (_this.pageSize + 1 === _this.$pagination.length) {
            _this.pageIsBottom = true
          } else {
            _this.isGetPost = true
          }
          if (_this.post.length >= 10) {
            _this.post = [..._this.post, ..._this.$pagination['_matchedPages'].slice(_this.$pagination['_paginationPages'][_this.pageSize]['interval'][0], _this.$pagination['_paginationPages'][_this.pageSize]['interval'][1] + 1)]
            console.log(`下拉加载：总计 ${_this.post.length} 条数据，第 ${_this.pageSize + 1} 页，共 ${_this.$pagination['_matchedPages'].slice(_this.$pagination['_paginationPages'][_this.pageSize]['interval'][0], _this.$pagination['_paginationPages'][_this.pageSize]['interval'][1]).length} 条数据，${_this.pageIsBottom ? '已经加载完' : '未加载完'}`)
            _this.pageLoading = false
          } else {
            console.log('文章不足10篇')
            _this.pageLoading = false
            _this.isGetPost = false
            _this.pageIsBottom = true
          }
        }, 800)
      } else {
        _this.post = this.$pagination['_matchedPages'].slice(this.$pagination['_paginationPages'][this.pageSize]['interval'][0], this.$pagination['_paginationPages'][this.pageSize]['interval'][1] + 1)
      }
    }
  }
}
</script>

<style lang="stylus">
.page_main {
  z-index: 98;
  background: var(--light-medium-bg);
  border-radius: 12px;
  width: 75%;
  height: 100%;
  overflow: auto;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &::-webkit-scrollbar {
    display: none;
  }

  header#masthead {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 9999;

    .top_bar_scroll {
      backdrop-filter: blur(0.5rem) !important;
    }

    .top_bar {
      height: 72px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      background: #e5ede8;
      border-top-right-radius: 12px;

      .top_tool {
        position: relative;

        i {
          font-size: 18px;
          color: #000;
          cursor: pointer;
        }

        a {
          padding: 10px;
        }
      }

      .top_left {
        margin-left: 15px;
      }

      .top_right {
        margin-right: 15px;
      }

      .top_left, .top_right {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: nowrap;
        align-items: center;
      }
    }
  }

  .index_banner {
    height: 200px;
    position: relative;
    background-repeat: no-repeat;
    background: var(--light-medium-bg);
    background-size: cover;
    background-position: center;
    z-index: -1;

    .user_info {
      position: absolute;
      bottom: 10%;
      right: 40px;

      .avatar {
        width: 58px;
        height: 58px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
      }

      .top {
        display: flex;
        align-items: center;

        .left {
          display: flex;
          flex-direction: column;
          align-content: flex-end;
          align-items: flex-end;
          padding-right: 10px;

          .name {
            color: #fff;
            font-weight: 600;
          }

          .des {
            font-size: 13px;
            text-align: right;
            color: #d6d6d6;
          }
        }
      }
    }
  }
}

.entry-title {
  font-size: 18px;
  margin-bottom: 5px;
  color: #32395c;

  a {
    color: #32395c;
  }
}
</style>

<style lang="stylus" scoped>
.isBottom {
  color: var(--text-color);
  font-size: 14px;
  text-align: center;
  transform: translateY(20px);
}

.normal_list {
  background: var(--light-medium-bg);

  #post_item {
    padding: 40px;
    padding-top: 0;

    .p_item {
      padding: 40px 0;
      border-bottom: 1px solid var(--light-bg);

      .normal_card_content {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;

        .card_right {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-content: flex-start;
          width: 100%;

          .entry-footer {
            margin-top: 10px;
            padding: 8px 10px;
            border-radius: 8px;
            background: var(--light-bg);

            .post_footer_meta {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .right, .left {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                flex-wrap: nowrap;

                .normal_cat {
                  font-size: 12px;
                  padding: 3px 8px;
                  border-radius: 3px;
                  background: #accab5;
                  color: #fff;
                  margin-right: 8px;

                  &:last-child {
                    margin-right: 0;
                  }
                }

                .comnum {
                  padding: 3px 8px;
                  border-radius: 3px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  align-content: center;
                  flex-direction: row;
                  flex-wrap: nowrap;
                  color: #444444;
                  font-size: 12px;

                  i {
                    color: #819286;
                    position: relative;
                    margin-right: 3px;
                    font-size: 13px;
                  }
                }
              }
            }
          }

          .entry-content {
            margin: 0;
            margin-top: 5px;

            p {
              margin: 8px 0;
              margin-bottom: 12px;
              color: #606268;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            .entry_meta {
              font-size: 13px;
              color: #89a396;
            }
          }
        }

        .feature {
          width: 140px;
          min-width: 140px;
          height: 180px;
          margin-right: 20px;
          overflow: hidden;
          border-radius: 12px;

          img {
            max-width: 100%;
            height: 100%;
            object-fit: revert;
            border-radius: 12px;
            transition: all .3s;
            -moz-box-shadow: 0px 3px 14px 1px #d0dada;
            -webkit-box-shadow: 0px 3px 14px 1px #d0dada;
            box-shadow: 0px 3px 14px 1px #d0dadab5;

            &:hover {
              transform: scale(1.06);
              transition: all .3s;
            }
          }
        }
      }
    }
  }

  .posts_cat_nav {
    padding: 25px 35px;
    border-bottom: 1px solid var(--light-bg);

    ul {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      padding: 0;
      margin: 0;

      li {
        list-style: none;
        flex: none;

        a {
          padding: 5px 10px;
          margin: 0 4px;
          border-radius: 5px;
          font-size: 12px;
          display: flex;
          align-items: center;
          background: #e1e9e5;
          color: #7aa1a1;

          &.router-link-exact-active {
            background: var(--light-ac-btn);
            color: #fff;
          }
        }
      }
    }
  }
}
</style>