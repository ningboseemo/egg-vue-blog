<template>
  <div class="classification-page">
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
</template>
<script>
import day from 'dayjs'
export default {
  data () {
    return {
      id: this.$route.params.secondType,
      list: []
    }
  },
  mounted () {
    if (this.id) {
      this.getList(this.id)
    }
  },
  methods: {
    async getList (id) {
      let res = await this.$http.get(`/article?classification_id=${id}`)
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
      this.$router.push(`${this.id}/${row.id}`)
    }
  },
  watch: {
    '$route.params.secondType' (val) {
      this.id = val
      if (val) {
        this.getList(val)
      }
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
.classification-page {
  height: 100%;
  background-color: tan;
  border-radius: 4px;
  box-sizing: border-box;
  flex: 1;
  .no-data {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .artile-list {
    padding: 30px 100px;
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
    margin-right: 80px;
    background-color: burlywood;
    padding: 22px 9px;
    border-radius: 11px;
    width: 210px;
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
</style>