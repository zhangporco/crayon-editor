# activeContentChange(target, activeTarget)

编辑区内容发生变化

@params target: 内容区dom
@params content: 变化内容

```javascript
// test plugin
export default {
  id: 'demo',
  name: '',
  display: true,
  activeContentChange: (target, content) => {
    return true
  }
}
```