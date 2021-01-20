<template>
  <div class="person-info">
    <div class="person-photo">
    </div>
    <div class="person-name">站着瞌睡</div>
    <div class="instruction">
      简介：一个不优秀的前端在不断的向着优秀不懈的努力，工作了6年，依然感觉自己还要学习很多很多，有时候感觉很累，但是有时候学起来也非常有成就，可能这就是学习进步的所在
    </div>
    <bug-button></bug-button>
  </div>
</template>
<script>
import bugButton from '../../components/bug.button.vue'
export default {
  components: {bugButton}
}
</script>
<style lang="less" scoped>
.person-info {
  display: flex;
  flex-direction: column;
  .person-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: url('../../assets/person_photo.jpg');
    background-position: center center;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 15px;
  }
  .person-name {
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .instruction {
    font-size: 14px;
    line-height: 1.5;
    padding-left: 10px;
    letter-spacing: 2px;
  }
}
</style>