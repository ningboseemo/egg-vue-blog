<template>
  <mavon-editor
    ref="markdown"
    v-model="content"
    :ishljs="true"
    @save="save"
    @change="changeSave"
    @imgAdd="imgAdd"
    @imgDel="imgDel"
  ></mavon-editor>
</template>
<script>
import {LeftToolbar, RightToolbar, markdownIt, mavonEditor} from 'mavon-editor'
export default {
  components: {LeftToolbar, RightToolbar, markdownIt, mavonEditor},
  props: {
    value: String
  },
  data () {
    return {
      baseContent: this.value
    }
  },
  computed: {
    content: {
      get () {
        return this.value
      },
      set (val) {
        this.baseContent = val
        this.$emit('input', val)
      }
    }
  },
  methods: {
    save (...arg) {
      this.$emit('save', ...arg)
    },
    changeSave (...arg) {
      this.$emit('change', ...arg)
    },
    async imgAdd (pos, $file) {
      let formData = new FormData()
      formData.append('image', $file)
      let res = await this.$http({
        url: '/uploadImg',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })

      if (res.data) {
        this.$refs.markdown && this.$refs.markdown.$img2Url(pos, res.data)
      }
    },
    imgDel (pos, $file) {
      console.log(pos, $file)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
