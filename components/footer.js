import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
class Footer extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = e => {
    Router.push(`/${e}`);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  render() {
    return (
      <footer className="component-footer">
        <div className="footer-container">
          <div className="footer-panel">
            <div className="footer-linkPanel">
              <div className="link-panel">
                <div
                  className="linkText"
                  onClick={() => {
                    this.handleClick("product");
                  }}
                >
                  产品介绍
                </div>
                <div
                  className="linkText"
                  onClick={() => {
                    this.handleClick("news");
                  }}
                >
                  新闻中心
                </div>
                <div
                  className="linkText"
                  onClick={() => {
                    this.handleClick("help");
                  }}
                >
                  帮助中心
                </div>
              </div>
              <div className="link-panel">
                <div
                  className="linkText"
                  onClick={() => {
                    this.handleClick("city");
                  }}
                >
                  渠道合作
                </div>
                <div
                  className="linkText"
                  onClick={() => {
                    this.handleClick("case");
                  }}
                >
                  合作案例
                </div>
                <div
                  className="linkText"
                  onClick={() => {
                    this.handleClick("about");
                  }}
                >
                  关于我们
                </div>
              </div>
            </div>
            <div className="footer-line" />
            <div className="footer-erCodePanel">
              <div className="erCode">
                <div className="erCodeImg">
                  <img src="/static/downloadApp.png" alt="" />
                </div>
                <div className="text">扫码下载APP</div>
              </div>
              <div className="erCode">
                <div className="erCodeImg">
                  <img src="/static/PublicNumber.png" alt="" />
                </div>
                <div className="text">扫码关注公众号</div>
              </div>
            </div>
          </div>
          <div className="footerInfo">
            <div className="info">商家合作：bd@zhixuezhen.com</div>
            <div className="info">支持邮箱：support@zhixuezhen.com</div>
            <div className="info">客服电话：0571-28880088</div>
          </div>
          <div className="footerAddress">公司地址：浙江省杭州市西湖区文一西路588号西溪首座A2-1（11号楼）8楼</div>
          <div className="footerBei">Copyright © 指学针 浙ICP备 16037813号-3</div>
        </div>
      </footer>
    );
  }
}
export default Footer;
