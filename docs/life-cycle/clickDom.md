# clickDom(target, activeTarget)

点击内容区触发，该函数若被定义则必须显式返回true，否则后续生命周期函数会被阻塞

@params target: 插件自身dom
@params activeTarget: 当前选中段落dom
@return boolean

```javascript
// test plugin
export default {
  id: 'demo',
  name: '',
  display: true,
  clickDom: (target, activeTarget) => {
    return true
  }
}
```