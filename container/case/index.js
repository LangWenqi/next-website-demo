import React, { Component } from "react";
import { Button, Carousel } from "antd";
import Brand from "../../components/brand";
import Title from "../../container/home/title";
import { userEvaluate } from "../../util/const";
import Tips from "../../components/tips.js";
function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <img className="slideImg" src="../../static/case-right.png" alt="" /></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <img className="slideImg" src="../../static/case-left.png" alt="" /></div>
  );
}
class Case extends Component {
  getBanner() {
    return (
      <div className="case-banner">
        <div className="banner-title">指学针</div>
        <div className="banner-des">让品质教育成就美好未来</div>
        <div className="banner-des">为教育培训机构提供一站式解决方案</div>
        <Button type="primary" className="banner-freeBtn" onClick={() => {
          this.showTips()
        }}>
          免费体验
        </Button>
      </div>
    );
  }
  getUserAssess() {
    let settings = {
      autoplay: true,
      dots: false,
      infinite: true,
      arrows: true,
      speed: 2000,
      slidesToShow: 3,
      slidesToScroll: 3,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div className="case-assess">
        <Title title={"用户评价"} />
        <div className="case-assess-content" >
          <Carousel ref="carousel" {...settings}>
            {userEvaluate.map((item, index) => {
              return <div key={index} >
                <div className="item">
                  <img className="avator" src={`../../static/case-avator-${index + 1}.png`} alt="" />
                  <div className="title">{item.title}</div>
                  <div className="desc" dangerouslySetInnerHTML={{ __html: item.desc }}></div>
                </div>
              </div>;
            })}
          </Carousel>
        </div>
      </div>
    );
  }
  getPartner() {
    return (
      <div className="case-partner">
        <Title title={"合作伙伴"} />
        <div className="partnerList">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
            return <img style={{ borderBottom: index < 4 ? '1px solid #ececec' : '0' }} src={`../../static/case-partner-${item}.png`} key={index} alt="" />;
          })}
        </div>
      </div>
    );
  }
  showTips() {
    this.refs.tipsComponents.showTips();
  }
  render() {
    return (
      <div className="case-container">
        {this.getBanner()}
        {this.getUserAssess()}
        <Brand />
        {this.getPartner()}
        <Tips ref="tipsComponents"></Tips>
      </div>
    );
  }
}
export default Case;
