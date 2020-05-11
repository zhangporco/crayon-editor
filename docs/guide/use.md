## 使用方式

接下来，让我们轻松开启 **crayon-editor**

##### 示例代码

```javascript
import Crayon from 'crayon-editor'
const editor = new Crayon({
  id: 'content-id',
  plugins: [
    'edit',
    'del',
    'insert-img',
    'rotate-img'
  ]
})
editor.init()
```

### step 1

首先你需要指定一个有效的id，这样**crayon-editor**才知道该如何接管程序。

### step 2

在**crayon-editor**中，一切功能都是插件提供，你仅需指定需要加载的插件即可。我们默认提供以下插件（如果你还有更多想法，我们提供了完善的插件集成机制，并且**crayon-editor**会毫无保留的向自定义插件暴露生命周期函数，具体请移步至插件章节）。

- edit
- del
- insert-img
- rotate-img

### step 3

最后你仅需调用**init**函数触发渲染既可。

### API


##### init(html)

初始化代码，该函数是**crayon-editor**运行起点。必须触发一次，但是请勿放置在定时器等环境中。**crayon-editor**默认会启动单例模式，并不会有性能问题，但是根据我们的总结循环初始化毫无必要，一切无意义的代码都是必须清除的。

@params html：html 节点，此参数内容会替换 id 选择器内容，请谨慎使用

##### html()

获取html实例。常用作保存使用

@return html

##### reset()

重置内容，放弃全部修改，一夜回到解放前

##### forward()

前进，配合 **back()** api使用

##### back()

回退，这真没法再解释了。

##### stackInfo()

返回 **crayon-editor** 操作记录栈，这是一个高级 API，请勿滥用。