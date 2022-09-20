<template>
  <div class="link-list">
    <div class="single-inner">
      <div class="single-content">
        <Content/>
      </div>
    </div>
    <div class="normal_list">
      <div class="links-item" v-for="(item,idx) in $page.frontmatter.links" :key="idx">
        <div class="content">
          <a :href="item.url" target="_blank">
            <div class="links-img" :style="`background-image: url(${item.avatar})`"></div>
            <div class="links-title">{{ item.title }}</div>
            <div class="links-desc">{{ item.desc }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.link-list {
  padding: 40px

  .normal_list {
    display: flex;
    margin: 0 -8px;
    margin-top: 40px;
    flex-wrap: wrap;

    .links-item {
      width: 25%;

      .content {
        margin: 8px;
        padding: 15px;
        background: var(--light-bg);
        border-radius: 8px;

        a {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-weight: 100;
          padding: 0;
          text-decoration: none;

          .links-img {
            width: 120px;
            height: 120px;
            margin: 24px 0;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            border-radius: 100%;
          }

          .links-title {
            font-size: 20px;
            line-height: 48px;
            font-weight: 700;
            color: var(--light-color);
          }

          .links-desc {
            font-size: 12px;
            line-height: 20px;
            font-weight: 700;
            color: var(--text-color);
          }
        }
      }
    }
  }
}
</style>