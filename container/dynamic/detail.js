import React, { Component } from "react";
import { Pagination } from "antd";
import Link from "next/link";
import Router from "next/router";
import { getArticleDetail } from "../../server/api";
import { getDate } from '../../util/index'
class DynamicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicDetail: ''
    };
  }
  componentDidMount() {
    getArticleDetail(Router.query.articleId).then((data) => {
      data.rs.createTime = getDate(data.rs.createTime)
      data.rs.content = data.rs.content.replace(/<iframe(([\s\S])*?)<\/iframe>/gi, function (data) {
        var url = data.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1];
        return (
          `<video preload="auto" autoplay controls>\
              <source src="${url}" type="video/mp4"> 您的浏览器不支持video标签,请升级浏览器\
            </video>`
        );
      });
      this.setState({
        dynamicDetail: data.rs || '',
      })
    })
  }
  render() {
    return (
      <div className="dynamic-container">
        <div className="dynamic-banner" />
        <div className="dynamic-data-wrapper">
          <div className="dynamic-data-title">
            <Link href={`/dynamic/list`}>
              <div className="title-wrapper">
                <div className="title-back" />
                <div className="title-yellow">返回列表</div>
              </div>
            </Link>
          </div>
          <div className="dynamic-data-detail">
            <div className="title">{this.state.dynamicDetail.title}</div>
            <div className="time">{this.state.dynamicDetail.createTime}</div>
            <div className="content" dangerouslySetInnerHTML={{ __html: this.state.dynamicDetail.content }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default DynamicDetail;
