<template>
  <div id="blog-comments">
    <div id="comments" @click="showChat" v-show="commentHidden">
      <div class="content">
        <div class="item">
          <div>共 <span>{{ commentList.length }}</span> 条评论</div>
          <div>
            <i class="ri-chat-4-line"></i>
          </div>
        </div>
      </div>
    </div>
    <div id="chat" :class="chatHiddenClass" v-show="chatHiddenClass">
      <div class="chat-header">全部评论
        <i class="ri-close-line icon-close" @click="hiddenChat"></i>
      </div>
      <div class="full single-content">
        <div class="chat-body">
          <div class="item" v-for="item in commentList">
            <div class="left"><img :src="item.avatar" alt="avatar"></div>
            <div class="grow">
              <div class="top">
                <span class="name">{{ item.author }}</span>
                <span class="date">{{ resolvedDate(item.date) }}</span>
              </div>
              <div v-html="item.contentHtml"/>
            </div>
          </div>
        </div>
        <div class="chat-footer" id="cc">
          <div>
            <vue-tribute :options="tributeOptions">
              <div
                  ref="commentContent"
                  class="content-editable"
                  contenteditable="true"
                  @input="valueChange"
                  placeholder="留点什么吧 ... Tips: 支持 @ 联想 & 多级回复"
              ></div>
            </vue-tribute>
          </div>
          <div class="chat-foot">
            <a href="#">查看隐私政策</a>
            <div class="comment-post">
              <button @click="openDialog">评论</button>
            </div>
          </div>
        </div>
        <div :class="`dialog-overlay ${!dialogShow ? 'dialogOut' : ''}`" style="z-index: 2022;"
             v-show="dialogShow || loading"></div>
        <div class="loading" v-show="loading">
          <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <circle fill="none" stroke="#8c92b3" cx="15" cy="15" r="14"></circle>
          </svg>
        </div>
        <div :class="`comment-dialog ${!dialogShow ? 'dialogOut' : ''}`" v-show="dialogShow">
          <div class="dialog-header">输入昵称和邮箱</div>
          <div class="dialog-content">
            <p><span class="text-success">推荐使用 Github 昵称</span>，可以获取到您的 Github 头像。</p>
            <div class="form-group comment-form-group">
              <input type="text" v-model="userInfo.author" placeholder="您的昵称" class="form-control rounded"/>
            </div>
            <div class="form-group comment-form-group">
              <input type="email" v-model="userInfo.email" placeholder="您的邮箱" class="form-control rounded">
            </div>
          </div>
          <div class="dialog-footer">
            <button @click="dialogShow = false">取消</button>
            <button class="apply" @click="onsubmit">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import dayjsPluginTIMEZONE from 'dayjs/plugin/timezone'

dayjs.extend(dayjsPluginTIMEZONE)

