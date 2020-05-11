import icon from '../images/delete-icon.png'

const imgStyle = 'position:absolute;right:8px;bottom:-9px;width:15px;height:15px!important;'

// 删除激活区
export default {
  id: 'del',
  html: `<img plugin-type="del" src="${icon}" style=${imgStyle}>`,
  display: true,
  click(self, activeTarget, clean) {
    activeTarget.remove()
    clean()
  },
  activeWillMount: (target) => {
    return true
  },
  activeDidMount: (target) => {
    return true
  },
  activeDestroyed: async (target) => {
    return true
  }
}
