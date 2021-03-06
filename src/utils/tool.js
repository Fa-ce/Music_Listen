export function debounce(fn, delay) {
  let timer = null;

  //返回的函数是用户每次实际调用的函数
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn && fn.apply(this, args)
    }, delay)
  }
}
// 时间戳方案--节流
export function throttle(fn, wait) {
  var pre = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - pre >= wait) {
      fn.apply(context, args);
      pre = Date.now();
    }
  }
}

/**数组去重 */
export function distinct(arr) {
  let newArr = [];
  let isExist = false;
  for (let i = 0, length = arr.length; i < length; i++) {

    for (let j = i + 1; j < length; j++) {
      if (arr[i].name == arr[j].name) {
        isExist = true;
        break;
      }
    }
    if (!isExist) {
      newArr.push(arr[i]);
    }
    isExist = false;
  }
  return newArr;
}

/**时间格式化函数 
 * @param date          @new Date()一个Date对象
 * @param fmt           时间格式化时间，'yy-MM-dd'
*/
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};
