<template>
  <html v-if="isNode">
    <head>
      <title>{{ title || '一个行走前端边缘的人' }}</title>
      <meta 
        :content="keywords" 
        name="keywords">
      <meta 
        :content="description" 
        name="description">
      <meta 
        http-equiv="content-type" 
        content="text/html;charset=utf-8">
      <meta 
        name="viewport" 
        content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
      <link 
        rel="shortcut icon" 
        href="/favicon.ico" 
        type="image/x-icon" >
    </head>
    <body>
      <div id="app">
        <slot></slot>
      </div>    
    </body>
  </html>
  <div id="app" v-else>
    <slot></slot>
  </div>
</template>

<script type="text/babel">
export default {
  props: [ 'title', 'description', 'keywords' ],
  computed:{
    isNode() {
      return EASY_ENV_IS_NODE;
    }
  }
}
</script>
