<template>
  <markdown class="md-body" :content="content" :options="options"></markdown>
</template>
<script>
import markdown from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

export default {
  components: {markdown},
  props: {
    content: String
  },
  data () {
    return {
      options: {
        linkAttributes: {
          attrs: {
            target: '_blank',
            rel: 'noopener'
          }
        },
        katex: {
          throwOnError: false,
          errorColor: '#cc0000'
        },
        icons: 'font-awesome',
        githubToc: {
          tocFirstLevel: 2,
          tocLastLevel: 3,
          tocClassName: 'toc',
          anchorLinkSymbol: '',
          anchorLinkSpace: false,
          anchorClassName: 'anchor',
          anchorLinkSymbolClassName: 'octicon octicon-link'
        },
        mermaid: {
          theme: 'default'
        },
        image: {
          hAlign: 'left',
          viewer: true
        }
      }
    }
  }
}
</script>
