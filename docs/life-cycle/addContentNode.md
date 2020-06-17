# addContentNode(target, activeTarget)

添加新节点

@params target: 插件自身dom
@params activeTarget: 当前选中段落dom

```javascript
// test plugin
export default {
  id: 'demo',
  name: '',
  display: true,
  addContentNode: (target, activeTarget) => {
    return true
  }
}
```