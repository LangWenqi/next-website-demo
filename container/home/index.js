import React, { Component } from "react";
import { Row, Col, Button, Carousel } from "antd";
import Link from "next/link";
import Title from "./title";
import Brand from "../../components/brand.js";
import Tips from "../../components/tips.js";
import { getArticleList } from "../../server/api";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }
  componentDidMount() {
    /* getArticleList(1, 7).then((data) => {
      let arr = []
      if (data.rs.pageList && data.rs.pageList.length > 4) {
        for (let index = 0; index < 5; index++) {
          arr.push(data.rs.pageList[index])
        }
      }
      this.setState({
        list: arr.length > 0 ? arr : data.rs.pageList
      })
    }) */
  }
  getBannerRender() {
    /* let settings = {
      autoplay: true,
      infinite: true,
      speed: 1000,
      autoplaySpeed: 5000
    }; */
    return (
      <div className="home-panel-banner">
        {/* <Carousel {...settings}> */}
        <div className="banner">
          <div className="con">
            <div className="transitionLeft">
              <img className="logo" src="../../static/home-banner-logo.png" alt="" />
              <p>让品质教育成就美好未来</p>
            </div>
            <img className="btn" onClick={() => {
              this.showTips()
            }} src="../../static/home-banner-btn.png" alt="" />
            <img className="img" src="../../static/banner.png" alt="" />
          </div>
          <div className="call">
            <div className="desc">在线客服</div>
            <div className="phoneNum">0571-28880088</div>
          </div>
        </div>
        {/* </Carousel> */}
      </div>
    );
  }
  getTypeRender() {
    return (
      <div className="home-panel-type">
        <Title title={"为教育培训机构提供一站式解决方案"} />
        <div className="show-type">
          <Row gutter={0}>
            <Col span={8}>
              <img src="../../static/home-type-teachers.png" alt="" />
              <div className="typeName">老师</div>
              <div className="typeText">真减负<br />轻松实现班级高效管理</div>
            </Col>
            <Col span={8}>
              <img src="../../static/home-type-org.png" alt="" />
              <div className="typeName">机构</div>
              <div className="typeText">好管理<br />全面掌握机构运营状况</div>
            </Col>
            <Col span={8}>
              <img src="../../static/home-type-parents.png" alt="" />
              <div className="typeName">家长</div>
              <div className="typeText">更放心<br />随时了解孩子在校情况</div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  getMapRender() {
    return (
      <div className="home-panel-map">
        <Title title={"指学针用户覆盖面"} />
        <div className="content">超过3000家机构，近百万用户的共同选择</div>
        <div className="bg">
        </div>
      </div>
    );
  }
  getBrandRender() {
    return <Brand />;
  }
  getDynamicRender() {
    return (
      <div className="home-panel-dynamic">
        {
          this.state.list.length > 0 ? <div>
            <Title title={"相关动态"} />
            <div className="danamicContainer">
              <div>
                <Link href={`/dynamic/detail?articleId=${this.state.list.length > 0 ? this.state.list[0].tid : ''}`}>
                  <div className="cursor">
                    <div className="showImg">
                      <img src={this.state.list.length > 0 ? this.state.list[0].coverImg : ''} alt="" />
                    </div>
                    <div className="title">{this.state.list.length > 0 ? this.state.list[0].title : ''}</div>
                    <div className="content">
                      {this.state.list.length > 0 ? this.state.list[0].summary : ''}
                    </div>
                  </div>
                </Link>
                <Link href={`/dynamic/list`}>
                  <Button type="primary" className="more">
                    查看更多
                </Button>
                </Link>
              </div>
              <div>
                <ul>
                  {
                    this.state.list.map((item, index) => {
                      return index == 0 ? null :
                        <Link key={index} href={`/dynamic/detail?articleId=${item.tid}`}>
                          <li key={index}>
                            <img src={item.coverImg} alt="" />
                            <div className="itemDynamic">
                              <div className="title">{item.title}</div>
                              <div className="content">{item.summary}</div>
                            </div>
                          </li>
                        </Link>
                    })
                  }
                </ul>
              </div>
            </div>
          </div> : null
        }

      </div>
    );
  }
  showTips() {
    this.refs.tipsComponents.showTips();
  }
  render() {
    return (
      <div>
        {this.getBannerRender()}
        {this.getTypeRender()}
        {this.getMapRender()}
        {this.getBrandRender()}
        {/* {this.getDynamicRender()} */}
        <Tips ref="tipsComponents"></Tips>
      </div>
    );
  }
}
export default Home;
