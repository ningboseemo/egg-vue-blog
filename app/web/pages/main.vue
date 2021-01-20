<template>
  <div class="main">
    <main-nav></main-nav>
    <div class="main-page">
      <router-view></router-view>
    </div>
    <!-- <div class="main-footer"></div> -->
  </div>
</template>
<script>
import MainNav from '../components/nav.vue'

export default {
  name: 'mainPage',
  components: { MainNav }
}
</script>
<style lang="less" scoped>
  .main {
    width: 100vw;
    min-height: 100vh;
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .main-page {
    flex: 1;
    width: 1100px;
    margin: auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    padding: 15px;
    box-sizing: border-box;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    // overflow-y: auto;
  }
  .main-footer {
    height: 40px;
    background-color: rgba(0, 0, 0, 0.8);
  }
</style>
