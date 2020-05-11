# Crayon Editor

移动端富文本编辑器

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