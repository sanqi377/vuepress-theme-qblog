<template>
  <div class="aside-content">
    <div class="card-widget">
      <div class="card-content">
        <div class="card-info-avatar">
          <div class="author-info__sahib">👋 {{ getTimeState }}！我是</div>
          <div class="author-info__name">San' qi</div>
          <div class="author-info__description">
            这有关于<b>前后端开发、代码片段</b>的相关的问题和经验分享。
          </div>
          <div class="author-info__description2">相信你可以在这里找到对你有用的<b>知识</b>和<b>教程</b>。</div>
        </div>
        <div class="banner-button-group">
          <a class="banner-button">
            <font-awesome-icon class="post-meta-icon" :icon="['fas', 'circle-plus']"/>
            <span class="banner-button-text">了解更多</span>
          </a>
        </div>
        <div class="card-info-social-icons is-center">
          <a class="social-icon" href="https://github.com/sanqi377" rel="external nofollow" target="_blank"
             title="Github">
            <font-awesome-icon class="post-meta-icon" :icon="['fab', 'github']"/>
          </a>
        </div>
      </div>
    </div>
    <div class="sticky_layout">
      <div class="card-widget">
        <div class="card-tag-cloud">
          <router-link v-for="item in tags" :to="item.path">{{ item.name }}<sup>{{ item.pages.length }}</sup>
          </router-link>
        </div>
        <hr>
        <div class="card-archive-list">
          <div class="card-archive-list-item">
            <a class="card-archive-list-link" href="/archives/2022/" v-for="item in archiveList">
              <span class="card-archive-list-date">{{ item.year }}</span>
              <div class="card-archive-list-count-group">
                <span class="card-archive-list-count">{{ item.total }}</span>
                <span class="card-archive-list-count-unit">篇</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    tags() {
      return this.$tag.list
    },
    archiveList() {
      let res = {};
      let tmp = [];
      let list = this.$site.pages.filter((item) => {
        return item.pid === "post";
      });
      list.map((item) => {
        const date = new Date(item.frontmatter.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = `${date.getDate()}`;
        res[year] || (res[year] = []);
        item.date = `${`${month + 1}`.padStart(2, 0)}-${day.padStart(2, 0)}`;
        res[year].push(item);
      });
      for (let [key, item] of Object.entries(res)) {
        tmp.push({
          year: +key,
          total: item.length,
        });
      }
      tmp.sort((a, b) => {
        return b.year - a.year;
      });
      return tmp;
    },
    getTimeState() {
      // 获取当前时间
      let timeNow = new Date();
      // 获取当前小时
      let hours = timeNow.getHours();
      // 设置默认文字
      let text = ``;
      // 判断当前时间段
      if (hours >= 0 && hours <= 10) {
        text = `早上好`;
      } else if (hours > 10 && hours <= 14) {
        text = `中午好`;
      } else if (hours > 14 && hours <= 18) {
        text = `下午好`;
      } else if (hours > 18 && hours <= 24) {
        text = `晚上好`;
      }
      return text;
    }
  }
}
</script>

