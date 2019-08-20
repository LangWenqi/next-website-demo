// import fetchBase from "isomorphic-fetch";
import { toString } from "query-parse";
require('es6-promise').polyfill();
require('isomorphic-fetch');
/**
 * 建议所有的产品都为xhr设置一个统一入口， 方便加上统一逻辑.
 */
export default function fetchBase(url, opt = {}, cors = false) {
  opt.method = opt.method || "GET";
  opt.credentials = "include";
  opt.rejectUnauthorized = false;
  // opt.headers = {};
  if (opt.data) {
    if (/GET|HEAD/i.test(opt.method)) {
      if (toString(opt.data) !== "") {
        url = `${url}?${toString(opt.data)}`;
      }
    } else {
      if (!opt.headers) {
        opt.headers = { "Content-Type": "application/x-www-form-urlencoded" };
        opt.body = toString(opt.data);
      } else {
        opt.body = JSON.stringify(opt.data);
      }
    }
  }
  return fetch(url, opt)
    .then(response => {
      if (!response.ok) {
        throw new Error("Http Request Error");
      }
      if (opt.raw) {
        return response.text();
      } else {
        return response.json().then(result => {
          if (opt.rawJson) {
            return result;
          }
          let code = result.code ? result.code : result.status;
          switch (code * 1) {
            case 200:
              return result;
            default:
              console.log(result.msg || result.message);
              return result;
          }
        });
      }
    })
    .catch(e => {
      console.log(e);
    });
}
