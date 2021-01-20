<template>
  <div class="page-index">
    <div class="left">
      <div class="no-data" v-if="!list.length">
        还没有文章，请等待更新～_～
      </div>
      <v-list item-layout="vertical" class="artile-list" v-else>
        <v-list-item v-for="v in list" :key="v.id">
          <div class="artile-item" @click="detail(v)">
            <div class="article-time">
              {{v.createTime | timeFilter}}
            </div>
            <div class="title-box">
              <h2 class="article-title">{{v.articleTitle}}</h2>
              <div class="sub-title" v-if="v.subTitle">{{v.subTitle}}</div>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </div>
    <person class="right"></person>
  </div>
</template>
<script>
import person from './person.vue'
import day from 'dayjs'

export default {
  components: {person},
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      let res = await this.$http.get(`/article`)
      if (res.data) {
        this.list = res.data.map(item => {
          return {
            articleTitle: item.article_title,
            subTitle: item.sub_title,
            id: item.id,
            authorId: item.author_id,
            classificationId: item.classification_id,
            classificationName: item.classification_name,
            createTime: item.create_time
          }
        })
      }
    },
    detail (row) {
      this.$router.push(`home/${row.id}`)
    }
  },
  filters: {
    timeFilter (val) {
      return day(val).format('YYYY-MM-DD')
    }
  }
}
</script>
<style lang="less" scoped>
  .page-index {
    display: flex;
    flex: 1;
    flex-direction: row;
    height: 100%;
    .left {
      flex: 1;
      background-color: tan;
      border-radius: 4px;
      .no-data {
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .artile-list {
        padding: 30px 40px;
      }
      .artile-item {
        padding-left: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        &:hover .article-title {
          text-decoration: underline;
        }
      }
      .article-time {
        color: #fff;
        font-size: 20px;
        margin-right: 40px;
        background-color: burlywood;
        padding: 22px 9px;
        border-radius: 11px;
        width: 215px;
      }
      .article-title {
        margin-bottom: 15px;
        color: #755c5c;
      }
      .sub-title {
        font-size: 15px;
        opacity: 0.8;
      }
    }
    .right {
      width: 240px;
    }
  }
</style>