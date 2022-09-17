<template>
  <div>
    <header id="page-header" class="post-bg">
      <Nav/>
      <PostTop/>
    </header>
    <main id="content-inner">
      <div id="post">
        <div class="warp">
          <article id="article-container">
            <Content class="vp-doc"/>
          </article>
        </div>
      </div>
      <sideBar/>
    </main>
    <Comment/>
    <Footer/>
  </div>
</template>

<script>
import Nav from './Nav.vue'
import PostTop from './PostTop.vue'
import Comment from "./Comment.vue"
import sideBar from "./sideBar.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    Nav,
    PostTop,
    Comment,
    sideBar,
    Footer
  },
}

</script>

<style lang="stylus" scoped>
#content-inner {
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  margin: 0 auto;

  #post {
    box-shadow: 0 8px 16px -4px #00000050;
    border-radius: $cardRadius;
    background: #1d1b26;
    border: 1px solid #42444a;
    width: 80%;

    .warp {
      padding: 1rem 2rem;
    }
  }
}

#page-header {
  position: relative;
  width: 100%;
  height: 60px;
  background-image: none !important;
  display: flex;
  justify-content: center;

  &.post-bg {
    background-color: #7d7d5d !important;
    transition: 0s;
    overflow: hidden;
    height: 30rem;
  }

  &.post-bg #nav {
    backdrop-filter: none !important;
  }
}
</style>