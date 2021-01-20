<template>
<div class="main-nav">
  <!-- 
    {name: 'javascript', id: '1', list: []},
    {name: 'CSS', id: '2', list: []},
    {name: 'Vue', id: '3', list: []},
    {name: 'React', id: '4', list: []},
    {name: '其他', id: '5', list: []}
   -->
  <div class="btn-box">
    <v-button class="write-btn" size="small" @click="writeArticle">写文章</v-button>
    <v-button class="markdown-btn" size="small" @click="openMarkdown">markdown编辑器</v-button>
  </div>
  <v-menu class="nav-container" @on-select="menuSelect" mode="horizontal" theme="primary" :active-name="activeName">
    <v-menuItem name="home">
      <v-icon  type="ios-paper" />
      首页
    </v-menuItem>
    <v-menuItem name="1">
      <v-icon  type="ios-people" />
      Javascript
    </v-menuItem>
    <v-menuItem name="2">
      <v-icon  type="ios-stats" />
      CSS
    </v-menuItem>
    <v-menuItem name="3">
      <v-icon type="ios-construct" />
      Vue
    </v-menuItem>
    <v-menuItem name="4">
      <v-icon type="ios-construct" />
      React
    </v-menuItem>
    <v-menuItem name="5">
      <v-icon type="ios-construct" />
      其他
    </v-menuItem>
    <v-menuItem name="threejs">
      <v-icon type="ios-construct" />
      Threejs
    </v-menuItem>
  </v-menu>
</div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'index'
    }
  },
  mounted () {
    this.activeName = this.$route.params.secondType || this.$route.name
  },
  methods: {
    menuSelect (val) {
      if (this.$route.params.secondType || this.$route.name !== val) {
        this.$router.push('/' + val)
      }
      this.activeName = val
    },
    openMarkdown () {
      let origin = location.origin
      window.open(origin + '/previewMD')
    },
    writeArticle () {
      this.$router.push('/markdown')
    }
  }
}
</script>
<style lang="less" scoped>
  .main-nav {
    background-color: #2d8cf0;
    position: relative;
    .btn-box {
      width: 300px;
      text-align: right;
      position: absolute;
      right: 15px;
      top: 18px;
      z-index: 999;
    }
    .write-btn,
    .markdown-btn {
      font-size: 12px;
    }
  }
  .nav-container {
    width: 1100px;
    margin: auto;
  }
  .ivu-menu-item-selected {
    font-weight: 700;
    position: relative;
    // &:after {
    //   content: '';
    //   display: block;
    //   width: 100%;
    //   height: 2px;
    //   background-color: #fff;
    //   margin-bottom: 1px
    // }
  }
</style>
