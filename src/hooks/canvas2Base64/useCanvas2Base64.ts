import { onMounted } from 'vue'
type Options = {
  el: string
}

export const useCanvas2Base64 = (options: Options): Promise<{baseUrl: string}> => {
  return new Promise((resolve) => {
    onMounted(() => {
      // 获取图片节点
      let img: HTMLImageElement = document.querySelector(options.el) as HTMLImageElement
      // 防止base64解析错误
      img.onload = () => {
        resolve({
          baseUrl: canvas2Base64(img)
        })
      }
    })
    const canvas2Base64 = (el: HTMLImageElement) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = el.width
      canvas.height = el.height
      // 动态画图片
      ctx?.drawImage(el, 0, 0, canvas.width, canvas.height)
      // toDataURL：导出base64
      return canvas.toDataURL('image/jpg')
    }
  })
}