import React, { Component } from "react";
import { procudtInfo, teacherIcon, parentIcon, marketingIcon, orgIcon } from "../../util/const";
import { Icon } from "antd";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      parentIndex: 2,
      marketingIndex: 0,
      orgIndex: 0
    }
  }
  teacherChange(index) {
    this.setState({
      currentIndex: index
    });
  }
  parentChange(index) {
    this.setState({
      parentIndex: index
    });
  }
  marketingChange(index) {
    this.setState({
      marketingIndex: index
    });
  }
  orgIconChange(index) {
    this.setState({
      orgIndex: index
    });
  }
  render() {
    return (
      <div className="product-container">
        {/* <div className="product-banner">
          <div className="banner-title">机构</div>
          <ul>
            {
              procudtInfo.map((item, index) => {
                return <li key={index} className="item">
                  <img className="logo" src={item.imgUrl} alt="" />
                  <div className="title">{item.title}</div>
                  <div className="desc" dangerouslySetInnerHTML={{ __html: item.desc }}></div>
                </li>
              })
            }
          </ul>
        </div> */}
        <div className="product-teacher" style={{ background: '#fefcf9' }}>
          <div className="teacher-title">机构</div>
          <div className="content">
            <div className="rightFirst">
              <img src={orgIcon[this.state.orgIndex].descUrl} alt="" />
            </div>
            <div className="left">
              <div className="title">机构数据一目了然</div>
              <div className="list" style={{ flexDirection: 'row-reverse' }}>
                {
                  orgIcon.map((item, index) => {
                    return <div key={index} className={this.state.orgIndex === index ? 'focus' : 'each'} onClick={() => this.orgIconChange(index)} style={{ marginLeft: '30px', marginRight: '0' }}>
                      <img className="icon" src={item.imgUrl} alt="" />
                      <div className="icon-title">{item.title}</div>
                      {
                        this.state.orgIndex === index ? <Icon type="caret-down"></Icon> : null
                      }
                    </div>
                  })
                }
              </div>
              <div className="desc" style={{ textAlign: 'right' }} dangerouslySetInnerHTML={{ __html: orgIcon[this.state.orgIndex].desc }}></div>
            </div>
          </div>
        </div>
        <div className="product-teacher">
          <div className="teacher-title">老师</div>
          <div className="content">
            <div className="left">
              <div className="title">家校沟通无障碍，班级管理更高效</div>
              <div className="list">
                {
                  teacherIcon.map((item, index) => {
                    return <div key={index} className={this.state.currentIndex === index ? 'focus' : 'each'} onClick={this.teacherChange.bind(this, index)}>
                      <img className="icon" src={item.imgUrl} alt="" />
                      <div className="icon-title">{item.title}</div>
                      {
                        this.state.currentIndex === index ? <Icon type="caret-down"></Icon> : null
                      }
                    </div>
                  })
                }

              </div>
              <div className="desc" dangerouslySetInnerHTML={{ __html: teacherIcon[this.state.currentIndex].desc }}></div>
            </div>
            <div className="right">
              <img src={teacherIcon[this.state.currentIndex].descUrl} alt="" />
            </div>
          </div>
        </div>
        <div className="product-teacher" style={{ background: '#fefcf9' }}>
          <div className="teacher-title">家长</div>
          <div className="content">
            <div className="right">
              <img src={parentIcon[this.state.parentIndex].descUrl} alt="" />
            </div>
            <div className="left">
              <div className="title">随时了解孩子在校情况</div>
              <div className="list" style={{ flexDirection: 'row-reverse' }}>
                {
                  parentIcon.map((item, index) => {
                    return <div key={index} className={this.state.parentIndex === index ? 'focus' : 'each'} onClick={() => this.parentChange(index)} style={{ marginLeft: '30px', marginRight: '0' }}>
                      <img className="icon" src={item.imgUrl} alt="" />
                      <div className="icon-title">{item.title}</div>
                      {
                        this.state.parentIndex === index ? <Icon type="caret-down"></Icon> : null
                      }
                    </div>
                  })
                }
              </div>
              <div className="desc" style={{ textAlign: 'right' }} dangerouslySetInnerHTML={{ __html: parentIcon[this.state.parentIndex].desc }}></div>
            </div>
          </div>
        </div>
        <div className="product-teacher">
          <div className="teacher-title">营销</div>
          <div className="content">
            <div className="left">
              <div className="title">{marketingIcon[this.state.marketingIndex].bigTitle}</div>
              <div className="list">
                {
                  marketingIcon.map((item, index) => {
                    return <div key={index} className={this.state.marketingIndex === index ? 'focus' : 'each'} onClick={this.marketingChange.bind(this, index)}>
                      <img className="icon" src={item.imgUrl} alt="" />
                      <div className="icon-title">{item.title}</div>
                      {
                        this.state.marketingIndex === index ? <Icon type="caret-down"></Icon> : null
                      }
                    </div>
                  })
                }

              </div>
              <div className="desc" dangerouslySetInnerHTML={{ __html: marketingIcon[this.state.marketingIndex].desc }}></div>
            </div>
            <div className="right">
              <img src={marketingIcon[this.state.marketingIndex].descUrl} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Product;