export default {
  data() {
    return {
      userInfo: JSON.parse(window.sessionStorage.getItem("emailInfo")) || {},
      dialogShow: false,
      commentHidden: true,
      chatHiddenClass: false,
      commentValue: '',
      commentText: '',
      commentList: [],
      tributeOptions: {
        trigger: "@",
        requireLeadingSpace: false,
        noMatchTemplate: "<li>暂无数据</li>",
        values: [],
        positionMenu: false,
        menuContainer: document.getElementById("cc"),
        selectTemplate: (item) => {
          return (
              `<p id="parentComment" style="display: none"><span class="text-muted">回复</span><span class="text-primary"> ${item.original.value} </span><span class="text-muted">的评论：</span><span class="text-muted">${item.original.key}</span></p><span class="anT" id="commentAt" contenteditable="false"><a>@${item.original.value}</a></span>`
          );
        },
      },
      loading: false
    }
  },
  async mounted() {
    await this.getCommentList()
  },
  watch: {
    $route: {
      async handler(to, from) {
        await this.getCommentList()
      },
    }
  },
  methods: {
    valueChange(e) {
      this.commentValue = e.target.innerHTML;
      this.commentText = e.target.innerText;
    },
    resolvedDate(date) {
      return dayjs.tz(date, "PRC").format('YYYY-MM-DD HH:mm:ss')
    },
    async getCommentList() {
      const AV = await this.$parent.initAV();
      const query = new AV.Query('Comment');
      query.equalTo('blogPath', this.$route.fullPath);
      query.find().then(res => {
        this.tributeOptions.values = res.sort((a, b) => b.createdAt - a.createdAt).map(e => {
          return {key: e.attributes.content, value: e.attributes.author, email: e.attributes.email}
        })
        this.commentList = res.sort((a, b) => b.createdAt - a.createdAt).map(e => {
          return {date: e.createdAt, ...e.attributes}
        })
      });
    },
    openDialog() {
      if (!this.commentValue) {
        this.$toast.error("请填写评论后再提交", {
          position: "top-right",
          timeout: 1500,
          closeButton: "button",
        });
      } else {
        this.dialogShow = true
      }
    },
    async onsubmit() {
      if (!this.userInfo.author) {
        this.$toast.error("请填写昵称后再确认", {
          position: "top-right",
          timeout: 1500,
          closeButton: "button",
        });
        return
      }

      if (!this.userInfo.email) {
        this.$toast.error("请填写邮箱后再确认", {
          position: "top-right",
          timeout: 1500,
          closeButton: "button",
        });
        return
      }
      if (!window.sessionStorage.getItem("emailInfo")) {
        window.sessionStorage.setItem("emailInfo", JSON.stringify({
          author: this.userInfo.author,
          email: this.userInfo.email
        }))
      }
      const AV = await this.$parent.initAV();
      const dom = document.getElementById("parentComment")
      let emailConfig = {
        title: '',
        emailHtml: '',
        email: ''
      }
      if (dom) {
        const parentComment = new RegExp(dom.outerHTML, 'g')
        const commentAt = new RegExp(document.getElementById("commentAt").outerHTML, 'g')
        const commentAtText = new RegExp(document.getElementById("commentAt").innerText, 'g')
        this.commentValue = `<div class="ReplyMessageBody">${dom.innerHTML}</div><div class="MessageBody">${this.commentValue.replace(parentComment, "").replace(commentAt, "")}</div>`
        this.commentText = `${this.commentText.replace(commentAtText, "").slice(1)}`
        emailConfig.emailHtml = `<table cellpadding="0"cellspacing="0"width="650"style="word-break:break-all; border: 1px solid #e6e6e6;border-collapse: collapse;border-style:hidden;  box-shadow: 0 0 0  1px #e6e6e6;overflow:hidden;margin: 2px auto;background-color: rgb(67,67,67);"><tbody><tr><td background="#FFFFFF"><table cellpadding="0"cellspacing="0"background="#FFFFFF"><tbody><tr><td colspan="1"rowspan="1"style="font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; vertical-align: top;font-size: 14px;"><img src="https://images.weserv.nl/?url=https://article.biliimg.com/bfs/article/4312f17c72b1f0f9f7a18fabf8c7a4d874709787.jpg"width="750"height="250"style="display:block;border:none;max-width:100%"></td></tr></tbody></table></td></tr><tr><td><table cellpadding="0"cellspacing="0"style=" ;"><tbody><tr><td colspan="1"rowspan="1"style="vertical-align: top;font-size: 14px;padding-top: 10px;padding-bottom:20px"><p style="line-height:18px;text-align:left; "><span style="font-size:15px;text-align:left;letter-spacing:0px;line-height:18px;color:#fff;margin:0 30px"><b style="color:#ff7c7c">${document.getElementById("commentAt").textContent.replace('@', '')}</b>，在 <b><a href="${window.location.href}"style="color: #ff7c7c;text-decoration: none;border-bottom: 2px solid;">${this.$page.title}</a></b> 页面发布了一条新评论：</span></p></td></tr><tr><td colspan="1"rowspan="1" style="word-break: break-all;white-space:normal"><div style="margin: 0 30px;margin-bottom: 30px;padding:8px 15px;font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; vertical-align: top;font-size: 14px; border-radius: 8px; background-color: rgb(255,255,255,.8); backdrop-filter: blur(50px); box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);display: inline-block;">${document.querySelectorAll("#parentComment .text-muted")[2].textContent}</div></td></tr></tbody></table></td></tr><tr><td><table cellpadding="0"cellspacing="0"style=" ;"><tbody><tr><td colspan="1"rowspan="1"style="vertical-align: top;font-size: 14px;padding-top: 10px;padding-bottom:20px"><p style="line-height:18px;text-align:left; "><span style="font-size:15px;text-align:left;letter-spacing:0px;line-height:18px;color:#fff;margin-left:30px"><b style="color:#ff7c7c">${this.userInfo.author}</b>，在 <b><a href="${window.location.href}"style="color: #ff7c7c;text-decoration: none;border-bottom: 2px solid;">${this.$page.title}</a></b> 给您的回复为：</span></p></td></tr><tr><td colspan="1"rowspan="1" style="word-break: break-all;white-space:normal"><div style="margin:0 30px;padding:8px 15px;font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; vertical-align: top;font-size: 14px; border-radius: 8px; background-color: rgb(255,255,255,.8); backdrop-filter: blur(50px); box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);display: inline-block;">${this.commentText}</div></td></tr></tbody></table></td></tr><tr><td style="padding:20px 0;text-align:right;padding-right:20px"><span style="font-size:13px;letter-spacing:0px;line-height:18px;color:#fff;">欢迎再次访问 <b><a href="https://www.qblog.cc"style="color: #ff7c7c;text-decoration: none;border-bottom: 2px solid;">${this.$site.title}</a></b></span></td></tr></tbody></table>`
        emailConfig.title = `恭喜您收到来自【${this.userInfo.author}】在页面【${this.$page.title}】回复的评论！`
        emailConfig.email = this.tributeOptions.values.filter(e => e.value === document.getElementById("commentAt").textContent.replace('@', ''))[0].email
      } else {
        this.commentValue = `<div class="MessageBody">${this.commentValue}</div>`
        emailConfig.emailHtml = `<table cellpadding="0"cellspacing="0"width="650"style="word-break:break-all;border: 1px solid #e6e6e6;border-collapse: collapse;border-style:hidden;  box-shadow: 0 0 0  1px #e6e6e6;overflow:hidden;margin: 2px auto;background-color: rgb(67,67,67);"><tbody><tr><td background="#FFFFFF"><table cellpadding="0"cellspacing="0"background="#FFFFFF"><tbody><tr><td colspan="1"rowspan="1"style="font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; vertical-align: top;font-size: 14px;"><img src="https://images.weserv.nl/?url=https://article.biliimg.com/bfs/article/4312f17c72b1f0f9f7a18fabf8c7a4d874709787.jpg"width="750"height="250"style="display:block;border:none;max-width:100%"></td></tr></tbody></table></td></tr><tr><td><table cellpadding="0"cellspacing="0"style=" ;"><tbody><tr><td colspan="1"rowspan="1"style="vertical-align: top;font-size: 14px;padding-top: 10px;padding-bottom:20px"><p style="line-height:18px;text-align:left; "><span style="font-size:15px;text-align:left;letter-spacing:0px;line-height:18px;color:#fff;margin:0 30px"><b style="color:#ff7c7c">${this.userInfo.author}</b>，在 <b><a href="${window.location.href}"style="color: #ff7c7c;text-decoration: none;border-bottom: 2px solid;">${this.$page.title}</a></b> 页面发布了一条新评论：</span></p></td></tr><tr><td colspan="1"rowspan="1" style="word-break: break-all;white-space:normal"><div style="margin: 0 30px;padding:8px 15px;font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; vertical-align: top;font-size: 14px; border-radius: 8px; background-color: rgb(255,255,255,.8); backdrop-filter: blur(50px); box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);display: inline-block;">${this.commentText}</div></td></tr></tbody></table></td></tr><tr><td style="padding:20px 0;text-align:right;padding-right:20px"><span style="font-size:13px;letter-spacing:0px;line-height:18px;color:#fff;">欢迎再次访问 <b><a href="https://www.qblog.cc"style="color: #ff7c7c;text-decoration: none;border-bottom: 2px solid;">${this.$site.title}</a></b></span></td></tr></tbody></table>`
        emailConfig.title = `恭喜您收到来自【${this.userInfo.author}】在页面【${this.$page.title}】发布的评论！`
        emailConfig.email = `sanqi377@outlook.com`
      }
      // 声明 class
      const Comment = AV.Object.extend('Comment');
      // 构建对象
      const comment = new Comment();
      // 为属性赋值
      comment.set('blogPath', this.$route.fullPath);
      comment.set('author', this.userInfo.author);
      comment.set('email', this.userInfo.email);
      comment.set('avatar', `https://avatars.githubusercontent.com/${this.userInfo.author}`);
      comment.set('contentHtml', this.commentValue);
      comment.set('content', this.commentText);
      let _this = this
      // 将对象保存到云端
      _this.dialogShow = false
      _this.loading = true
      comment.save().then(res => {
        AV.Cloud.run("sendEmail", {
          email: emailConfig.email,
          title: emailConfig.title,
          content: emailConfig.emailHtml
        }).then(data => {
              _this.loading = false
              if (dom) {
                _this.$toast.success("回复评论成功", {
                  position: "top-right",
                  timeout: 1500,
                  closeButton: "button",
                });
              } else {
                _this.$toast.success("发布评论成功", {
                  position: "top-right",
                  timeout: 1500,
                  closeButton: "button",
                });
              }
              console.log(data)
              // 处理结果
            }, (err) => {
              console.log('评论发送失败')
              _this.$toast.error("评论发布失败，请重试~", {
                position: "top-right",
                timeout: 1500,
                closeButton: "button",
              });
            }
        );
        // 成功保存之后，执行其他逻辑
        this.commentValue = ''
        this.$refs.commentContent.innerHTML = ""
        this.getCommentList()
        this.dialogShow = false
        console.log(`保存成功。objectId：${res}`);
      }, (error) => {
        // 异常处理
      });
    },
    showChat() {
      this.tributeOptions.menuContainer = document.getElementById("cc");
      this.chatHiddenClass = 'chatIn'
      this.commentHidden = !this.commentHidden
    },
    hiddenChat() {
      this.chatHiddenClass = 'chatOut'
      this.commentHidden = !this.commentHidden
    }
  },
}
</script>

