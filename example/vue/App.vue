<template>
  <div class="layout">
    <h1>Vue</h1>
    <div id="example-vue" class="content" >
      <div><div>1111</div><div>2222</div><div>33333</div></div>
    </div>
    <div class="bottom-block">
      <button class="btn" @click="forward">前进</button>
      <button class="btn" @click="back">后退</button>
      <button class="btn" @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import Crayon from '../../editor'
import h5 from './h5'
import demo from '../plugins/demo'

const editor = new Crayon({
  id: 'example-vue',
  plugins: [
    'edit',
    'del',
    'insert-img',
    'rotate-img',
    demo
  ]
})

export default {
  data() {
    return {
      html: '<div><div>1111</div><div>2222</div><div>333344</div></div>'
    }
  },
  mounted() {
    editor.init()
  },
  methods: {
    forward() {
      editor.forward()
    },
    back() {
      editor.back()
    },
    save() {
      console.log(editor.html())
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 90%;
  margin: auto;
  h1 {
    text-align: center;
  }
  .bottom-block {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    display: flex;
    justify-content: space-around;
    .btn {
      height: 40px;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
    .btn:focus {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
}
</style>
