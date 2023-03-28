export function formatTime(value, formatStr) {
  let date = null;
  if (value) {
    try {
      if (typeof value !== 'number' && !(/[^\d]/.test(value))) {
        date = new Date(parseInt(value))
      } else {
        date = new Date(value);
      }
    }catch(e) {
      console.error('时间格式化错误:',value);
    }
  }
  if (!date) {
    return '';
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  }
  
  if (/(y+)/.test(formatStr)) {
    formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length === 1) ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }

  return formatStr;
}