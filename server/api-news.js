import fetchBase from "../util/fetch";

let domains;
let env = process.env.custom_env;

// 根据环境变量设置请求的url参数
if (env === "production") {
  domains = "https://web.zhixuezhen.com/jlbsys/";
} else if (env === "test") {
  domains = "https://test-system.bestjlb.com/jlbsys/";
} else {
  // domains = "http://10.10.10.22:8504/jlb-web-front-sys/jlbsys/";
  domains = "https://test-system.bestjlb.com/jlbsys/";
}
/**
 * 获取banner列表
 */
export function getBannerList(pageNo = 1, pageSize = 20) {
  return fetchBase(domains + "news/banner/list.shtml", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      api_name: "news.banner.list",
      request_time: new Date().getTime(),
      param: {
        pageNo,
        pageSize
      }
    }
  });
}
/**
 * 新闻中心bannerPv统计接口
 */
export function addBannerPv(id) {
  return fetchBase(domains + "news/banner/addPv.shtml", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      api_name: "news.banner.addPv",
      request_time: new Date().getTime(),
      param: {
        id
      }
    }
  });
}

/**
 * 获取栏目列表
 */
export function getCatalogue(pageNo = 1, pageSize = 20) {
  return fetchBase(domains + "news/catalogue/list.shtml", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      api_name: "news.catalogue.list",
      request_time: new Date().getTime(),
      param: {
        status: 2,
        pageNo,
        pageSize
      }
    }
  });
}

/**
 * 查询文章列表
 * @param catalogueId {int} 栏目id
 * @param pageNo {int} 分页page
 * @param pageSize {int} 分页size
 */
export function getArticleList(catalogueId, pageNo, pageSize) {
  return fetchBase(domains + "news/article/list.shtml", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      api_name: "news.article.list",
      request_time: new Date().getTime(),
      param: {
        catalogueId,
        pageNo,
        pageSize,
        status: 2
      }
    }
  });
}

/**
 * 最新文章列表
 * @param pageNo {int} 分页page
 * @param pageSize {int} 分页size
 */
export function getArticleNewList(pageNo, pageSize) {
  return fetchBase(domains + "news/article/newList.shtml", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      api_name: "news.article.newList",
      request_time: new Date().getTime(),
      param: {
        pageNo,
        pageSize
      }
    }
  });
}

/**
 * 获取文章内容
 * @param id {int} 文章id
 */
export function getArticleDetail(id, order) {
  return fetchBase(domains + "news/article/get.shtml", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      api_name: "news.article.get",
      request_time: new Date().getTime(),
      param: {
        id,
        order
      }
    }
  });
}
