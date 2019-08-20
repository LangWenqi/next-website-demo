import React, { Component } from "react";
import { withRouter } from "next/router";
import { _iframeToVedio, shareSina } from "../../util";
import Empty from "../../components/empty";
import { _normalize } from "../../util/index";
// import QRCode from "qrcodejs2";
import { mobileUrl } from "../../config";
class NewsDetail extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { title, coverUrl } = this.props;
    this.markQrCode();
    shareSina("shareBtn", location.href, title, coverUrl ? coverUrl : "");
  }
  markQrCode() {
    import("qrcodejs2").then(QRCode => {
      new QRCode(document.getElementById("qrcode"), {
        text: `${mobileUrl}?id=${this.props.articleId}`,
        width: 200,
        height: 200
      });
    });
  }
  async handleClickArticle(id) {
    let arr = location.pathname.split("/");
    let order = arr[arr.length - 1];
    location.href = `${location.origin}/news/detail/${id}/order/${order}`;
  }
  render() {
    const { id, author, content, time, title, count, status, previous, next, order } = this.props;
    return (
      <div className="news-detail-container">
        {status == 1 || !id ? (
          <Empty>
            <img src="/static/shanchu@2x.png" alt="" className="empty-img" />
            <div className="empty-text">此内容已被删除</div>
          </Empty>
        ) : (
          <div>
            <div className="article-title">{title}</div>
            <div className="article-info">
              <div className="author">{author}</div>
              <div className="time">{_normalize(time)}</div>
              <div className="count">
                {count}
                人查看
              </div>
            </div>
            <div className="line" />
            <div className="article-content" dangerouslySetInnerHTML={{ __html: _iframeToVedio(content) }} />
            <div className="share-bottom">
              <div className="wechat" title="微信分享">
                <div className="qrcode-wrapper">
                  <div className="qrcode" id="qrcode" />
                  <div className="text">扫一扫分享</div>
                </div>
              </div>
              <a id="shareBtn" className="sina" title="微博分享" href="javascript:void(0)" target="_blank" />
              <div className="xiaobian">添加小编微信（13173696179），免费领取办学干货</div>
            </div>
            <div className="pagination">
              {previous && previous.id ? (
                <div className="pre pag-btn" onClick={() => this.handleClickArticle(previous.id)}>
                  上一篇：
                  {previous.title}
                </div>
              ) : null}
              {next && next.id ? (
                <div className="next pag-btn" onClick={() => this.handleClickArticle(next.id)}>
                  下一篇：
                  {next.title}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(NewsDetail);
