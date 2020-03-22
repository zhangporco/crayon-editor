import {
  getTargetRect,
  isTextElement,
  hasEdit
} from '../utils'

let rotate = 0

// 旋转图片
export default {
  id: 'rotate-img',
  name: '旋转图片',
  img: '',
  position: 'bottom',
  display: true,
  render: (target) => {
    if (!isTextElement(target) && hasEdit(target)) {
      return `
      <div plugin-type="rotate-img" style="width:60px;height:24px;line-height:0.48rem;position:absolute;right:100px;color:red;font-size:15px;font-weight:500;">
        旋转图片
      </div>
    `
    }
    return ''
  },
  click: async (self, activeTarget, clean) => {
    const { width, height } = getTargetRect(activeTarget)
    let scale = (width > height ? height / width : width / height).toFixed(1)
    rotate += 90
    if (rotate === 360) {
      rotate = 0
    }
    if (rotate % 180 === 0) {
      scale = 1
    }

    const style = activeTarget.getAttribute('style')

    if (style) {
      const defaultStyle = style.split(';custom: transform;')[0]
      activeTarget.setAttribute('style', `${defaultStyle};custom: transform;transform:rotate(${rotate}deg) scale(${scale});`)
    } else {
      activeTarget.setAttribute('style', `custom: transform;transform:rotate(${rotate}deg) scale(${scale});`)
    }
  },
  activeDestroyed: (target) => {
    rotate = 0
    return true
  }
}
