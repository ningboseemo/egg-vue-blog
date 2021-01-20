<template>
  <div class="markdown">
    <v-markdown-editor
      class="v-markdown-editor"
      v-model="content"
      @save="down"
    ></v-markdown-editor>
    <v-modal
      v-model="visible"
      title="导出文件"
      @on-ok="confirm">
        <div class="file-export">
          <label>文件名称</label><v-input v-model="filename" />
        </div>
    </v-modal>
  </div>
</template>
<script>
import vMarkdownEditor from '../../components/markdown.editor.vue'

export default {
  components: {vMarkdownEditor},
  data () {
    return {
      content: '保存即可导出md文件',
      visible: false,
      filename: ''
    }
  },
  methods: {
    down (val) {
      console.log(val)
      this.visible = true
    },
    confirm () {
      this.exportRaw(this.filename, this.content)
    },
    exportRaw(filename, data) {
      var urlObject = window.URL || window.webkitURL || window
      var export_blob = new Blob([data])
      var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      save_link.href = urlObject.createObjectURL(export_blob)
      save_link.download = filename + '.md'
      save_link.click()
    } 
  }
}
</script>
<style lang="less" scoped>
.markdown {
  width: 100vw;
  height: 100vh;
  .v-markdown-editor {
    height: 100%;
    z-index: 100;
  }
  .file-export {
    display: flex;
  }
}
</style>
