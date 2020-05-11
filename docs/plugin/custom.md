# 自定义插件

通用插件如果不能满足你的野心，那么你可以使用自定义插件，**crayon-editor**对插件开发提供了极大的支持。

## 插件结构

对于**crayon-editor**，插件也是一个对象，该对象应该拥有以下属性

|     属性     |    必填    |             描述                |
| ------------ | --------- | ------------------------------ |
| id | 是 | 插件标识，id 是用来唯一标识插件的，**crayon-editor**不允许重复**id**，若注册插件阶段出现重复，**crayon-editor**将选择最后注册的插件。你可以灵活运用此特性屏蔽通用插件功能
| html | 否 | 插件 html
| display | 否 | 插件是否显示，对于需要显示的插件则需要指定 **html** 属性，默认**false**
| name | 否 | 插件名称，未定义**name**属性的插件，将会使用**id**替代**name**
| position | 否 | 插件显示位置，**crayon-editor**提供了两处挂载插件的位置，选择区顶部和底部。分别对应**top** 和 **bottom**，默认 **top**

## 样例

使用

```javascript
const editor = new Crayon({
  id: 'example-vue',
  plugins: [
    'edit',
    'del',
    'insert-img',
    'rotate-img'
  ]
})
```

一个自定义插件可能是这样的

```javascript
// test plugin
export default {
  id: 'demo',
  name: 'demo',
  position: 'bottom',
  display: true
}
```

## 生命周期

如果插件仅仅只是这样，那么它们起不到什么作用，对于插件的能力，我们提供了一系列生命周期函数。


|     生命周期函数     | 参数 |             描述                |
| ------------ | --- | ------------------------------- |
| render |  target | [渲染函数](/life-cycle/render.md)
| click |  target, activeTarget, clean | 点击插件
| clickDom |  target, activeTarget | 点击内容区触发
| activeWillMount |  target, activeTarget | 激活区渲染前
| activeDidMount |  target, activeTarget | 激活区渲染完成
| activeDestroyed |  target, activeTarget | 激活区销毁
| removeContentNode |  target, activeTarget | 删除内容区对象
| addContentNode |  target, activeTarget | 添加内容区对象
| activeContentChange |  activeTarget, params | 内容区发生变化
| contentStyleChange |  activeTarget, params | 内容区发生变化
