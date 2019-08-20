/**
 * 图像处理
 * @param src   处理源路径
 * @param type  处理类型 1:图片 3:视频
 * @param payload 负载参数
 * @param ifSelf 返回源路径
 */
export function handleImages(src, type, payload = { width: 750 }, ifSelf) {
  if (!src) return;
  if (src.includes(ossdomain)) {
    return src.includes("v2jlboss") ? handleoss(true) : handleoss();
  } else if (src.includes(imagedomain)) {
    return handleqiniu();
  } else {
    if (src.includes("jlboss")) {
      return ossdomain + handleoss();
    } else if (src.includes("v2jlboss")) {
      return ossdomain + handleoss(true);
    } else {
      return imagedomain + handleqiniu();
    }
  }
  function handleqiniu() {
    if (src.includes("?")) return;
    if (type === 1 && !ifSelf) {
      return `${src}?imageView2/0/w/${payload.width}/format/jpeg|imageMogr2/auto-orient|imageslim`;
    } else if (type === 3 && !ifSelf) {
      return `${src}?vframe/jpeg/offset/1`;
    } else {
      return src;
    }
  }

  function handleoss(oss) {
    if (src.includes("?")) return;
    if (type === 1 && !ifSelf) {
      return `${src}?x-oss-process=image/resize,w_${payload.width}/auto-orient,1`;
    } else if (type === 3 && !ifSelf) {
      if (oss) {
        return `${src}.jpeg?x-oss-process=image/format,jpg/resize,w_${payload.width}/auto-orient,1`;
      } else {
        return `${src}?x-oss-process=video/snapshot,t_1000,w_${payload.width}`;
      }
    } else {
      return src;
    }
  }
}
/**
 * 时间处理
 * @param {*} value 时间戳 单位s
 * @return 处理后时间格式
 */
export function getDate(value) {
  let time = value * 1000;
  let now = new Date().getTime();
  let res = (now - time) / 1000 / 86400;
  let month = new Date(time).getMonth() + 1;
  let date = new Date(time).getDate();
  let hour = new Date(time).getHours();
  let min = new Date(time).getMinutes();
  let weekType = new Array("日", "一", "二", "三", "四", "五", "六");
  let week = "星期" + weekType[new Date(time).getDay()];
  if (min < 10) {
    min = "0" + min;
  }
  if (new Date().getDate() - new Date(time).getDate() === 0) {
    return hour + ":" + min;
  } else if (new Date().getDate() - new Date(time).getDate() === 1) {
    return "昨天 " + hour + ":" + min;
  } else if (
    new Date().getTime() < new Date(time).getTime() &&
    new Date().getDate() - new Date(time).getDate() < 7 &&
    new Date().getDay() - new Date(time).getDay() > 0
  ) {
    return week + hour + ":" + min;
  } else {
    return month + "月" + date + "日   " + hour + ":" + min;
  }
}
export function utf16toEntities(str) {
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g;
  // 检测utf16字符正则
  str = str.replace(patt, function(char) {
    var H, L, code;
    if (char.length === 2) {
      H = char.charCodeAt(0);
      // 取出高位
      L = char.charCodeAt(1);
      // 取出低位
      code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00;
      // 转换算法
      return "&#" + code + ";";
    } else {
      return char;
    }
  });
  return str;
}

export function entitiestoUtf16(str) {
  if (!str) return;
  // 检测出形如&#12345;形式的字符串
  var strObj = utf16toEntities(str);
  var patt = /&#\d+;/g;
  var H, L, code;
  var arr = strObj.match(patt) || [];
  for (var i = 0; i < arr.length; i++) {
    code = arr[i];
    code = code.replace("&#", "").replace(";", "");
    // 高位
    H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
    // 低位
    L = ((code - 0x10000) % 0x400) + 0xdc00;
    code = "&#" + code + ";";
    var s = String.fromCharCode(H, L);
    strObj = strObj.replace(code, s);
  }
  return strObj;
}

export function isAndroid() {
  let ua = navigator.userAgent;
  return /Android|BlackBerry|IEMobile/i.test(ua);
}
/**
 * 获取默认头像
 * @param {*} id
 */
export function getDefaultHeader(id) {
  return imagedomain + "/photo/user_header" + ((id ? id : 0) % 10) + ".png";
}
/**
 * 功能: 函数防抖， xx秒后才执行函数
 * @param {fn} {Function} {待执行的函数}
 * @param {delay} {Number} {延迟执行的时间(ms)}
 */
export function _debounce(fn, delay) {
  var timer = null;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}
/**
 * 时间规则：
 * 1小时内： xx分钟前
 * 1天内：xx小时前
 * 一周内： xx天前
 * 更早日期：2018-07-12
 * @param {value} {Number} {时间戳，单位ms}
 * @return {time} {Date} {转换后的时间}
 */
export function _normalize(value) {
  let time = isNaN(Number(value)) ? new Date(value).getTime() : value;
  let now = new Date().getTime();
  let oldTime = new Date(time);
  if (time > now) {
    // 如果传入的时间大于当前时间，则直接返回
    return oldTime.getFullYear() + "-" + (oldTime.getMonth() * 1 + 1) + "-" + oldTime.getDate();
  }
  let minute = Math.ceil((now - time) / (1000 * 60));
  if (minute < 60) {
    return `${minute}分钟前`;
  }
  let hour = Math.floor(minute / 60);
  if (hour < 1 * 24) {
    return `${hour}小时前`;
  }
  let date = Math.floor(hour / 24);
  if (date < 8) {
    return `${date}天前`;
  }
  return oldTime.getFullYear() + "-" + (oldTime.getMonth() * 1 + 1) + "-" + oldTime.getDate();
}
/**
 * requestAnimationFrame兼容
 */
export const requestAnimFrame = function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(cb) {
      setTimeout(cb, 20);
    }
  );
};

/**
 * 转换富文本iframe的视频为video
 */
export const _iframeToVedio = function(str) {
  if (!str) {
    return "";
  }
  var ret = str.replace(/<iframe(([\s\S])*?)<\/iframe>/gi, function(data) {
    var url = data.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1];
    return (
      '<video preload="auto" controls ref="videoPanel">\
                                      <source src="' +
      url +
      '" type="video/mp4"> 您的浏览器不支持video标签,请升级浏览器\
                                  </video>'
    );
  });
  return ret;
};

/**
 * 分享到新浪微博
 * @param {el} {Element} {点击分享的按钮id}
 * @param {url} {String} {设置分享的url，默认为当前网页的url}
 * @param {title} {String} {设置分享的title}
 * @param {pic} {String} {设置分享的pic}
 *
 */
export const shareSina = function(el, url = location.href, title, pic = "") {
  var wb_shareBtn = document.getElementById(el),
    wb_url = url, //获取当前页面地址，也可自定义：wb_url = "http://XXX.com"
    wb_appkey = "3993563546", //你的app key
    wb_title = title,
    wb_ralateUid = "6066458025", //微博id，获得你的用户名
    wb_pic = pic,
    wb_language = "zh_cn";
  if (!wb_shareBtn) {
    return;
  }
  wb_shareBtn.setAttribute(
    "href",
    "http://service.weibo.com/share/share.php?url=" +
      wb_url +
      "&appkey=" +
      wb_appkey +
      "&title=" +
      wb_title +
      "&pic=" +
      wb_pic +
      "&ralateUid=" +
      wb_ralateUid +
      "&language=" +
      wb_language +
      ""
  );
};
