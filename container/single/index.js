import React, { Component } from "react";
import { message } from "antd";
import { saveShareHead } from "../../server/api";
import Router from "next/router";

const list = [
  { title: "消息通知", desc: "公众号和APP通知提醒，重要消息不错过" },
  { title: "成长档案", desc: "孩子成长点滴，云端永久存储不丢失" },
  { title: "作业收发", desc: "支持图片、文字、语音、视频，效率翻倍" },
  { title: "即时沟通", desc: "实时消息互动，支持只看老师或隔离模式" }
];
const eduList = [
  { title: "智能排课", desc: "教室，排课冲突预警，<br/>排课3天变1天，<br/>并消息推送老师与家长" },
  { title: "学员报名", desc: "报名流程清晰，<br/>学员合同自动存档，<br/>安全管理" },
  { title: "点名消课", desc: "通知同步至APP+微信端，<br/>家长随时知晓动态" },
  { title: "财务管理", desc: "财务收支记录新签续<br/>费明细，全方位统计课<br/>时消耗及账户余额" }
];
const zxzList = [
  { title: "权威技术", desc: "行业技术专家，不断产品迭代优化" },
  { title: "专业服务", desc: "全程一对一指导解答，极速响应" },
  { title: "智能管理", desc: "教培机构信息化管理，智能高效" },
  { title: "数据安全", desc: "阿里云服务，银行级安全" }
];
const cooperationList = [
  "与瑞思达成战略合作，其中贵阳瑞思运用营销模板，实现精准拉新，活动浏览人数<span>64995</span>，报名人数<span>999</span>",
  "指学针助力青牛少年第三届杭州市校园篮球联赛，全程图文直播比赛盛况。此次合作，指学针平台帮助青牛少年平台新增<span>20</span>余万精准粉丝",
  "合作几个月内，学员人数从<span>150</span>人迅速发展到了<span>400</span>人。指学针帮助象苗走出传统管理模式，实现了信息化管理和移动办公"
];
const orgList = [1, 1, 1, 1, 1, 1, 1, 1];
class Single extends Component {
  constructor(props) {
    super(props);
    this.continueClick = true;
    this.state = {
      isTips: false
    };
  }
  handleTips(boo, e) {
    if (e) {
      if (e.target.className == "fixTips") {
        this.setState({
          isTips: boo
        });
      }
      return;
    }
    this.setState(
      {
        isTips: boo
      },
      () => {
        if (boo) {
          this.orgName.value = "";
          this.name.value = "";
          this.mobile.value = "";
        }
      }
    );
  }
  saveShareHead() {
    if (!this.continueClick) {
      return;
    }
    let mobile = this.mobile.value;
    let name = this.name.value;
    let orgName = this.orgName.value;
    let channel = Router.query.channel;
    if (orgName.trim() == "") {
      message.error("请输入正确的机构名称");
      return;
    }
    if (name.trim() == "") {
      message.error("请输入正确的姓名");
      return;
    }
    if (!/^1\d{10}$/.test(mobile)) {
      message.error("请输入正确的手机号");
      return;
    }
    if (!channel) {
      message.error("请确认渠道来源");
      return;
    }

    this.continueClick = false;
    let param = {
      mobile: mobile,
      userName: name,
      orgName: orgName,
      actCode: channel
    };
    saveShareHead(param)
      .then(data => {
        this.continueClick = true;
        if (data.code == 200) {
          message.success(data.msg);
          this.setState({
            isTips: false
          });
        } else {
          message.error(data.msg);
        }
      })
      .catch(() => {
        this.continueClick = true;
      });
  }
  render() {
    return (
      <div className="single-container">
        <div className="header">
          <img className="headerLogo" src="https://media.bestjlb.com/jlboss6f14424eea23dffe48aa2c9f442eb2e815428772850607299.png" alt="" />
          <img className="bg" src="https://media.bestjlb.com/jlboss8660755eea0128daa545a0e8a42da0b915428538644191897.png" alt="" />
          <div className="content" flex="main:center cross:center dir:top">
            <div className="title">指学针</div>
            <div className="text">教育培训机构</div>
            <div className="text">运营管理一站式服务平台</div>
            <div className="English">Education and training institutions</div>
            <div className="English">Operation management one-stop service platform</div>
            <div
              className="btn"
              flex="main:center cross:center"
              onClick={() => {
                this.handleTips(true);
              }}
            >
              免费试用
            </div>
          </div>
        </div>
        <div className="market">
          <div className="commonTitle" flex="main:center cross:center">
            市场招生<span>| 教培机构营销招生裂变神器</span>
          </div>
          <div className="commonTip" flex="main:center cross:center">
            机构名片商城
          </div>
          <div flex="main:center cross:center">
            <div className="org">
              <img width="585" src="https://media.bestjlb.com/jlbosse2fef8b2272a4d779ec134508e03c3bb15428556433919887.png" alt="" />
              <div className="item" flex="main:center cross:center dir:top">
                <span className="top">移动商城</span>
                <span className="bottom">机构专属商城，支持课程在线交易</span>
              </div>
              <div className="item" flex="main:center cross:center dir:top">
                <span className="top">智能名片</span>
                <span className="bottom">告别纸质名片,小程序名片,裂变传播</span>
              </div>
              <div className="item" flex="main:center cross:center dir:top">
                <span className="top">用户雷达</span>
                <span className="bottom">实时用户轨迹查看，销售跟进</span>
              </div>
              <div className="item" flex="main:center cross:center dir:top">
                <span className="top">即时互动</span>
                <span className="bottom">无需添加微信，即可随时对话</span>
              </div>
            </div>
          </div>
          <div className="commonTip" flex="main:center cross:center">
            指学针招生宝
          </div>
          <div>
            <div className="student">
              <div className="relative" flex="main:justify cross:center" style={{ marginBottom: "24px" }}>
                <img width="732" src="https://media.bestjlb.com/jlboss629d4804c984fc219feae0d54f202d8515428569499214115.png" alt="" />
                <img width="259" src="https://media.bestjlb.com/jlbossef97b6895ffa068712833043e3fb489715428570217107010.png" alt="" />
                <div className="item">
                  <div>海量模板</div>
                  <div>拼团砍价、传单等丰富样式</div>
                </div>
                <div className="item">
                  <div>极简制作</div>
                  <div>操作简单，5分钟完成活动制作</div>
                </div>
              </div>
              <div className="relative" flex="main:justify cross:center">
                <img width="259" src="https://media.bestjlb.com/jlboss9e0c318ec634a5e15d86a245ebf22db515428570632722807.png" alt="" />
                <img width="732" src="https://media.bestjlb.com/jlboss4fdf345818f9c48e141bebd283cf5aa515428570717629633.png" alt="" />
                <div className="item">
                  <div>数据分析</div>
                  <div>实时数据，及时了解活动效果</div>
                </div>
                <div className="item">
                  <div>客户沉淀</div>
                  <div>数据化存储，有效跟进沉淀</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="school" flex="cross:center">
          <div className="left" flex-box="1" flex="main:center cross:bottom">
            <img
              className="relative"
              width="582"
              src="https://media.bestjlb.com/jlboss5da57d586692b8b6851576882f385aa215428580067373823.png"
              alt=""
            />
          </div>
          <div className="right" flex-box="1">
            <div className="commonTitle" flex="cross:center">
              家校互动<span>| 家校沟通无障碍 班级管理高效</span>
            </div>
            {list.map((item, index) => {
              return (
                <div className="item" key={index} flex="cross:center">
                  <div className="imgBox" flex-box="0">
                    <img src={"../../static/single-icon-" + (index * 1 + 1) + ".png"} alt="" />
                  </div>
                  <div>
                    <div className="title">{item.title}</div>
                    <div className="desc">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="education">
          <div className="commonTitle" flex="main:center cross:center">
            教务系统<span>| 机构智能信息化管理</span>
          </div>
          <div className="list" flex="main:justify cross:center">
            {eduList.map((item, index) => {
              return (
                <div className="item" flex-box="1" key={index} flex="main:center cross:top">
                  <img height="85" src={"../../static/education-icon-" + index + ".png"} alt="" />
                  <div>
                    <div className="title">{item.title}</div>
                    <div className="desc" dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="zxz" flex="main:center cross:center dir:top">
          指学针<div>ZHIXUEZHEN</div>
        </div>
        <div className="section">
          <img className="bg" src="https://media.bestjlb.com/jlbossdd5923ba38b3d9ed123bdcc646a4d98a15428771775254613.png" alt="" />
          <div className="list" flex="main:justify cross:center">
            {zxzList.map((item, index) => {
              return (
                <div className="item" flex-box="1" key={index} flex="main:center cross:center dir:top">
                  <img height="85" src={"../../static/zxz-icon-" + index + ".png"} alt="" />
                  <div className="title">{item.title}</div>
                  <div className="desc">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="cooperation">
          <div className="title" flex="main:center cross:center">
            合作案例
          </div>
          <div className="list" flex="main:justify">
            {cooperationList.map((item, index) => {
              return (
                <div className="item" key={index} flex="dir:top">
                  <div className="imgBox" flex="main:center cross:center">
                    <img src={"../../static/cooperation-icon-" + index + ".png"} alt="" />
                  </div>
                  <div className="desc" dangerouslySetInnerHTML={{ __html: item }} />
                </div>
              );
            })}
          </div>
          <div className="tips">*数据来源指学针后台</div>
          <div className="title" flex="main:center cross:center">
            与12000+教育培训机构共创美好教育生态
          </div>
          <div className="orgList" flex="cross:center main:justify">
            {orgList.map((item, index) => {
              return (
                <div className="box" key={index} flex="main:center cross:center">
                  <img src={"../../static/orgIcon-" + index + ".png"} alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="tryout" flex="main:center cross:center">
          <div
            className="btn"
            flex="main:center cross:center"
            onClick={() => {
              this.handleTips(true);
            }}
          >
            马上试用
          </div>
        </div>
        <div className="footer" flex="main:center cross:center dir:top">
          <div className="title">联系我们</div>
          <div className="info">
            公司名称：杭州接力棒科技有限公司
            <br />
            公司地址：浙江省杭州市西湖区文一西路588号西溪首座A2-1（11号楼）8楼
            <br />
            服务热线：0571-28880088
          </div>
        </div>
        <div
          className="logo"
          flex="main:center cross:center dir:top"
          onClick={() => {
            this.handleTips(true);
          }}
        >
          <img src="../../static/logoZxz.png" alt="" />
          <div className="btn" flex="main:center cross:center">
            马上试用
          </div>
        </div>
        {this.state.isTips ? (
          <div
            className="fixTips"
            flex="cross:center main:center"
            onClick={e => {
              this.handleTips(false, e);
            }}
          >
            <div className="content" flex="cross:center dir:top">
              <div className="title">免费试用</div>
              <input
                className="txt"
                ref={node => {
                  this.orgName = node;
                }}
                maxLength="12"
                type="text"
                placeholder="请输入机构名"
              />
              <input
                className="txt"
                ref={node => {
                  this.name = node;
                }}
                maxLength="6"
                type="text"
                placeholder="请输入姓名"
              />
              <input
                className="txt"
                ref={node => {
                  this.mobile = node;
                }}
                maxLength="11"
                type="text"
                placeholder="请输入联系方式"
              />
              <div className="tips">提交信息后48小时内会有指学针专业服务人员与您联系</div>
              <div
                className="btn"
                flex="cross:center main:center"
                onClick={() => {
                  this.saveShareHead();
                }}
              >
                提 交
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default Single;
