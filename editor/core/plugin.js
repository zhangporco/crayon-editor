/* eslint-disable import/namespace */
import * as plugins from '../plugins'

/**
 * 核心区 插件工厂
 * 提供插件注册，检查等功能
 */
export default class PluginFactory {
  constructor() {
    this.plugins = null
  }

  setPlugins(plugins) {
    this.plugins = plugins
  }

  register() {
    const res = []
    for (const k in plugins) {
      if (this.plugins.indexOf(plugins[k].id) > -1) {
        res.push(plugins[k])
      }
    }
    return res
  }
}
