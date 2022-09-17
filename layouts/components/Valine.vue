<template>
  <div ref="valineBox" id="post-comment">
    <div class="comment-head">
      <div class="comment-headline">
        <font-awesome-icon class="post-meta-icon" :icon="['fas', 'message']"/>
        <span>评论</span>
      </div>
      <div class="comment-privacy"><a href="/privacy/">隐私政策</a></div>
    </div>
    <div id="vcomments"></div>
  </div>
</template>

<script>

export default {
  mounted() {
    setTimeout(() => {
      this.loadComment();
    }, 500)
  },
  watch: {
    '$route'(to, from) {
      if (to.path !== from.path) {
        // 切换页面时重新载入评论
        setTimeout(() => {
          this.loadComment()
        }, 500)
      }
    }
  },
  methods: {
    clearComment() {
      const oDiv = document.querySelector('#vcomments');
      oDiv && oDiv.remove();
    },
    async loadComment() {
      const Valine = await import('valine')
      this.clearComment();
      const oCommentContent = document.createElement('div');
      oCommentContent.setAttribute('id', 'vcomments');
      this.$refs.valineBox.appendChild(oCommentContent);
      new Valine.default({
        el: '#vcomments',
        path: window.location.pathname,
        appId: "jq2clwSrcbV4hLVGqFwOFd7I-gzGzoHsz",
        appKey: "3xoQ5rwYVNhUu0GWtk4mGs3A",
        placeholder: "留下你想说的话吧...",
        service: "valine",
        visitor: true
      })
    }
  }
}
</script>
<style lang="stylus">
#post-comment {
  margin-top: 2rem;

  .comment-head {
    font-size: .8em !important;
    margin-bottom: 1rem;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .comment-headline {
      display: inline-block;
      vertical-align: middle;
      font-weight: 700;
      font-size: 1.43em;

      span {
        margin-left: 10px;
      }
    }

    .comment-privacy {
      display: block;
      justify-content: space-between;
      float: right;
      line-height: 2rem;

      a {
        color: #F7F7FA;
        text-decoration: none;
      }
    }
  }

  .v[data-class=v] {
    .vempty {
      color: #F7F7FA;
    }

    .vwrap {
      border: 0;
      padding: 0;

      .vedit {
        border: 1px solid #42444a;
        border-radius: 12px;
        padding: 15px;
        background: #18171d;

      }

      #veditor {
        color: #F7F7FA;

        &::placeholder {
          color: #F7F7FA;
        }
      }

      .vheader {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;

        .vinput {
          display: flex;
          width: 32.5%;
          background: #18171d;
          border: 1px solid #42444a;
          border-radius: 4px;
          padding: 8px 0 8px 15px;
          color: #F7F7FA;

          &::placeholder {
            color: #F7F7FA;
          }
        }
      }

      .vrow {
        margin-top: 8px;

        .vsubmit {
          border-color: #F7F7FA;
          color: #1d1b26;
          border-radius: 4px;
          box-shadow: 0 0 12px 4px rgba(0, 0, 0, .05);
          transition: .3s;
          width: 5rem;
          margin-left: .5rem;
          height: 32px;
          background: #f7f7fa;

          &:hover {
            background: #7d7d5d;
            border-color: #7d7d5d;
          }
        }
      }
    }
  }
}
</style>