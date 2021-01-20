<template>
  <div class="detail-page">
    <template v-if="article">
      <h1 class="article-title">{{article.title}}</h1>
      <div class="article-info">
        <span>创建时间：{{article.createTime | timeFormat}}</span>
        <span>分类：{{article.classification}}</span>
        <span>创建时间：{{article.author}}</span>
      </div>
      <markdown :content="article.content"></markdown>
    </template>
  </div>
</template>
<script>
import markdown from '../../components/markdown.vue'
import day from 'dayjs'

export default {
  components: { markdown },
  data () {
    return {
      id: this.$route.params.id,
      article: null,
      contentHtml: ''
    }
  },
  mounted () {
    this.getArticle(this.id)
  },
  methods: {
    async getArticle (id) {
      let res = await this.$http.get(`/article/${id}`)
      if (res.data) {
        let article = res.data
        this.article = {
          title: article.article_title,
          content: article.article_content,
          createTime: article.create_time,
          author: article.author_name,
          classification: article.classification_name
        }
      }
    }
  },
  filters: {
    timeFormat (val) {
      return day(val).format('YYYY-MM-DD')
    }
  }
}
</script>
<style lang="less" scoped>
.detail-page {
  height: 100%;
  background-color: tan;
  border-radius: 4px;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 30px;
  flex: 1;
}
.article-title {
  color: #000;
  text-align: center;
}
.article-info {
  font-size: 14px;
  margin-bottom: 15px;
  padding: 15px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  span {
    display: inline-block;
    width: 180px;
  }
}
</style>
