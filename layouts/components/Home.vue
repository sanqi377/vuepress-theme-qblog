<template>
  <div>
    <header id="page-header">
      <Nav/>
    </header>
    <HomeTop/>
    <main id="content-inner">
      <Posts/>
      <sideBar/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Nav from './Nav.vue'
import HomeTop from './HomeTop.vue'
import Posts from "./Posts.vue";
import sideBar from "./sideBar.vue";
import Footer from "./Footer.vue";

export default {
  name: 'Home',
  components: {
    Nav,
    HomeTop,
    Posts,
    sideBar,
    Footer
  }
}
</script>

<style lang="stylus" scoped>
#page-header {
  position: relative;
  width: 100%;
  height: 60px;
  background-image: none !important;
  display: flex;
  justify-content: center;
}

#content-inner {
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  padding: .5rem 1.5rem;
  margin: .3rem auto;
}
</style>