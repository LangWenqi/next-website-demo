import fetchBase from "../util/fetch";
export function getUrlHost() {
  let domains, applyDomains;
  let uri = window.location.href;
  if (uri.indexOf("test") > -1) {
    domains = "https://test-system.bestjlb.com/";
    applyDomains = "https://test-html.bestjlb.com/";
  } else if (uri.indexOf("bestjlb") > -1 || uri.indexOf("zhixuezhen") > -1) {
    domains = "https://web.zhixuezhen.com/";
    applyDomains = "https://html.bestjlb.com/";
  } else {
    domains = "http://10.10.10.22:8504/jlb-web-front-sys/";
    // applyDomains = "http://10.10.10.22:8001/jlb-web-front-app/";
    applyDomains = "https://test-html.bestjlb.com/";
  }
  return {
    domain: domains,
    applyDomain: applyDomains
  };
}
/**
 * 获取文章列表
 * @param {*} page，viewType，pageSize
 */
export function getArticleList(page, viewType) {
  return fetchBase(getUrlHost().domain + "jlbsys/discover/otb/getArticlePager.shtml", {
    method: "POST",
    data: {
      page,
      viewType,
      pageSize: 10
    }
  });
}
/**
 * 获取文章详情
 * @param {*} articleId
 */
export function getArticleDetail(articleId) {
  return fetchBase(getUrlHost().domain + "jlbsys/discover/getArticleDetail.shtml", {
    method: "POST",
    data: {
      articleId
    }
  });
}
/**
 * 保存意愿信息
 * @param {*} mobile，userName，orgName
 */
export function saveShareHead(data) {
  return fetchBase(getUrlHost().applyDomain + "jlbapp/intention/add.shtml", {
    method: "POST",
    data: data
  });
}
