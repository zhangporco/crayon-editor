/*
 * @Author: zhangchao
 * @Date: 2020-03-09 12:04:32
 * @Last Modified by: zhangchao
 * @Last Modified time: 2020-05-07 19:31:34
 * 编辑器核心区
 */
import throttle from 'lodash/throttle'
import {
  ACTIVE_PLUGIN_ID,
  PLUGIN_FLAG
} from '../constant'

import {
  getElement,
  scrollTo
} from '../utils'

import HtmlFactory from './html'
import PluginFactory from './plugin'
import RecordFactory from './record'
import Operation from './operation'

const htmlFactory = new HtmlFactory()
const pluginFactory = new PluginFactory()
const recordFactory = new RecordFactory()
const operation = new Operation()

let ID = null

let CLICK_CALLBACK = null

let activeTarget = null

/**
 * 插入激活区
 * @param {*} target 点击的 dom 元素
 * @param {*} lifeCycle 是否触发生命周期函数
 */
const insertActive = async (target, lifeCycle = true) => {
  htmlFactory.cleanActive()
  htmlFactory.insertActiveHtml(target, lifeCycle)
  htmlFactory.insertPluginHtml(target, pluginFactory.register(), lifeCycle)
  setTimeout(() => {
    registerPluginClickEvent()
  }, 0)
}

/**
 * 注册 插件 click 监听器
 */
const registerPluginClickEvent = () => {
  const pluginLayout = document.getElementById(ACTIVE_PLUGIN_ID)
  if (!pluginLayout) return
  pluginLayout.addEventListener('click', async (e) => {
    const target = e.target
    pushEvent('click', target, activeTarget, htmlFactory.cleanActive)
  })
}

/**
 * 推送 插件 相关事件
 * @param {*} funcType 事件类型
 * @param {*} target 插件自生 dom
 * @param  {...any} params 参数列表
 */
const pushEvent = (funcType, target, ...params) => {
  const plugins = pluginFactory.register()
  for (const k in plugins) {
    if (typeof plugins[k][funcType] === 'function' && target.getAttribute(PLUGIN_FLAG) === plugins[k].id) {
      plugins[k][funcType](target, ...params)
    }
  }
}

/**
 * 广播生命周期，面向插件
 * @param {*} funcType 生命周期类型
 * @param  {...any} params 参数列表
 */
const broadcast = async (funcType, ...params) => {
  const plugins = pluginFactory.register()
  let i = 0
  for (const k in plugins) {
    if (typeof plugins[k][funcType] === 'function') {
      const next = await plugins[k][funcType](...params)
      typeof next === 'boolean' && next && i++
    } else {
      i++
    }
  }
  return i === Object.keys(plugins).length
}

/**
 * 生命周期函数
 * 点击内容区触发
 * 该周期函数也是其他周期函数 驱动器
 */
const clickDom = () => {
  const layout = document.getElementById(ID)
  if (!layout) return

  // 为防止触发太快，节流处理
  const click = throttle(async (e) => {
    e.stopPropagation()
    e.preventDefault()
    const target = getElement(e.target)

    // todo(Porco) 失去焦点事件，后续将移至 record.js
    target.addEventListener('blur', () => {
      scrollTo()
    })

    // todo(Porco) 监听键盘回车事件，后续将移至 record.js
    document.onkeyup = (e) => {
      const code = e.charCode || e.keyCode
      if (code === 13) {
        activeContentChange(e.target.oldValue, e.target.wholeText)
      }
    }
    let next = true
    if (typeof CLICK_CALLBACK === 'function') {
      next = await CLICK_CALLBACK(target)
      if (next !== true) return
    }
    // 点击的是当前激活编辑区
    if (target.isEqualNode(activeTarget) && target.getAttribute('contenteditable') === 'true') return
    next = await broadcast('clickDom', target, activeTarget)
    if (typeof next === 'boolean' && next) {
      activeTarget = target
      activeWillMount(target)
    }
  }, 100, {
    trailing: false
  })
  layout.addEventListener('click', click)
}

