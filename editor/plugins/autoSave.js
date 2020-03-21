// 文本变化标记位
let change = false

const checkContent = (text) => {
  return true
}

// 自动保存
export default {
  id: 'auto-save',
  name: '自动保存',
  html: '',
  sort: 0,
  display: false,
  clickDom: async (target, oldTarget) => {
    if (change) {
      const res = await checkContent(oldTarget?.outerText)
      if (!res || typeof res !== 'boolean') {
        toast('输入内容不合法')
        return false
      }
    }
    return true
  },
  activeContentChange: (target, oldVal, newVal) => {
    change = true
    return true
  }
}
