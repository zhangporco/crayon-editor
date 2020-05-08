/**
 * @Author: 张超
 * @Date: 2020-03-06 16:00:03
 * @Last Modified by: zhangchao
 * @Last Modified time: 2020-05-07 19:44:32
 * @ChangeLog
 *   v1.0.0 http://cf.dui88.com/pages/viewpage.action?pageId=51163432 移动端文章二次编辑 张超
 */
import Core from './core/core'

const core = new Core()

/**
 * 移动端文本编辑器 Editor
 */
export default class Editor {
  constructor({
    id,
    plugins,
    click
  }) {
    this.id = id
    this.plugins = plugins
    this.clickCallback = click
  }

  /**
   * 初始化接口
   * @param {*} html
   */
  init(html) {
    core.init(this.id, html, this.plugins, this.clickCallback)
  }

  /**
   * 获取 html
   */
  html() {
    return core.html()
  }

  /**
   * 重置
   */
  reset() {
    return core.reset()
  }

  /**
   * 前进
   */
  forward() {
    return core.forward()
  }

  /**
   * 后退
   */
  back() {
    return core.back()
  }

  /**
   * 返回操作栈信息
   */
  stackInfo() {
    return core.stackInfo()
  }
}
