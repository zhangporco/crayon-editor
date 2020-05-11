/* eslint-disable import/namespace */
import * as plugins from '../plugins'
import { PLUGIN_POSITION } from '../constant'

const format = (modules) => {
  for (const k of Object.keys(modules)) {
    const plugin = modules[k]
    plugin.id = plugin.id || ''
    plugin.name = plugin.name || plugin.id
    plugin.display = typeof plugin.display === 'boolean' ? plugin.display : false
    plugin.position = PLUGIN_POSITION.indexOf(plugin.position) > -1 ? plugin.position : PLUGIN_POSITION[0]
  }
  return modules
}

/**
 * 核心区 插件工厂
 * 提供插件注册，检查等功能
 */
export default class PluginFactory {
  constructor() {
    this.ids = []
    this.plugins = {}
  }

  /**
   * 初始化插件
   * @param {*} ps 
   */
  setPlugins(ps) {
    const ids = []
    const modules = plugins
    for (const v of ps) {
      if (typeof v === 'string') {
        ids.push(v)
      } else {
        ids.push(v.id)
        modules[v.id] = v
      }
    }
    this.ids = ids
    this.plugins = format(modules)
  }

  register() {
    const res = []
    for (const k in this.plugins) {
      if (this.ids.indexOf(this.plugins[k].id) > -1) {
        res.push(this.plugins[k])
      }
    }
    return res
  }
}
