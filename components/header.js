import React, { Component } from "react";
import { Button, Menu } from "antd";
import { links } from "../util/const";
import Link from "next/link";
import Router from "next/router";
import Tips from "./tips.js";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: ""
    };
  }
  componentDidMount() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth <= 768) {
      window.location.href = "https://html.bestjlb.com/share/pages/mobildWebsite/index.html";
    }
    this.setState({
      current: Router.pathname.split("/")[1] || "index"
    });

    // if (!document.getElementById("sozz")) {
    //   const src =
    //     document.location.protocol == "http:"
    //       ? "http://js.passport.qihucdn.com/11.0.1.js?21212a5be129657d6c2651ad96f53b45"
    //       : "https://jspassport.ssl.qhimg.com/11.0.1.js?21212a5be129657d6c2651ad96f53b45";
    //   const hm = document.createElement("script");
    //   hm.src = src;
    //   hm.id = "sozz";
    //   const s = document.getElementsByTagName("script")[0];
    //   s.parentNode.insertBefore(hm, s);
    // }
    // -------------
    // if (sessionStorage.getItem("firstBaidu") != 1) {
    //   var _hmt = _hmt || [];
    //   (function() {
    //     var hm = document.createElement("script");
    //     hm.src = "https://hm.baidu.com/hm.js?2b438f74a30b96b4f3c9b372d1942a7f";
    //     var s = document.getElementsByTagName("script")[0];
    //     s.parentNode.insertBefore(hm, s);
    //   })();
    // }
    // sessionStorage.setItem("firstBaidu", "1");
  }
  handleClick = e => {
    Router.push(`/${e.key}`);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  toZxz() {
    window.open("https://web.zhixuezhen.com");
  }
  getLinks() {
    return links.map(item => {
      return (
        <Menu.Item key={item.key}>
          <div>{item.title}</div>
        </Menu.Item>
      );
    });
  }
  showTips() {
    window.open("http://pc.bestjlb.com");
    // this.refs.tipsComponents.showTips();
  }
  render() {
    return (
      <div>
        <header className="components-header">
          <div className="header-container">
            <div className="header-logo" />
            <div className="header-links">
              <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                {this.getLinks()}
              </Menu>
              <Button onClick={this.toZxz} type="primary" ghost className="link-btn">
                教务后台登录
                {/* 机构后台 */}
              </Button>
              <Button
                onClick={() => {
                  this.showTips();
                }}
                type="primary"
                ghost
                className="link-btn"
              >
                网页版
              </Button>
            </div>
          </div>
        </header>
        <Tips ref="tipsComponents" />
      </div>
    );
  }
}
export default Header;
