import {
  isTextElement
} from '../utils'

// 编辑
export default {
  id: 'edit',
  name: '编辑',
  display: false,
  clickDom: (target, oldTarget) => {
    if (oldTarget) {
      if (!target.isEqualNode(oldTarget)) {
        oldTarget && oldTarget.setAttribute('contenteditable', false)
      }
    }
    return true
  },
  activeDidMount: (target, activeTarget) => {
    if (activeTarget) {
      activeTarget.setAttribute('contenteditable', !!isTextElement(activeTarget))
      activeTarget.addEventListener('blur', () => {
        activeTarget.setAttribute('contenteditable', false)
      })
    }
    return true
  }
}
