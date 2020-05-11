import {
  PLUGIN_FLAG,
  CUSTOM_TAG_FLAG,
  BLOCK_ELEMENTS
} from './constant'

/**
 * 获取可编辑元素 光标位置
 * @param {*} element
 */
export const getCursorPosition = (element) => {
  let caretOffset = 0
  const doc = element.ownerDocument || element.document
  const win = doc.defaultView || doc.parentWindow
  let sel
  if (typeof win.getSelection !== 'undefined') {
    sel = win.getSelection()
    if (sel.rangeCount > 0) {
      const range = win.getSelection().getRangeAt(0)
      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(element)
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      caretOffset = preCaretRange.toString().length
    }
  } else if ((sel = doc.selection) && sel.type !== 'Control') {
    const textRange = sel.createRange()
    const preCaretTextRange = doc.body.createTextRange()
    preCaretTextRange.moveToElementText(element)
    preCaretTextRange.setEndPoint('EndToEnd', textRange)
    caretOffset = preCaretTextRange.text.length
  }
  return caretOffset
}

/**
 * 判断该元素是否包含文本
 * @param {*} target
 */
export const isTextElement = (target) => {
  if (!target) return false
  return target.innerText ? target.innerText.length > 0 : false
}

/**
 * 是否可编辑
 * @param {*} target
 */
export const hasEdit = (target) => {
  return !target.getAttribute(PLUGIN_FLAG)
}

/**
 * 是否是自定义标签，自定义标签将无法触发编辑器
 * @param {*} target
 */
export const isCustom = (target) => {
  return target.hasAttribute(CUSTOM_TAG_FLAG)
}

/**
 * 判断是否是块级元素
 * @param {*} tagName 标签名 小写
 */
export const isBlockElement = (tagName) => {
  for (const name of BLOCK_ELEMENTS) {
    if (name === tagName) return true
  }
  return false
}

/**
 * 返回元素 display 属性
 * @param {*} target
 */
export const getDisplay = (target) => {
  if (!target) return null
  let res = null
  if (target.currentStyle) {
    res = target.currentStyle.display
  } else {
    res = getComputedStyle(target, false).display
  }
  return res
}

/**
 * 返回有效元素
 * @param {*} target
 */
export const getElement = (target) => {
  if (!target) return null
  const res = getDisplay(target)

  if (res === 'inline') {
    return getElement(target.parentNode)
  }
  return target
}

/**
 * 获取当前滚动条高度
 */
export const getScrollTop = () => {
  return document.documentElement.scrollTop || document.body.scrollTop
}

/**
 * 滚动条定位
 */
export const scrollTo = () => {
  window.scrollTo(0, getScrollTop())
}

/**
 * 返回元素宽高、位置信息
 * @param {*} target 目标元素
 * @param {*} custom 自定义数据
 */
export const getTargetRect = (target, custom) => {
  if (custom) return custom
  if (!target) return { top: 0, left: 0, width: 0, height: 0 }
  return target.getBoundingClientRect()
}

/**
 * 格式化 style
 * @param {*} style 
 */
export const stringifyStyle = (style) => {
  let res = ''
  for (const k of Object.keys(style)) {
    res += `${k}:${style[k]};`
  }
  return res
}
