import { CUSTOM_TAG_FLAG } from '../constant'

import img from '../images/insert-img.png'

const INPUT_FILE_ID = 'insert-img-file'

/**
 * 选取本地相册 插入图片
 * @param {*} activeTarget
 * @param {*} clean
 */
const insertLocalImg = (activeTarget, clean) => {
  const fileInput = document.getElementById(INPUT_FILE_ID)
  fileInput.click()
  fileInput.addEventListener('change', async (e) => {
    const file = fileInput.files[0]
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      let data = e.target.result
      const html = `
        ${activeTarget.outerHTML}
        </br>
        <div style="display:flex;justify-content: center;flex-wrap: wrap;">
          <img style="margin-top:20px;width:80%;height:100%!important;" src=${data} />
        </div>
      `
      activeTarget.outerHTML = html
      clean()
    }
    reader.readAsDataURL(file)
  })
}

// 插入图片
export default {
  id: 'insert-img',
  name: '插入图片',
  img: '',
  html: `
    <div plugin-type="insert-img" style="width:84px;height:25px;position:absolute;right:13px;top:-7px;">
      <img plugin-type="insert-img" src="${img}" style="width:100%;height:100%;">
      <input ${CUSTOM_TAG_FLAG} type="file" id=${INPUT_FILE_ID} style="display:none">
    </div>
  `,
  position: 'bottom',
  display: true,
  click: async (self, activeTarget, clean) => {
    if (!activeTarget) return
    insertLocalImg(activeTarget, clean)
  }
}
