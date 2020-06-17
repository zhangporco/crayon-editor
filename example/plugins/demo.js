export default {
  id: 'demo',
  name: '',
  display: true,
  click: (target, activeTarget, clean) => {
    console.log('click', target, activeTarget)
  },
  clickDom: (target, activeTarget) => {
    console.log('clickDom', target, activeTarget)
    return true
  },
  activeWillMount: (target, activeTarget) => {
    console.log('activeWillMount', target, activeTarget)
    return true
  },
  activeDestroyed: (target, activeTarget) => {
    console.log('activeDestroyed', target, activeTarget)
  },
  activeDidMount: (target, activeTarget) => {
    console.log('activeDidMount', target, activeTarget)
    return true
  },
  addContentNode: (target, activeTarget) => {
    console.log('addContentNode', target, activeTarget)
  },
  removeContentNode: (target) => {
    console.log('removeContentNode', target)
  },
  activeContentChange: (target, content) => {
    console.log('activeContentChange', target, content)
  },
  contentStyleChange: (target, activeTarget) => {
    console.log('contentStyleChange', target, activeTarget)
  }
}