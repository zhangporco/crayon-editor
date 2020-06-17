# activeDestroyed(target, activeTarget)

销毁编辑区

@params target: 插件自身dom
@params activeTarget: 当前选中段落dom

```javascript
// test plugin
export default {
  id: 'demo',
  name: '',
  display: true,
  activeDestroyed: (target, activeTarget) => {}
}
```