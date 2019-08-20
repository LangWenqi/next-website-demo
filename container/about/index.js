import React, { Component } from "react";
const infoList = [{
  imgUrl: '../../static/about-avator-8.png',
  time: '2017年11月',
  desc: '与宏优体育、骄阳学堂等知名机构签约使用'
}, {
  imgUrl: '../../static/about-avator-7.png',
  time: '2017年10月',
  desc: '与苏州瑞思英语签约使用'
}, {
  imgUrl: '../../static/about-avator-6.png',
  time: '2017年9月',
  desc: '与“青牛少年”达成紧密战略合作'
}, {
  imgUrl: '../../static/about-avator-5.png',
  time: '2017年8月',
  desc: '指学针正式上线'
}, {
  imgUrl: '../../static/about-avator-4.png',
  time: '2017年6月',
  desc: '使用用户覆盖语言类、艺术类、形体类、声乐类涵盖四个大类'
}, {
  imgUrl: '../../static/about-avator-3.png',
  time: '2017年5月',
  desc: '与杭州瑞思英语、杨梅红美术教育机构达成战略合作协议'
}, {
  imgUrl: '../../static/about-avator-2.png',
  time: '2017年4月',
  desc: '指学针产品进入内测阶段'
}, {
  imgUrl: '../../static/about-avator-1.png',
  time: '2015年12月',
  desc: '接力棒正式成立了'
},]
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    }
  }
  currentchange(index) {
    this.setState({
      currentIndex: index
    })
  }
  getElement(item, index) {
    if (index % 2 == 0) {
      return <div key={index} className="item">
        <div className="avatorBorder">
          <img className="avator" src={item.imgUrl} alt="" />
        </div>
        <div className="connect"></div>
        <img className="icon_circle" src="../../static/about-icon-circle.png" alt="" />
        <div className="info">
          <div className="time">{item.time}</div>
          <div className="desc">{item.desc}</div>
        </div>
      </div>
    } else {
      return <div key={index} className="item">
        <div className="info">
          <div className="time">{item.time}</div>
          <div className="desc">{item.desc}</div>
        </div>
        <img className="icon_circle" src="../../static/about-icon-circle.png" alt="" />
        <div className="connect"></div>
        <div className="avatorBorder">
          <img className="avator" src={item.imgUrl} alt="" />
        </div>
      </div>
    }

  }
  render() {
    return (
      <div className="about-container">
        <div className="about-header">
          <div className="about-introduce">
            <div className="title">公司介绍</div>
            <div className="desc">指学针是杭州接力棒科技有限公司自主研发的，为教育培训机构提供SaaS服务的平台，致力于解决教培机构的教务管理、家校沟通、招生续班等一系列管理营销难题。<br />
              <br />
              作为国内较早真正运用人工智能（AI）、数据挖掘（DM）技术的教育培训SaaS服务机构，指学针团队凭借强大的技术实力打造出涵盖教务管理、家校沟通、招生营销于一体的强大功能，为教育培训机构提供一站式信息化解决方案，很大程度上减轻了教育机构的运营和管理压力，已帮助超过3000家机构实现互联网+教育的业务升级。指学针始终秉持“让品质教育成就美好未来”的理念，为广大教育培训机构提供优质服务，助力教育培训机构高效运营，提升机构核心竞争力，赋能教培机构数字信息化未来。</div>
          </div>
        </div>

        <div className="growth">
          <div className="title">指学针的成长历程</div>
          <div className="course">
            <img className="icon_time" src="../../static/about-icon_time.png" alt="" />
            <div className="line">
              {
                infoList.map((item, index) => {
                  return this.getElement(item, index)
                })
              }

            </div>
            <div className="circle">

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default About;
