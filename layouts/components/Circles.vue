<template>
  <div class="circle_list single-content">
    <div class="content" v-for="e in list" :key="e.id">
      <div class="inner">
        <div class="list_user_meta">
          <div class="avatar"><img src="/logo.png" alt="logo"></div>
          <div class="name">
            {{ e.username }}
            <time>{{ e.date }}</time>
          </div>
        </div>
        <div class="circle_content">
          <div class="entry-content">
            <div class="t_content"><p>{{ e.content }}</p></div>
            <div :id="`video-${e.id}`" v-show="e.video"/>
            <div class="img_box" v-show="!e.video">
              <div class="img_list">
                <img v-for="(i,x) in e.img" :key="x" :src="i" alt="photo">
              </div>
            </div>
          </div>
          <span class="ip_loca"><i class="ri-map-pin-2-line"></i>{{ e.address }}</span>
          <div class="entry-footer">
            <div class="post_footer_meta">
              <div class="left">
                <a class="up_like" @click="like(e.id)">
                  <i :class="`${e.likeNum ? 'ri-heart-2-fill' : 'ri-heart-2-line'}`"
                     :style="`${e.likeNum ? 'color: rgb(255, 93, 73) !important;' : ''}`"></i>
                  <span :style="`${e.likeNum ? 'color: rgb(255, 93, 73) !important;' : ''}`">{{ e.likeNum || 0 }}</span>
                </a></div>
              <div class="right">
                <span class="comnum show_comment"><i class="ri-message-3-line"></i>0</span>
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
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime); // 相对时间
dayjs.locale('zh-cn'); // 使用本地化语言


export default {
  data() {
    return {
      list: [],
      pageLoading: false,
      Player: null
    }
  },
  async mounted() {
    this.Player = await import('xgplayer')
    await this.getQrList()
  },
  methods: {
    /**
     * 获取圈儿列表
     */
    async getQrList(update) {
      this.pageLoading = true
      const AV = await this.$parent.initAV()
      const query = await new AV.Query('Circle').descending('createdAt').find();
      this.list = query.map(e => {
        return {
          id: e.id,
          address: e.attributes.address,
          content: e.attributes.content,
          img: e.attributes.img,
          video: e.attributes.video,
          username: e.attributes.username,
          likeNum: e.attributes.likeNum,
          date: dayjs(e.createdAt).fromNow().replace(' ', '')
        }
      })
      this.pageLoading = false
      if (!update) {
        this.list.forEach(e => {
          if (e.video) {
            setTimeout(() => {
              let player = new this.Player.default({
                id: `video-${e.id}`,
                rotate: {
                  innerRotate: true,
                  clockwise: false
                },
                lang: 'zh-cn'
              })
              player.start(e.video)
            })
          }
        })
      }
    },
    /**
     * 点赞
     * @param id
     * @returns {Promise<void>}
     */
    async like(id) {
      const AV = await this.$parent.initAV()
      const {attributes} = await new AV.Query('Circle').equalTo('objectId', id).first();
      const likeNum = Number(attributes.likeNum) + 1 || 1
      await new AV.Object.createWithoutData('Circle', id).set('likeNum', likeNum).save();
      await this.getQrList(true)
      this.$toast.success("点赞成功", {
        position: "top-right",
        timeout: 1500,
        closeButton: "button",
      });
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
    border-bottom: 1px solid var(--light-border);

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
          color: #32395c;

          time {
            font-size: 13px;
            color: var(--text-dark);
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
              color: #0d0d0d;
              margin-bottom: 5px;
              white-space: pre-wrap;
            }
          }

          .img_box {
            display: flex;
            flex-wrap: wrap;

            .img_list {
              overflow: hidden;
              margin-bottom: 2%;

              img {
                cursor: pointer;
                border-radius: 5px;
                object-fit: cover;

                &:only-child {
                  width: inherit !important;
                  height: inherit !important;
                  max-height: 200px;
                }

                &:nth-child(1):nth-last-child(2), &:nth-child(2):nth-last-child(1), &:nth-child(1):nth-last-child(3), &:nth-child(2):nth-last-child(2), &:nth-child(3):nth-last-child(1) {
                  width: 32%;
                  height: 200px;
                  margin-right: 2%;
                  margin-bottom: 2%;
                }

                &:nth-child(1):nth-last-child(4),
                &:nth-child(2):nth-last-child(3),
                &:nth-child(3):nth-last-child(2),
                &:nth-child(4):nth-last-child(1) {
                  height: 200px;
                  margin-right: 2%;
                  margin-bottom: 2%;
                  width: 49%;
                }

                &:nth-child(1):nth-last-child(n + 5),
                &:nth-child(1):nth-last-child(n + 5) ~ img {
                  height: 200px;
                  margin-right: 2%;
                  margin-bottom: 2%;
                  width: 32%;
                }
              }
            }
          }
        }

        .ip_loca {
          font-size: 12px;
          display: flex;
          align-items: center;
          align-content: center;
          margin-top: 10px;
          color: var(--text-dark);
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
                  color: var(--text-dark);
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