<style lang="stylus" scoped>
.chatOut {
  animation-fill-mode: both;
  animation-name: tinUpOut;
  animation-duration: 2s;
}

.chatIn {
  animation-fill-mode: both;
  animation-name: tinUpIn;
  animation-duration: .3s;
}

.dialogOut {
  animation: dialogOut .3s;
}

#cc {
  position: relative;
}

@keyframes dialogIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes dialogOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@-webkit-keyframes tinUpOut {
  to {
    opacity: 0;
    transform: translateY(900%)
  }
}

@keyframes tinUpIn {
  from {
    transform: translateY(300%)
  }
  to {
    transform: translateY(0)
  }
}

@keyframes tinRightIn {
  0% {
    opacity: 0;
    transform: scale(1) translateX(900%)
  }
  50%, 70%, 90% {
    opacity: 1;
    transform: scale(1.1) translateX(0)
  }
  60%, 80%, to {
    opacity: 1;
    transform: scale(1) translateX(0)
  }
}

#comments {
  position: absolute;
  width: 260px;
  right: 20px;
  color: #fff;
  transition: all .3s;
  height: 60px;
  padding: 0 .9em;
  animation-fill-mode: both;
  animation-name: tinRightIn;
  animation-duration: 2s;
  align-items: center;
  display: flex;
  bottom: 0;
  opacity: 1;
  border: 0;
  border-bottom: 0;
  z-index: 2000;
  border-radius: 12px 12px 0 0;
  cursor: pointer;
  background: var(--light-ac-btn);

  .content {
    width: 100%;
    padding: 0 10px;

    .item {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      font-weight: 700;
      font-size: 20px;
      width: 100%;
      align-items: center;
      position: relative;
    }

    i {
      margin-top: 9px;
      font-size: 30px;
      display: inline-block;
    }

    span {
      font-size: 36px;
    }
  }
}

