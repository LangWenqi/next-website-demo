import React, { Component } from "react";
import { message } from "antd";
import { saveShareHead } from "../server/api";
let continueClick = true;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: "",
      mobile: "",
      orgName: ""
    };
  }
  changeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  changeMobile(e) {
    this.setState({
      mobile: e.target.value
    });
  }
  changeOrgName(e) {
    this.setState({
      orgName: e.target.value
    });
  }
  showTips() {
    this.setState({
      name: "",
      mobile: "",
      orgName: "",
      show: true
    });
  }
  hideTips(e) {
    if (e.target.className == "tips-fixed") {
      this.setState({
        show: false
      });
    }
  }
  saveShareHead() {
    if (!continueClick) {
      return;
    }
    if (this.state.name.trim() == "") {
      message.error("请输入正确的姓名");
      return;
    }
    if (!/^1\d{10}$/.test(this.state.mobile)) {
      message.error("请输入正确的手机号");
      return;
    }
    if (this.state.orgName.trim() == "") {
      message.error("请输入正确的机构名称");
      return;
    }
    continueClick = false;
    let param = {
      mobile: this.state.mobile,
      userName: this.state.name,
      orgName: this.state.orgName,
      actCode: "ACT_MARKET_MAINTEST"
    };
    saveShareHead(param).then(data => {
      continueClick = true;
      if (data.code == 200) {
        message.success(data.msg);
        this.setState({
          show: false
        });
      } else {
        message.error(data.msg);
      }
      /*  */
    });
  }
  getTipsRender() {
    return this.state.show ? (
      <div
        className="tips-fixed"
        onClick={e => {
          this.hideTips(e);
        }}
      >
        <div className="home-con">
          <div className="title">请输入您的信息</div>
          <input
            className="txt"
            maxLength="6"
            onInput={e => {
              this.changeName(e);
            }}
            placeholder="姓名"
            type="text"
          />
          <input
            className="txt"
            maxLength="11"
            onInput={e => {
              this.changeMobile(e);
            }}
            placeholder="联系电话"
            type="text"
          />
          <input
            className="txt"
            maxLength="12"
            onInput={e => {
              this.changeOrgName(e);
            }}
            placeholder="机构名称"
            type="text"
          />
          <div className="tips">提交信息后48小时内会有指学针专业服务人员与您联系</div>
          {this.state.name && this.state.mobile && this.state.orgName ? (
            <div
              className="btn"
              onClick={() => {
                this.saveShareHead();
              }}
            >
              提 交
            </div>
          ) : (
            <div className="btnHui">提 交</div>
          )}
        </div>
      </div>
    ) : null;
  }
  render() {
    return <div>{this.getTipsRender()}</div>;
  }
}
export default Home;
