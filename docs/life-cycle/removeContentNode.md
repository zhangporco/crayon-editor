# removeContentNode(target, activeTarget)

删除节点

@params target: 被删除节点dom

```javascript
// test plugin
export default {
  id: 'demo',
  name: '',
  display: true,
  removeContentNode: (target) => {
    return true
  }
}
```