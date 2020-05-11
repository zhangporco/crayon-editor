import {
  getTargetRect,
  isTextElement,
  hasEdit
} from '../utils'

import img from '../images/rotate-img.png'

let rotate = 0

// 旋转图片
export default {
  id: 'rotate-img',
  name: '旋转图片',
  position: 'bottom',
  display: true,
  render: (target) => {
    if (!isTextElement(target) && hasEdit(target)) {
      return `
      <div plugin-type="rotate-img" style="width:84px;height:25px;position:absolute;right:100px;top:-7px;">
        <img plugin-type="rotate-img" src="${img}" style="width:100%;height:100%;">
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
