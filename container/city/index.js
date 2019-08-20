import React, { Component } from "react";
import Title from "../home/title";
import { Icon, Input, Cascader, message } from "antd";
import { citySelectData } from "../../util/const";
import { saveShareHead } from "../../server/api";
const { TextArea } = Input;
let arr = ["海量资料", "市场巨大", "丰厚返利", "培训支持", "市场支持", "驻地支持"];
let businessArr = [
  {
    title: "人员支持",
    desc: "指学针总部的渠道经理、商家运营、开放平台技术支持等岗位人员组建协作团队，快速响应代理商的业务需求。",
    color: "#FF89A7"
  },
  {
    title: "培训支持",
    desc: "包括但不限于产品培训、销售培训、服务能力培训及行业解决方案培训等。",
    color: "#68BAFD"
  },
  {
    title: "市场支持",
    desc: "城市合伙人在当地举办各种市场推广活动，包括广告投放、参加行业展会、举办沙龙、会销等。",
    color: "#FFA736"
  },
  {
    title: "市场物料",
    desc: "指学针提供给代理商全套市场物料设计稿，包括DM单页、海报、X展架、名片、工作牌、车贴等。",
    color: "#A595FB"
  },
  {
    title: "服务支持",
    desc: "完善的客户服务体系，机构付费后，可以咨询在线客服，提供商家服务和客户维护支持。",
    color: "#FF9166"
  },
  {
    title: "资源支持",
    desc: "海量区域教育机构资源库，分区域指派给合伙人转化。",
    color: "#66C5B7"
  }
];
let cooperationArr = [
  {
    title: "具备公司资质",
    desc: "具有合法营业执照和独立法人代表，有良好的商业信誉和口碑"
  },
  {
    title: "具有销售团队",
    desc: "专职销售团队，具有互联网或SaaS领域的代理或销售经营背景"
  },
  {
    title: "具有客户资源",
    desc: "拥有当地丰富的教育培训机构资源且执行力强"
  },
  {
    title: "认同指学针文化",
    desc: "认可指学针的产品价值和文化理念，愿意跟指学针长期合作"
  }
];
const processArr = ["提交申请", "线下审核", "洽谈方案", "签约合作"];
let continueClick = true;
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTips: false,
      userName: "",
      mobile: "",
      companyName: "",
      companyDesc: "",
      areaArr: []
    };
  }
  onChangeArea = (value, selectedOptions) => {
    let areaArr = [];
    selectedOptions.forEach(el => {
      areaArr.push(el.label);
    });
    this.setState({ areaArr });
  };
  handleTips = boo => {
    this.setState({
      userName: "",
      mobile: "",
      companyName: "",
      companyDesc: "",
      areaArr: [],
      showTips: boo
    });
  };
  onChangeUserName(e, type) {
    switch (type) {
      case 1:
        this.setState({ userName: e.target.value });
        break;
      case 2:
        this.setState({ mobile: e.target.value });
        break;
      case 3:
        this.setState({ companyName: e.target.value });
        break;
      case 4:
        this.setState({ companyDesc: e.target.value });
        break;
      default:
        break;
    }
  }
  saveShareHead() {
    if (!continueClick) {
      return;
    }
    if (this.state.userName.trim() == "") {
      message.error("请输入正确的姓名");
      return;
    }
    if (!/^1\d{10}$/.test(this.state.mobile)) {
      message.error("请输入正确的手机号");
      return;
    }
    if (this.state.areaArr.length <= 0) {
      message.error("请选择区域");
      return;
    }
    continueClick = false;
    let param = {
      mobile: this.state.mobile,
      userName: this.state.userName,
      region: this.state.areaArr.join("/"),
      company: this.state.companyName,
      overview: this.state.companyDesc,
      actCode: "ACT_COOPERATION"
    };
    saveShareHead(param).then(data => {
      continueClick = true;
      if (data.code == 200) {
        message.success(data.msg);
        this.setState({
          showTips: false
        });
      } else {
        message.error(data.msg);
      }
    });
  }
  render() {
    return (
      <div className="city-container">
        <div className="banner">
          <img src="../../static/city_header_font.png" alt="" />
          <div className="name">互联网+教育、SaaS、教育改革三大风口，携手指学针共掘万亿教育市场</div>
          <div className="btnBox">
            <div
              className="btn"
              onClick={() => {
                this.handleTips(true);
              }}
            >
              立即申请
            </div>
          </div>
        </div>
        <div className="advantage">
          <Title title={"六大优势"} />
          <div className="list">
            {arr.map((item, index) => {
              return (
                <div className="item" key={index} onClick={() => {}}>
                  <img className="icon" src={`../../static/city_icon_${index}.png`} alt="" />
                  <div className="icon-title">{item}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="business">
          <Title title={"业务支持"} />
          <div className="list">
            {businessArr.map((item, index) => {
              return (
                <div className="item" key={index} onClick={() => {}}>
                  <div className="circle">
                    <img src={`../../static/city_num_${index}.png`} alt="" />
                  </div>
                  <div className="title" style={{ color: item.color }}>
                    {item.title}
                  </div>
                  <div className="desc">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="cooperation">
          <Title title={"合作条件"} />
          <div className="list">
            {cooperationArr.map((item, index) => {
              return (
                <div className="item" key={index} onClick={() => {}}>
                  <div className="title">{item.title}</div>
                  <div className="desc">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="process">
          <Title title={"申请流程"} />
          <div className="list">
            {processArr.map((item, index) => {
              return (
                <div className="item" key={index} onClick={() => {}}>
                  <img src={`../../static/city_process_${index}.png`} alt="" />
                  <div className="icon_circle">
                    <div className="line" />
                    <div className="circle" />
                    <div className="name">{item}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="btnBox">
            <div
              className="btn"
              onClick={() => {
                this.handleTips(true);
              }}
            >
              立即申请
            </div>
          </div>
        </div>
        {this.state.showTips ? (
          <div className="tips" id="area">
            <div className="box">
              <Icon
                type="close"
                onClick={() => {
                  this.handleTips(false);
                }}
              />
              <div className="title">申请成为代理商</div>
              <div className="item">
                <div className="label">
                  申请人姓名<span>*</span>
                </div>
                <Input
                  onChange={e => {
                    this.onChangeUserName(e, 1);
                  }}
                />
              </div>
              <div className="item">
                <div className="label">
                  申请人手机<span>*</span>
                </div>
                <Input
                  maxLength="11"
                  onChange={e => {
                    this.onChangeUserName(e, 2);
                  }}
                />
              </div>
              <div className="item">
                <div className="label">
                  申请区域<span>*</span>
                </div>
                <Cascader
                  options={citySelectData}
                  placeholder=""
                  style={{ width: "100%" }}
                  onChange={(value, selectedOptions) => {
                    this.onChangeArea(value, selectedOptions);
                  }}
                  getPopupContainer={() => document.getElementById("area")}
                  changeOnSelect
                />
              </div>
              <div className="item">
                <div className="label">公司名称</div>
                <Input
                  onChange={e => {
                    this.onChangeUserName(e, 3);
                  }}
                />
              </div>
              <div className="item">
                <div className="label">公司概括</div>
                <TextArea
                  onChange={e => {
                    this.onChangeUserName(e, 4);
                  }}
                  rows={4}
                />
              </div>
              <div
                className="apply"
                onClick={() => {
                  this.saveShareHead();
                }}
              >
                立即申请
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default Product;
