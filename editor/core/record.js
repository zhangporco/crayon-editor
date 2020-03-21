import throttle from 'lodash/throttle'
import {
  activeDidMount,
  activeDestroyed,
  removeContentNode,
  addContentNode,
  activeContentChange,
  contentStyleChange
} from './core'

let OBSERVERS = []

/**
 * 监听 body 分发器
 *
 * @param {*} mutationsList
 * @memberof RecordFactory
 */
const changeBody = (mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.removedNodes && mutation.removedNodes.length && mutation.removedNodes[0].getAttribute('life-cycle') === 'true') {
      removeActiveNodes(mutation)
    }
    if (mutation.addedNodes && mutation.addedNodes.length && mutation.addedNodes[0].getAttribute('life-cycle') === 'true') {
      addedActiveNodes(mutation)
    }
  }
}

/**
 * 监听 content 内容区 分发器
 * @param {*} mutationsList
 */
const changeContent = (mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.removedNodes && mutation.removedNodes.length) {
      removeContentNodes(mutation)
    }
    if (mutation.addedNodes && mutation.addedNodes.length) {
      addedContentNodes(mutation)
    }
    if (mutation.target.wholeText && mutation.oldValue !== mutation.target.wholeText) {
      contentChange(mutation)
    }
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      styleChange(mutation)
    }
  }
}

const removeActiveNodes = throttle((mutation) => {
  activeDestroyed(mutation.removedNodes[0])
}, 100, {
  leading: true,
  trailing: false
})

const addedActiveNodes = throttle((mutation) => {
  activeDidMount(mutation.addedNodes[0])
}, 100, {
  leading: true,
  trailing: false
})

const removeContentNodes = throttle((mutation) => {
  removeContentNode(mutation.removedNodes[0])
}, 100, {
  leading: true,
  trailing: false
})

const addedContentNodes = throttle((mutation) => {
  addContentNode(mutation.addedNodes)
}, 100, {
  leading: true,
  trailing: false
})

const contentChange = throttle((mutation) => {
  activeContentChange(mutation.oldValue, mutation.target.wholeText)
}, 100, {
  leading: true,
  trailing: false
})

const styleChange = throttle((mutation) => {
  contentStyleChange(mutation)
}, 100, {
  leading: true,
  trailing: false
})

const OB_TYPE = [
  {
    id: 'body',
    callback: changeBody
  },
  {
    id: 'content',
    callback: changeContent
  }
]

/**
 * 核心区 操作栈工厂
 * 提供dom 监听、dom 变化捕捉、历史记录等功能
 *
 * @export
 * @class RecordFactory
 */
export default class RecordFactory {
  /**
   * 注册监听器
   *
   * @param {*} id
   * @param {*} target
   * @param {string} [type='body'] // 目前 type 仅支持 body、content 两种类型
   * @param {boolean} [config={
   *     childList: true,
   *     characterData: true,
   *     subtree: true,
   *     characterDataOldValue: true,
   *     attributes: true,
   *     attributeOldValue: true
   *   }]
   * @memberof RecordFactory
   */
  register(id, target, type = OB_TYPE[0].id, config = {
    childList: true,
    characterData: true,
    subtree: true,
    characterDataOldValue: true,
    attributes: true,
    attributeOldValue: true
  }) {
    if (!target) return

    OBSERVERS.push({
      id,
      target,
      type,
      config
    })
  }

  /**
   * 启动监听器
   *
   * @memberof RecordFactory
   */
  start() {
    for (const ob of OBSERVERS) {
      const OB = OB_TYPE.filter((v) => {
        return v.id === ob.type
      })
      const observer = new MutationObserver(OB[0].callback)
      observer.observe(ob.target, ob.config)
      ob.observer = observer
    }
  }

  destroyById(id) {
    const obs = []
    for (const ob of OBSERVERS) {
      if (id === ob.id) {
        ob.observer.disconnect()
      } else {
        obs.push(ob)
      }
    }
    OBSERVERS = obs
  }

  destroyAll() {
    for (const ob of OBSERVERS) {
      ob.observer.disconnect()
    }
    OBSERVERS = []
  }
}
