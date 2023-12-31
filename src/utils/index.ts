import dayjs from "dayjs"

/** 格式化时间 */
export const formatDateTime = (time: string | number | Date) => {
  return time ? dayjs(new Date(time)).format("YYYY-MM-DD HH:mm:ss") : "N/A"
}

export const formatMinute = (totalMinutes : string | number) => {
  const hours = Math.floor(Number(totalMinutes) / 60);
  const minutes = Number(totalMinutes) % 60;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return formattedTime;
}


/** 用 JS 获取全局 css 变量 */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = ""
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}

/** 用 JS 设置全局 CSS 变量 */
export const setCssVariableValue = (cssVariableName: string, cssVariableValue: string) => {
  try {
    document.documentElement.style.setProperty(cssVariableName, cssVariableValue)
  } catch (error) {
    console.error(error)
  }
}

export const createFileToExport = (data: any, fileName:string) => {
  const type = data.contentType;
  const url = window.URL.createObjectURL(
    new Blob([data.data], {
      type: type
    })
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName || data.fileName);
  document.body.appendChild(link);
  link.click();
}