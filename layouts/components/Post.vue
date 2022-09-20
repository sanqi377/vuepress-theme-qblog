<template>
  <div class="single_wrap">
    <div class="blog_header">
      <h2 class="entry-title">{{ postInfo.title }}</h2>
      <ul>
        <div class="header_meta">
              <span class="single_time">
                <i class="ri-time-line"></i>
                <time itemprop="datePublished" :datetime="resolvedDate()">  {{ resolvedDate() }}</time>
              </span>
          <span class="post_views"><i class="ri-eye-line"></i>25</span>
        </div>
        <router-link class="category" :to="`/categories/${category.link}/`">{{ category.text }}</router-link>
      </ul>
    </div>
    <div class="single-inner">
      <div class="single-content">
        <Content/>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'

dayjs.extend(dayjsPluginUTC)

export default {
  data() {
    return {
      postInfo: {},
      category: {}
    }
  },
  mounted() {
    this.postInfo = this.$page.frontmatter
    this.category = this.$site.themeConfig.category.filter(el => el.link === this.$page.frontmatter.category)[0]
  },
  methods: {
    resolvedDate() {
      return dayjs.utc(this.$page.frontmatter.date).format('YYYY-MM-DD')
    },
  }
}

</script>

<style lang="stylus" scoped>
.index_banner {
  overflow: hidden;

  .cover-div {
    max-width: 100%;
    max-height: 100%;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    filter: brightness(90%);

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }
}

.single_wrap {
  background: var(--light-medium-bg);
  padding: 40px;

  .single-inner {
    padding: 20px 0;
    border-top: 1px solid var(--light-border);
  }

  .blog_header ul {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    margin-bottom: 25px;
    font-size: 13px;

    .category {
      background: var(--light-icon);
      color: #7cad95;
      border-radius: 5px;
      margin-left: 3px;
      padding: 5px 8px;
    }

    .header_meta {
      display: flex;
      align-content: center;
      align-items: center;

      i {
        margin-right: 3px;
      }

      .post_views {
        margin-left: 10px;
        display: flex;
        align-items: center;
        color: var(--text-dark);
      }

      .single_time {
        display: flex;
        align-items: center;
        color: var(--text-dark);
      }
    }
  }
}
</style>