#chat {
  box-shadow: 0;
  background-color: var(--lightmedium-bg-rgba);
  z-index: 1050;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  width: 360px;
  height: 80%;
  left: auto;
  right: 20px;
  bottom: 20px;
  overflow: hidden;
  position: fixed;
  max-height: 100%;
  transition: transform .3s, -webkit-transform .3s;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  .loading {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .full {
    width: 100%;
    height: calc(100% - 33px);
    color: #d4d4d5;

    .dialog-overlay {
      background-color: rgba(0, 0, 0, .4);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      animation: dialogIn .3s;
    }

    .comment-dialog {
      width: 360px;
      z-index: 2050;
      border-radius: 25px;
      background-color: hsla(0, 0%, 9%, .9);
      box-shadow: 0 0 45px rgb(0 0 0 / 80%);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      position: absolute;
      top: 45%;
      left: 50%;
      overflow: hidden;
      font-size: 16px;
      transform: translate3d(-50%, -50%, 0);
      backface-visibility: hidden;
      animation: dialogIn .3s;

      .dialog-header {
        color: #d4d4d5;
        font-size: 26px;
        line-height: 30px;
        font-weight: 400;
        text-align: center;
        padding-top: 45px;
      }

      .dialog-footer {
        display: flex;
        border-top: 1px solid hsla(210, 8%, 51%, .09);
        overflow: hidden;
        user-select: none;
        position: relative;
        box-sizing: border-box;

        button {
          color: #d4d4d5;
          background-color: transparent;
          flex: 1;
          height: 60px;
          display: block;
          cursor: pointer;
          margin: 0;
          border: 0;
          width: 100%;
          position: relative;
          box-sizing: border-box;
          padding: 0;
          font-size: 16px;
          line-height: 1.2;
          text-align: center;
          border-radius: 2px;
          transition: opacity .2s;
          -webkit-appearance: none;
          outline: none;

          &:hover {
            color: #50a1ff !important;
          }

          &.apply {
            border-left: 1px solid hsla(210, 8%, 51%, .09);
            color: #50a1ff !important;
            font-weight: 600;
            font-size: 20px;
          }
        }
      }

      .dialog-content {
        font-size: 16px;
        padding-left: 2rem;
        padding-right: 2rem;
        padding-bottom: 1.5rem;
        padding-top: 1.5rem;

        .form-group {
          margin-bottom: 1rem;

          > input {
            border: 1px solid hsla(210, 8%, 51%, .2);
            background-color: #2b2b2b;
            color: #d4d4d5;
            font-weight: 300;
            border-radius: .25rem;
            background-clip: padding-box;
            box-sizing: border-box;
            transition: all .3s ease-out;
            overflow: visible;
            margin: 0;
            display: block;
            width: 100%;
            height: calc(1.9em + .75rem + 2px);
            padding: .375rem .75rem;
            font-size: .9375rem;
            line-height: 1.9;

            &:focus {
              outline: 0;
            }
          }
        }

        > p {
          margin-top: 0;
          margin-bottom: 1rem;

          .text-success {
            color: #3cd458 !important;
          }
        }
      }
    }

    .chat-footer {
      border-top: 1px solid hsla(210, 8%, 51%, .09);
      background-color: hsla(151, 23%, 58%, .5);
      height: 140px;
      padding: 0;
      overflow: hidden;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

      > div {
        box-sizing: border-box;
      }

      .chat-foot {
        align-items: center;
        display: flex;

        .comment-post {
          flex: 1;
          text-align: right;

          button {
            border-top-left-radius: 10px;
            cursor: pointer;
            color: #fff;
            background-color: var(--light-ac-btn);
            font-size: 14px;
            border: 0;
            padding: 7px 30px;
            transition: all .2s;

            &:hover {
              background: var(--dark-ac-btn-hover);
            }
          }
        }

        a {
          font-size: 12px;
          color: #404040;
          text-decoration: none;
          cursor: pointer;
          outline: 0;
          margin-left: 16px;
        }
      }

      .content-editable {
        width: 100%;
        display: block;
        height: 107px;
        padding: 10px 15px;
        box-sizing: border-box;
        font-size: 13px;
        position: relative;
        color: #404040;
        overflow-y: scroll;

        .anT {
          background: yellow;
        }

        &:focus-visible {
          outline: none;
        }

        &:empty:before {
          content: attr(placeholder);
          display: block;
          color: #404040;
        }
      }
    }

    .chat-body {
      height: calc(100% - 200px);
      padding: 1rem;
      overflow-y: auto;

      .item {
        margin-bottom: .75rem;
        display: flex;

        .grow {
          flex: 1;
          display: block;


          .top {
            margin-bottom: .25rem;

            .name {
              color: #32395c;
              font-weight: 600;
              margin-right: .25rem;
              font-size: 12px;
            }

            .date {
              color: var(--text-dark);
              font-size: 12px;
              padding-left: .25rem;
              opacity: .7;
            }
          }
        }

        .left {
          margin-right: .75rem;
          width: 28px;
          height: 28px;

          img {
            width: 28px;
            height: 28px;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .chat-header {
    background-color: var(--light-ac-btn);
    color: #fff;
    box-shadow: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 60px;
    font-size: 20px;
    font-weight: 500;
    padding: 0 .8rem;
    overflow: hidden;
    z-index: 5;
    position: relative;

    .icon-close {
      position: absolute;
      right: 12px;
      top: 13px;
      cursor: pointer;
      font-size: 25px;
    }
  }
}
</style>