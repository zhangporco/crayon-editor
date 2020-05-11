# render(target)

插件渲染函数，若定义此函数将会自动屏蔽**html**以及**name**属性，该函数需要返回一个**html**节点

@params target: 激活区dom

```javascript
// test plugin
export default {
  id: 'demo',
  name: 'demo',
  html: '<div>demo</div>',
  display: true,
  render: (target) => {
    return '<div style="color:red;">demo-plugin</div>'
  }
}
```