import Layout from "../../components/layout.js";
import Detail from "../../container/news-detail";
import React, { Component } from "react";
import { getArticleDetail } from "../../server/api-news";
export default class NewsDetail extends Component {
  static async getInitialProps({ req, query, params }) {
    // 页面初始化，getInitialProps只会在服务端执行
    // 如果通过Link或者Router跳转，只会在客户端执行
    // 该函数只会在'pages'页面执行，不会在子组件执行
    // 函数return的值为Object，会被this.props读取
    let articleId = query.id;
    let order = query.order;
    let { body } = await getArticleDetail(articleId, order);
    let { target, previous, next } = body;
    let { id, author, content, coverUrl, summary, title, defaultNum, pvNum, status, released } = target;
    let result = {
      id: id,
      order: order,
      articleId: articleId, // 文章id
      author: author, // 文章作者
      content: content, // 文章内容
      coverUrl: coverUrl, // 封面图
      summary: summary, // 标题
      title: title, // 简介
      count: defaultNum * 1 + pvNum * 1, // 多少人查看
      status: status, // 0正常 1删除 2发布
      time: released,
      previous,
      next
    };
    return result;
  }
  render() {
    return (
      <Layout>
        <Detail {...this.props} />
      </Layout>
    );
  }
}
