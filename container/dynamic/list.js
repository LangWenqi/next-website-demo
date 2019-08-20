import React, { Component } from "react";
import { Pagination } from "antd";
import Link from "next/link";
import { getArticleList } from "../../server/api";
import { getDate } from '../../util/index'
class DynamicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicList: [],
      total: 10
    };
  }
  componentDidMount() {
    this.getList(1)
  }
  getList(page) {
    getArticleList(page, 7).then((data) => {
      if (data.rs.pageList && data.rs.pageList.length > 0) {
        data.rs.pageList.forEach((el) => {
          el.createTime = getDate(el.createTime)
        })
      }
      this.setState({
        dynamicList: data.rs.pageList || [],
        total: data.rs.count
      })
    })
  }
  pageChange(pageNumber) {
    this.getList(pageNumber)
  }
  render() {
    return (
      <div className="dynamic-container">
        <div className="dynamic-banner" />
        <div className="dynamic-data-wrapper">
          <div className="dynamic-data-title">
            <div className="title-yellow">公司动态</div>
            <div className="title-gray">COMPANY NEWS</div>
          </div>
          <div className="dynamic-data-list">
            {this.state.dynamicList && this.state.dynamicList.length > 0
              ? this.state.dynamicList.map((item, index) => {
                return (
                  <DynamicListItem
                    item={item}
                    key={index}
                    history={this.props.history}
                  />
                );
              })
              : null}
          </div>
          <div className="dynamic-pagination">
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              total={this.state.total}
              onChange={this.pageChange.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

const DynamicListItem = props => {
  return (
    <Link href={`/dynamic/detail?articleId=${props.item.tid}`}>
      <div className="dynamic-data-item">
        <div className="dynamic-data-item-img">
          <img src={props.item.coverImg} alt="" />
        </div>
        <div className="dynamic-data-item-content">
          <div className="dynamic-title dynamic-title-list">
            {props.item.title}
          </div>
          <div className="dynamic-content dynamic-content-list">
            {props.item.summary}
          </div>
          <div className="dynamic-small">
            <span>{props.item.createTime}</span>
            {/* <span>来源于南都报刊</span> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DynamicList;
