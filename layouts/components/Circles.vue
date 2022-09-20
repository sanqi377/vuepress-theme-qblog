<template>
  <div class="circle_list single-content">
    <div class="content" v-for="item in list" :key="item.id">
      <div class="inner">
        <div class="list_user_meta">
          <div class="avatar"><img :src="item.avatar"></div>
          <div class="name">
            {{ item.username }}
            <time>{{ item.date }}</time>
          </div>
        </div>
        <div class="circle_content">
          <div class="entry-content">
            <div class="t_content"><p>{{ item.content }}</p></div>
            <div class="img_list">
              <img src="https://sady-1307006175.cos.ap-nanjing.myqcloud.com/2022/09/20220919163155322.jpg">
            </div>
          </div>
          <span class="ip_loca"><i class="ri-map-pin-2-line"></i>甘肃省 · 天水市</span>
          <div class="entry-footer">
            <div class="post_footer_meta">
              <div class="left">
                <a class="up_like " data-action="up" data-id="930">
                  <i class="ri-heart-2-line"></i>
                  <span>3</span>
                </a></div>
              <div class="right">
                <span class="comnum show_comment" pid="930"><i class="ri-message-3-line"></i>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 0,
          avatar: 'https://www.qblog.cc/logo.png',
          username: '叁柒',
          date: '1分钟前',
          content: '测试一条？'
        },
        {
          id: 1,
          avatar: 'https://www.qblog.cc/logo.png',
          username: '叁柒',
          date: '5分钟前',
          content: '哈哈哈哈哈哈'
        },
        {
          id: 2,
          avatar: 'https://www.qblog.cc/logo.png',
          username: '叁柒',
          date: '5分钟前',
          content: '哦吼哦吼'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.circle_list {
  padding: 40px;
  padding-top: 0;

  .content {
    padding: 40px 0;
    border-bottom: 1px solid var(--dark-border);

    .inner {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: column;

      .list_user_meta {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;

        .avatar {
          width: 48px;
          height: 48px;
          min-width: 48px;
          margin-right: 10px;
        }

        .name {
          display: flex;
          flex-direction: column;
          color: var(--dark-color);

          time {
            font-size: 13px;
            color: #aab0bf;
          }
        }
      }

      .circle_content {
        padding-left: 58px;

        .entry-content {
          margin-top: 5px;

          .t_content {
            display: block;
            width: 100%;
            overflow: hidden;

            p {
              word-break: break-all;
              color: var(--text-color);
              margin-bottom: 5px;
              white-space: pre-wrap;
            }
          }

          .img_list {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-content: center;
            margin-top: 10px;

            img {
              border-radius: 5px;
              width: 200px;
              max-height: 200px;
              cursor: pointer;
            }
          }
        }

        .ip_loca {
          font-size: 12px;
          display: flex;
          align-items: center;
          align-content: center;
          margin-top: 10px;
          color: var(--text-color);
          margin-bottom: 5px;

          i {
            margin-right: 3px;
          }
        }

        .entry-footer {
          margin-top: 10px;
          background: #ebf2ed;
          padding: 8px 10px;
          border-radius: 8px;

          .post_footer_meta {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left, .right {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              flex-wrap: nowrap;

              .comnum {
                padding: 3px 8px;
                background: #2c2c2c;
                border-radius: 3px;
                cursor: pointer;
                display: flex;
                align-items: center;
                align-content: center;
                flex-direction: row;
                flex-wrap: nowrap;
                font-size: 12px;
                color: #fff !important;

                i {
                  color: #fff !important;
                  margin-right: 3px;
                  font-size: 13px;
                }
              }

              .up_like {
                display: flex;
                align-items: center;
                flex-direction: row;
                align-content: center;
                margin-left: 5px;
                color: #444444;
                font-size: 12px;

                i {
                  margin-right: 3px;
                  font-size: 13px;
                }

                span {
                  color: var(--text-color);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>