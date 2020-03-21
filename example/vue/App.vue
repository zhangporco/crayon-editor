<template>
  <div id="example-vue">
    <h1>Vue</h1>
    <div v-html="html" class="content" /> 
  </div>
</template>

<script>
import ColorPen from '../../editor'
import h5 from './h5'

const editor = new ColorPen({
  id: 'example-vue',
  plugins: [
    'edit',
    'del',
    'auto-save',
    'insert-img',
    'rotate-img'
  ]
})

export default {
  data() {
    return {
      html: '<div><div>1111</div><div>2222</div><div>3333</div></div>'
    }
  },
  mounted() {
    this.html = editor.init(this.html)
  }
}
</script>

<style lang="scss" scoped>
#example-vue {
  width: 90%;
  margin: auto;
  h1 {
    text-align: center;
  }
}
</style>
