// 取消
export default {
  id: 'cancel',
  name: '取消',
  html: '',
  sort: 0,
  display: false,
  clickDom: (target, oldTarget) => {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
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
