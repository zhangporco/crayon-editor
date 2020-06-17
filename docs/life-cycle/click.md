# click(target, activeTarget, clean)

点击插件时触发

@params target: 插件自身dom
@params activeTarget: 当前选中段落dom
@params clean: 清理函数

```javascript
// test plugin
export default {
  id: 'demo',
  name: '',
  display: true,
  click: (target, activeTarget, clean) => {
    console.log('click', target, activeTarget)
  }
}
```