/**
 * 注册 record
 */
const registerRecord = () => {
  recordFactory.destroyAll()
  recordFactory.register('body', document, 'body')
  recordFactory.register(ID, document.getElementById(ID), 'content')
  recordFactory.start()
}

/**
 * 生命周期函数
 * 激活区渲染前
 * @param {*} target 点击的 dom 对象
 */
export const activeWillMount = async (target) => {
  const next = await broadcast('activeWillMount', target, activeTarget)
  if (typeof next === 'boolean' && next) {
    insertActive(target, true)
  }
}

/**
 * 生命周期函数
 * 激活区渲染完成
 * @param {*} target 点击的 dom 对象
 */
export const activeDidMount = async (target) => {
  await broadcast('activeDidMount', target, activeTarget)
}

/**
 * 生命周期函数
 * 激活区销毁
 * @param {*} target 点击的 dom 对象
 */
export const activeDestroyed = async (target) => {
  await broadcast('activeDestroyed', target, activeTarget)
}

/**
 * 生命周期函数
 * 删除内容区对象
 * @param {*} target 点击的 dom 对象
 */
export const removeContentNode = async (target) => {
  await broadcast('removeContentNode', target, activeTarget)
  operation.add(ID, target)
}

/**
 * 生命周期函数
 * 添加内容区对象
 * @param {*} target 点击的 dom 对象
 */
export const addContentNode = async (targets) => {
  await broadcast('addContentNode', targets[5], activeTarget)
  operation.add(ID, targets[5])
}

/**
 * 生命周期函数
 * 内容区发生变化
 * @param {*} target 内容 dom 对象
 */
export const activeContentChange = async (...params) => {
  insertActive(activeTarget, false)
  await broadcast('activeContentChange', activeTarget, ...params)
  operation.add(ID, activeTarget)
}

/**
 * 生命周期函数
 * 内容区发生变化
 * @param {*} target 内容 dom 对象
 */
export const contentStyleChange = async (...params) => {
  insertActive(activeTarget, false)
  await broadcast('contentStyleChange', activeTarget, ...params)
  operation.add(ID, activeTarget)
}

/**
 * 核心区暴露接口
 *
 * @export
 * @class Core
 */
export default class Core {
  /**
   * 初始化编辑器接口
   *
   * @param {*} id 必填，包装内容
   * @param {*} html 选填，内容 html
   * @param {*} plugins 选填，控制插件加载
   * @param {*} clickCallback 选填，点击时通知业务方
   * @returns layoutHtml 包装后的 html
   * @memberof Core
   */
  init(id, html, plugins, clickCallback) {
    ID = id
    CLICK_CALLBACK = clickCallback
    pluginFactory.setPlugins(plugins)
    setTimeout(() => {
      this.initLifeCycle(id)
    }, 0)
    htmlFactory.initLayout(id, html)
  }

  /**
   * 获取编辑器内容接口
   *
   * @returns html 编辑器全部内容
   * @memberof Core
   */
  html() {
    this.reset()
    let html = ''
    const layoutDom = document.getElementById(ID)
    if (layoutDom) {
      html = layoutDom.innerHTML
    }
    return html
  }

  /**
   * 重置
   */
  reset() {
    htmlFactory.cleanActive()
    htmlFactory.resetHtml()
  }

  /**
   * 初始化生命周期函数，供插件订阅
   * 该函数极度重要，后续会考虑将其隐藏
   *
   * @param {*} params
   * @memberof Core
   */
  initLifeCycle(...params) {
    clickDom(...params)
    registerRecord()
    operation.init(ID, this.reset, () => {
      clickDom(...params)
      registerRecord()
    })
  }

  /**
   * 前进
   */
  forward() {
    return operation.forward()
  }

  /**
   * 后退
   */
  back() {
    return operation.back()
  }

  stackInfo() {
    return operation.stackInfo()
  }
}
