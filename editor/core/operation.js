import throttle from 'lodash/throttle'
import {
  getScrollTop
} from '../utils'

// 栈数组
let stack = []

// 当前执行栈下标
let index = -1

// 重置函数
let reset = null

// 初始化函数
let init = null

/**
 * 截取 stack
 */
const splice = () => {
  if (index < stack.length - 1) {
    stack = stack.splice(0, index + 1)
  }
}

/**
 * 制造 操作对象
 * @param {*} id
 * @param {*} target
 */
const makeOp = (id, target) => {
  const content = document.getElementById(id).outerHTML
  if (!content) return
  return {
    id,
    content,
    target,
    scrollTop: getScrollTop()
  }
}

/**
 * 压栈，节流处理（防止高频触发，前进、回退都属于高性能消耗操作）
 */
const push = throttle((op) => {
  if (stack.length === 1) {
    stack[0].scrollTop = getScrollTop()
  }
  splice()
  stack.push(op)
  index++
}, 300, {
  leading: true,
  trailing: false
})

/**
 * 回退 stack
 */
const back = () => {
  if (index < 1) return stack[0]
  return stack[--index]
}

/**
 * 前进 stack
 */
const forward = () => {
  if (!stack.length) return
  if (index >= stack.length - 1) return stack[stack.length - 1]
  return stack[++index]
}

/**
 * 渲染
 * @param {*} op
 */
const render = (op) => {
  if (!op) return
  document.getElementById(op.id).outerHTML = op.content
  reset()
  init()
  document.documentElement.scrollTop = op.scrollTop
}

/**
 * 操作栈 类
 *
 * @export
 * @class Operation
 */
export default class Operation {
  /**
   * 初始化
   *
   * @param {*} id
   * @param {*} resetCB
   * @param {*} initCB
   * @memberof Operation
   */
  init(id, resetCB, initCB) {
    reset = resetCB
    init = initCB
    setTimeout(() => {
      const op = makeOp(id)
      if (!op) return
      push(op)
    }, 0)
  }

  /**
   * 添加栈对象
   *
   * @param {*} id
   * @param {*} target
   * @memberof Operation
   */
  add(id, target) {
    setTimeout(() => {
      const op = makeOp(id, target)
      if (!op) return
      push(op)
    }, 0)
  }

  /**
   * 回退
   *
   * @returns
   * @memberof Operation
   */
  back() {
    const op = back()
    render(op)
    return {
      operation: op,
      index,
      stackSize: stack.length
    }
  }

  /**
   * 前进
   *
   * @returns
   * @memberof Operation
   */
  forward() {
    const op = forward()
    render(op)
    return {
      operation: op,
      index,
      stackSize: stack.length
    }
  }

  /**
   * 返回操作栈信息
   *
   * @returns
   * @memberof Operation
   */
  stackInfo() {
    return {
      index,
      stackSize: stack.length
    }
  }
}
