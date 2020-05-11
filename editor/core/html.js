import {
  ACTIVE_ID,
  ACTIVE_PLUGIN_ID
} from '../constant'
import {
  getScrollTop,
  getTargetRect,
  stringifyStyle
} from '../utils'

/**
 * 获取默认自定义插件 html
 * @param {*} id 插件 id
 * @param {*} name 插件名
 */
const getDefaultPlugin = (id, name, position) => {
  const style = {
    'font-size': '12px',
    'max-width': '50px',
    'height': '25px',
    'line-height': '25px',
    'color': '#fff',
    'text-align': 'center',
    'background': 'rgba(255,97,97,1)'
  }
  return `<div plugin-type="${id}" style="${stringifyStyle(style)}">${name}</div>`
}

/**
 * 渲染插件
 * @param {*} plugin 
 * @param {*} target 
 */
const renderPlugin = (plugin, target) => {
  const { id, name, html, position, render } = plugin
  if (typeof render === 'function') {
   return render(target)
  }
  return html || getDefaultPlugin(id, name, position)
}

/**
 * 核心区 html工厂
 * 加工输出 html
 */
export default class HtmlFactory {
  initLayout(id = '', html = '') {
    const dom = document.getElementById(id)
    if (!dom) return
    dom.innerHTML = html || dom.innerHTML
  }

  /**
   * 初始化激活区 html
   * @param {*} target
   * @returns
   * @memberof HtmlFactory
   */
  initActiveHtml(target) {
    if (!target) return ''
    let { top, left, width, height } = getTargetRect(target)

    top += getScrollTop()

    const leftMargin = 0

    const html = `
      <div style="z-index:9999;width:${width + leftMargin}px;height:1px;border-top:0.02rem solid rgba(255,97,97,1);order-radius:4px;position:absolute;top:${top}px;left:${left - leftMargin}px;"></div>
      <div style="z-index:9999;width:1px;height:${height}px;border-right:0.02rem solid rgba(255,97,97,1);order-radius:4px;position:absolute;top:${top}px;left:${left + width}px;"></div>
      <div style="z-index:9999;width:${width + leftMargin}px;height:1px;border-top:0.02rem solid rgba(255,97,97,1);order-radius:4px;position:absolute;top:${top + height}px;left:${left - leftMargin}px;"></div>
      <div style="z-index:9999;width:1px;height:${height}px;border-left:0.02rem solid rgba(255,97,97,1);order-radius:4px;position:absolute;top:${top}px;left:${left - leftMargin}px;"></div>
    `
    return html
  }

  /**
   * 初始化插件 html
   *
   * @param {*} target
   * @param {*} plugins
   * @returns
   * @memberof HtmlFactory
   */
  initPluginHtml(target, plugins) {
    if (!target) return ''
    let { top, left, width, height } = getTargetRect(target)

    top += getScrollTop()

    const blockHeight = 0
    const blockWidth = 30

    let topPlugin = ''
    let bottomPlugin = ''
    for (const k in plugins) {
      const { display, position } = plugins[k]
      if (!display) continue

      const html = renderPlugin(plugins[k], target)
      if (position === 'bottom') {
        bottomPlugin += html
      } else if (position === 'top') {
        topPlugin += html
      }
    }

    const html = `
      <div style="z-index:9999;width:${width + blockWidth}px;height:${blockHeight}px;position:absolute;top:${top - blockHeight}px;left:${left - blockWidth / 2}px">
        ${topPlugin}
      </div>
      <div style="z-index:9999;width:${width + blockWidth}px;height:${blockHeight}px;position:absolute;top:${top + height}px;left:${left - blockWidth / 2}px">
        ${bottomPlugin}
      </div>
    `
    return html
  }

  /**
   * 插入插件代码
   * @param {*} target
   * @param {*} lifeCycle
   */
  insertPluginHtml(target, plugins, lifeCycle) {
    const pluginsHtml = this.initPluginHtml(target, plugins)
    const oldDom = document.getElementById(ACTIVE_PLUGIN_ID)
    if (oldDom) {
      this.cleanActive()
    }
    const dom = document.createElement('div')
    dom.setAttribute('id', ACTIVE_PLUGIN_ID)
    dom.setAttribute('life-cycle', lifeCycle)
    dom.innerHTML = pluginsHtml
    document.body.appendChild(dom)
  }

  /**
   * 插入激活区代码
   * @param {*} target
   * @param {*} lifeCycle
   */
  insertActiveHtml(target, lifeCycle) {
    const activeHtml = this.initActiveHtml(target)
    const oldDom = document.getElementById(ACTIVE_ID)
    if (oldDom) {
      this.cleanActive()
    }
    const dom = document.createElement('div')
    dom.setAttribute('id', ACTIVE_ID)
    dom.setAttribute('life-cycle', lifeCycle)
    dom.innerHTML = activeHtml
    document.body.appendChild(dom)
  }

  /**
   * 清除激活区
   */
  cleanActive() {
    const activeDom = document.getElementById(ACTIVE_ID)
    const pluginDom = document.getElementById(ACTIVE_PLUGIN_ID)
    if (activeDom) {
      activeDom.remove()
    }
    if (pluginDom) {
      pluginDom.remove()
    }
    return true
  }

  /**
   * 重置 html，清除附加属性
   */
  resetHtml() {
    const list = document.querySelectorAll("[contenteditable='true']")
    for (const dom of list) {
      dom.setAttribute('contenteditable', 'false')
    }
  }
}