<style lang="stylus" scoped>
.aside-content {
  padding-left: 1rem;
  width: 300px;

  .card-widget {
    background: linear-gradient(-45deg, #0084FF, #031764, #150136, #67044d);
    background-size: 400%;
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, .05);
    animation: gradient 15s ease infinite;
    position: relative;
    border: 1px solid #42444a;
    border-radius: $cardRadius;

    &:first-child {
      margin-top: 0;
      transition: .3s;
    }

    .card-content {
      padding: 1.6rem 1.4rem;
      height: 280px;

      .card-info-avatar {
        text-align: center;

        .author-info__sahib {
          text-align: left;
          color: #fff;
          font-size: 12px;
        }

        .author-info__name {
          text-align: left;
          font-weight: 700;
          color: #fff;
          font-size: 28px;
          line-height: 1.1;
          margin-top: .5rem;
          margin-bottom: 1rem;
          font-family: "Lobster", serif;
        }

        b {
          color: #fff;
          opacity: 1;
        }

        .author-info__description {
          line-height: 1.38;
          margin: .3rem 0;
          text-align: justify;
          color: rgba(255, 255, 255, .8);
          margin-bottom: 15px;
        }

        .author-info__description2 {
          line-height: 1.38;
          margin: .3rem 0;
          text-align: justify;
          width: 100%;
          z-index: 2;
          color: rgba(255, 255, 255, .8);
        }
      }
    }

    .banner-button-group {
      position: absolute;
      right: 1rem;
      bottom: 1rem;
      display: flex;

      .banner-button {
        padding: 9px 15px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: $cardRadius;
        color: #fff;
        display: flex;
        align-items: center;
        z-index: 1;
        transition: .2s;
        cursor: pointer;

        &:hover {
          background: #fff;
          color: #000;

          svg {
            color: #000;
          }
        }

        svg {

          margin-right: 8px;
          font-size: 1.2rem;
        }
      }
    }

    .card-info-social-icons {
      margin: 0;
      padding-top: 10px;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      cursor: pointer;
      position: absolute;
      bottom: 1rem;
      left: 1rem;

      .social-icon {
        margin: 0;
        margin-right: 8px;
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.4em;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.2);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        transition: all .3s;
        border-radius: 32px;
        justify-content: center;

        &:hover {
          background: #30343f;

          svg {

            color: #fff;
          }
        }

        svg {
          color: #fff;
          width: 20px;
          height: 20px;
          padding: 8px 8px;
        }
      }
    }
  }

  .sticky_layout {
    top: calc(10px + .5rem);
    margin-top: 1rem;
    position: sticky;
    display: flex;
    flex-direction: column;
    -webkit-box-orient: vertical;

    .card-widget {
      margin-top: 0;
      border-radius: $cardRadius;
      transition: .3s;
      box-shadow: 0 8px 16px -4px #00000050;
      background: $cardBackgroundColor;
      border: 1px solid #42444a;
      position: relative;
      overflow: hidden;
      padding: 1rem 1.2rem;

      .card-tag-cloud {
        padding: 0;

        a {
          color: #F7F7FA !important;
          font-size: 1em;
          border-radius: 8px;
          display: inline-block;
          padding: .5rem .3rem;
          text-decoration: none;
          transition: .3s;
          margin: .2rem;

          &:hover {
            transform: scale(1.03);
            background: #0084FF;
            color: #fff !important;
            box-shadow: 0 8px 12px -3px #0084FF23;
          }

          sup {
            opacity: .4;
            margin-left: 2px;
            top: -.5em;
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline;
          }
        }
      }
    }

    hr {
      display: flex;
      position: relative;
      margin: 1rem 0;
      border: 1px dashed #0084FF23;
    }

    .card-archive-list {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      list-style: none;

      .card-archive-list-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        a {
          border-radius: $cardRadius;
          margin: 4px 0;
          display: flex;
          flex-direction: column;
          align-content: space-between;
          border: 1px solid #42444a;
          text-decoration: none;
          padding: .5rem .8rem;
          color: rgba(255, 255, 255, 0.9);
          width: 48%;
          transition: .2s;

          &:hover {
            transform: scale(1.03);
            color: #fff;
            background-color: #0084FF;
            box-shadow: 0 8px 12px -3px #0084FF23;
            border-radius: $cardRadius;
            border: 1px solid #0084FF;
          }

          .card-archive-list-count-group {
            display: flex;
            flex-direction: row;
            align-items: baseline;
          }

          span {
            display: inline-block;
            vertical-align: bottom;


            &.card-archive-list-count {
              width: auto;
              text-align: left;
              font-size: 1.6rem;
              line-height: .9;
              font-weight: 700;
              margin-right: 5px;
            }

            &.card-archive-list-count-unit {
              width: auto;
              text-align: left;
              font-size: 14px;
              font-weight: 700;
            }

            &:first-child {
              width: auto;
            }

            &.card-archive-list-date {
              font-size: 14px;
              opacity: .6;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
}
</style>