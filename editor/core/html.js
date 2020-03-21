import {
  ACTIVE_ID,
  ACTIVE_PLUGIN_ID
} from '../constant'
import {
  getScrollTop,
  getTargetRect
} from '../utils'

/**
 * 核心区 html工厂
 * 加工输出 html
 */
export default class HtmlFactory {
  initLayout(id, html) {
    return `<div id=${id}>${html}</div>`
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

    const blockHeight = 10
    const blockWidth = 30

    let topPlugin = ''
    let bottomPlugin = ''
    for (const k in plugins) {
      if (!plugins[k].display) continue
      let html = plugins[k].html || ''
      if (typeof plugins[k].render === 'function') {
        html = plugins[k].render(target)
      }
      if (plugins[k].position) {
        if (plugins[k].position === 'bottom') {
          bottomPlugin += html
        }
      } else {
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
