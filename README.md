# Crayon Editor

轻量级段落富文本编辑器，于传统的富文本编辑器不同的事，用户只能对选中的段落进行编辑，
这非常符合手机端轻编辑需求。

[文档](http://47.111.231.170:8080/crayon-editor/)

## 安装
```
npm install crayon-editor

// or
yarn add crayon-editor
```

## 使用
```
import Crayon from '../../editor'

const editor = new Crayon({
  id: 'editor-content',
  plugins: [
    'edit',
    'del',
    'auto-save',
    'insert-img',
    'rotate-img'
  ]
})
```