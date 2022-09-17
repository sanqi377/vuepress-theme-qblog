<template>
  <div class="theme-container" v-if="iconIs">
    <Home v-if="$page.pageType === 'home'"/>
    <Archive v-else-if="$page.pageType === 'archive'"/>
    <Category v-else-if="$page.pageType === 'category'"/>
    <CategoryItem v-else-if="$page.pageType === 'categoryItem'"/>
    <Tag v-else-if="$page.pageType === 'tag'"/>
    <TagItem v-else-if="$page.pageType === 'tagItem'"/>
    <Link v-else-if="$page.pageType === 'link'"/>
    <About v-else-if="$page.pageType === 'about'"/>
    <Post v-else/>
  </div>
</template>

<script>
import Home from "./components/Home";
import Archive from './components/Archive'
import Category from './components/Category'
import CategoryItem from './components/CategoryItem'
import Tag from './components/Tag'
import TagItem from './components/TagItem'
import Post from "./components/Post";
import Link from "./components/Link";
import About from "../../../components/About";
import {initIcon} from '../util'

export default {
  name: "Layout.vue",
  data() {
    return {
      iconIs: false,
    }
  },
  components: {
    Home,
    Archive,
    Category,
    CategoryItem,
    Tag,
    TagItem,
    Post,
    Link,
    About
  },
  async mounted() {
    this.iconIs = await initIcon(this.$site.themeConfig.nav)
  },
}
</script>

<style lang="stylus">
@require '../assets/css/font.css'
@require '../assets/css/common.styl'
@require "../assets/css/vars.css";
</style>