<template>
  <div class="markdown">
    <!-- <v-markdown></v-markdown> -->
    <div class="slid">
      <div class="slid-header">
        <h2>文章列表</h2>
        <v-icon type="md-return-left" @click="returnPage" class="return-btn"/>
      </div>
      <v-collapse accordion v-model="collapse">
        <v-panel v-for="item in classificationList" :key="item.id" :name="item.id">
            {{item.name}}
            <div slot="content" class="artile-list">
              <div class="artile-add" @click="add({classificationId: item.id, classificationName: item.name})">...添加</div>
              <v-list >
                <v-list-item v-for="v in item.list" :key="v.id" class="artile-item" :class="{'active-article': id === v.id}">
                  <span @click="clickArticle(v.id)">{{v.articleTitle}}</span>
                  <div slot="extra" class="extra">
                    <v-icon type="ios-trash" @click="deleteArticle(v)"/>
                    <v-icon type="md-create" @click="editorTitle(v)"/>
                  </div>
                </v-list-item>
              </v-list>
            </div>
        </v-panel>
      </v-collapse>
    </div>
    <v-markdown-editor
      v-if="id"
      class="v-markdown-editor"
      v-model="content"
      @save="update"
      @change="changeSave"
    ></v-markdown-editor>
    <div class="no-data" v-else>
      暂无数据
    </div>
    <v-modal
      v-model="visible"
      :title="editTitleId ? '编辑' : '添加'"
      @on-ok="confirm">
        <div>
          <label>标题</label><v-input v-model="articleTitle" />
        </div>
        <div>
          <label>概述</label><v-input v-model="subTitle" type="textarea" :rows="2"/>
        </div>
    </v-modal>
  </div>
</template>
<script>
import vMarkdown from '../../components/markdown.vue'
import vMarkdownEditor from '../../components/markdown.editor.vue'
import {find} from 'lodash'
export default {
  components: {vMarkdown, vMarkdownEditor},
  beforeRouteEnter (to, from, next) {
    let token = localStorage.getItem('nb-token')
    if (to.path === '/login' || token) {
      next()
    } else {
      sessionStorage.setItem('CURRENT_ROUTE', to.path)
      next('/login', (vm) => {
        vm.$router.push('/login')
        return false
      })
    }
  },
  data () {
    return {
      id: this.$route.params.id,
      collapse: '',
      content: '',
      visible: false,
      articleTitle: '',
      subTitle: '',
      editTitleId: '',
      classificationList: [
        {name: 'javascript', id: '1', list: []},
        {name: 'CSS', id: '2', list: []},
        {name: 'Vue', id: '3', list: []},
        {name: 'React', id: '4', list: []},
        {name: '其他', id: '5', list: []}
      ]
    }
  },
  mounted () {
    if (this.id) {
      this.getArtile(this.id)
    }
  },
  methods: {
    async list (val) {
      let res = await this.$http.get(`/article?classification_id=${val}`)
      if (res.data && this.collapse.length) {
        let classification = find(this.classificationList, {id: this.collapse[0]})
        classification.list = res.data.map(item => {
          return {
            articleTitle: item.article_title,
            id: item.id,
            authorId: item.author_id,
            classificationId: item.classification_id,
            classificationName: item.classification_name
          }
        })
      }
    },
    async getArtile (id) {
      let res = await this.$http.get(`/article/${id}`)
      if (res.data) {
        this.content = res.data.article_content
      }
    },
    confirm () {
      if (this.editTitleId) {
        this.edit()
      } else {
        this.save()
      }
    },
    async save () {
      let res = await this.$http.post('/article', {
        article_title: this.articleTitle,
        sub_title: this.subTitle,
        author_id: '1',
        author_name: 'admin',
        classification_id: this.currentEditRow.classificationId,
        classification_name: this.currentEditRow.classificationName
      })
      if (res.data) {
        this.$router.push(`/markdown/${res.data}`)
        this.list(this.currentEditRow.classificationId)
        this.editTitleId = ''
        this.articleTitle = ''
        this.subTitle = ''
      }
      this.currentEditRow = null
    },
    async update (val) {
      console.log('update', val)
      let params = {
        article_content: val
      }
      let res = await this.$http.put(`/article/${this.id}`, params)
      if (res.data) {
        this.$Message.success('已保存')
      }
    },
    changeSave () {
      // 可以设置自动保存
    },
    async deleteArticle (row) {
      let res = await this.$http.delete(`/article/${row.id}`)
      if (res.data) {
        if (row.id === this.id) {
          this.id = ''
          this.$router.push('/markdown')
        }
        this.list(row.classificationId)
        this.$Message.success('删除成功')
      }
    },
    editorTitle (row) {
      this.editTitleId = row.id
      this.articleTitle = row.articleTitle
      this.subTitle = row.subTitle
      this.currentEditRow = row
      this.visible = true
    },
    async edit () {
      let res = await this.$http.put(`/article/${this.editTitleId}`, {
        article_title: this.articleTitle,
        sub_title: this.subTitle
      })
      this.editTitleId = ''
      this.articleTitle = ''
      this.subTitle = ''
      this.currentEditRow = null
      if (res.data) {
        this.$Message.success('编辑成功')
      }
    },
    add (info) {
      this.currentEditRow = info
      this.visible = true
    },
    clickArticle (id) {
      if (id === this.id) return
      this.$router.push(`/markdown/${id}`)
      this.id = id
    },
    returnPage () {
      this.$router.push(`/`)
    }
  },
  watch: {
    '$route.params.id' (val) {
      this.id = val
      if (val) {
        this.getArtile(val)
      }
    },
    collapse (val) {
      if (val) {
        this.list(val)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .markdown {
    width: 100vw;
    height: 100vh;
    display: flex;
    .slid {
      width: 300px;
      height: 100%;
      background-color: #c7c7c7;
      overflow-y: auto;
    }
    .slid-header {
      display: flex;
      padding: 10px;
      h2 {
        flex: 1;
      }
      .return-btn {
        font-size: 20px;
        margin-top: 7px;
        opacity: 0.7;
        cursor: pointer;
      }
    }
    .v-markdown-editor {
      flex: 1;
      height: 100%;
      z-index: 100;
    }
    .artile-item {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      span {
        flex: 1;
      }
    }
    .artile-add {
      cursor: pointer;
    }
    .no-data {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
    .active-article {
      color: #2db7f5,
    }
  }
</style>
