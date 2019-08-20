import Layout from "../../components/layout.js";
import NewsContainer from "../../container/news/index.js";
import React, { Component } from "react";
import { getCatalogue, getArticleNewList, getBannerList } from "../../server/api-news";
export default class News extends Component {
  static async getInitialProps({ req, query, params }) {
    // 在fetch对status做了判断，这里不再单独判断
    let page = 1,
      size = 20;
    let bannerRes = await getBannerList(page, 100);
    let tabRes = await getCatalogue(page, size);
    let articleRes = await getArticleNewList(page, 12);
    let result = {};
    tabRes &&
      tabRes.body.pageList.unshift({
        id: 0,
        name: "最新文章"
      });
    try {
      result["bannerLists"] = bannerRes.body.pageList;
      result["tabLists"] = tabRes.body.pageList;
      result["articleLists"] = articleRes.body.pageList || [];
      result["articleTotal"] = articleRes.body.total || 0;
    } catch (e) {}
    return result;
  }
  render() {
    const { bannerLists, tabLists, articleLists, articleTotal } = this.props;
    return (
      <Layout>
        <NewsContainer bannerLists={bannerLists} tabLists={tabLists} articleLists={articleLists} articleTotal={articleTotal} />
      </Layout>
    );
  }
}
