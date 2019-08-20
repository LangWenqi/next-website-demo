import React, { Component } from "react";
import { Carousel } from "antd";
import { _debounce, _normalize } from "../../util/index";
import Link from "next/link";
import { requestAnimFrame } from "../../util";
import Empty from "../../components/empty";
import { getArticleList, getArticleNewList, addBannerPv } from "../../server/api-news";
const GETDATA_HEIGHT = 200;
var _switch = true;
class News extends Component {
  constructor(props) {
    super(props);
    // this.scrollHandler = _debounce(this.scrollHandler.bind(this), 300);
    this.scrollHandler = this.scrollHandler.bind(this);

    this.state = {
      activeCarousel: 0,
      showCarousel: false,
      activeTabIndex: 0,
      activeTabId: 0,
      total: props.articleTotal,
      news: props.articleLists
    };
    this.page = 1;
    this.size = 12;
    // 获取文章内容，排序策略， new按最新事件，top按栏目与置顶排序
    this.order = "new";
  }
  componentDidMount() {
    document.body.scrollTop = 0;
    this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    this.wrapper = this.refs.wrapper;
    this.setState({
      showCarousel: true
    });
    document.addEventListener("scroll", this.scrollHandler, { passive: true });
  }
  componentWillUnmount() {
    document.removeEventListener("scroll", this.scrollHandler, { passive: true });
  }
  scrollHandler(e) {
    let { news, total, activeTabId } = this.state;
    if (news && news.length >= total) {
      return;
    }
    if (!_switch) {
      return;
    }
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (this.clientHeight + scrollTop > this.wrapper.clientHeight - GETDATA_HEIGHT) {
      _switch = false;
      ++this.page;
      this.getArticleList(activeTabId);
    }
  }
  onChange(current) {
    this.setState({
      activeCarousel: current
    });
  }
  handleClickBanner(item) {
    let { id, linkUrl } = item;
    // 点击量
    addBannerPv(id);
    if (linkUrl) {
      location.href = `${location.origin}${linkUrl}/order/${this.order}`;
    }
  }
  async changeTabHandler(index, id) {
    let { activeTabIndex } = this.state;

    if (activeTabIndex != index) {
      this.page = 1;
      this.setState(
        {
          activeTabIndex: index,
          activeTabId: id,
          news: []
        },
        () => {
          this.order = activeTabIndex == 0 ? "new" : "top";
          this.getArticleList(id);
        }
      );
    }
  }
  async getArticleList(id) {
    // id = 0 获取最新文章列表;
    // id 不为0获取其他栏目文章
    let res = null;
    if (id == 0) {
      res = await getArticleNewList(this.page, this.size);
    } else {
      res = await getArticleList(id, this.page, this.size);
    }
    let lists = res.body.pageList,
      total = res.body.total;

    this.setState(
      prevState => {
        return {
          news: [...prevState.news, ...lists],
          total: total
        };
      },
      () => {
        _switch = true;
      }
    );
  }
  render() {
    const { bannerLists, tabLists } = this.props;
    const { showCarousel, activeCarousel, activeTabIndex, news, total } = this.state;
    return (
      <div className="news-container" ref="wrapper">
        {bannerLists &&
          bannerLists.length > 0 && (
            <div className="carousel-container">
              {showCarousel && bannerLists ? (
                <Carousel afterChange={current => this.onChange(current)} autoplay>
                  {bannerLists &&
                    bannerLists.map(v => {
                      return (
                        <div key={v.id} onClick={() => this.handleClickBanner(v)}>
                          <img src={v.coverUrl} className="slide-img" alt="" />
                        </div>
                      );
                    })}
                </Carousel>
              ) : null}
              {bannerLists && bannerLists[activeCarousel] ? <div className="slide-title">{bannerLists[activeCarousel].name}</div> : null}
            </div>
          )}
        <Tab activeTabIndex={activeTabIndex} tabLists={tabLists} changeTab={(index, id) => this.changeTabHandler(index, id)} />
        <NewsList order={this.order} news={news} />
        {news && news.length < total && <Loading />}
        {news && news.length > 0 && news.length == total && <NoLists />}
        <ReturnTop />
      </div>
    );
  }
}

function Tab(props) {
  return (
    <div className="tab-container">
      {props.tabLists &&
        props.tabLists.map((item, index) => {
          return (
            <div
              className={["tab-item ", props.activeTabIndex == index ? "active" : ""].join("")}
              key={item.id}
              onClick={() => props.changeTab(index, item.id)}
            >
              {item.name}
            </div>
          );
        })}
    </div>
  );
}

function NewsList(props) {
  const list = props.news;
  const order = props.order;
  // console.log(list);

  return (
    <div className="news-list-container">
      {list && list.length ? (
        list.map(v => {
          return (
            <div className="news-list" key={v.id}>
              <div className="news-info">
                <Link as={`/news/detail/${v.id}/order/${order}`} href={`/news/detail?id=${v.id}&order=${order}`}>
                  <div className="title" title={v.title}>
                    {v.title}
                  </div>
                </Link>

                <Link as={`/news/detail/${v.id}/order/${order}`} href={`/news/detail?id=${v.id}&order=${order}`}>
                  <div className="desc">{v.summary}</div>
                </Link>
                <div className="bottom">
                  <div className="author">{v.author}</div>
                  <div className="time">{_normalize(v.released)}</div>
                </div>
              </div>
              <Link as={`/news/detail/${v.id}/order/${order}`} href={`/news/detail?id=${v.id}&order=${order}`}>
                <img src={v.coverUrl} className="news-pic" alt="" />
              </Link>
            </div>
          );
        })
      ) : (
        <Empty>
          <img src="/static/kong@2x.png" alt="" className="empty-img" />
          <div className="empty-text">此内容为空</div>
        </Empty>
      )}
    </div>
  );
}

function Loading() {
  return <img src="/static/loading.gif" className="loadMoreIcon" alt="" />;
}

function NoLists() {
  return (
    <div className="nolists-wrapper">
      <img src="/static/meile@2x.png" className="nolists-img" alt="" />
      <div className="nolists-text">这次真没了~</div>
    </div>
  );
}

class ReturnTop extends Component {
  constructor(props) {
    super(props);
    this.scrollHandler = this.scrollHandler.bind(this);
    this.state = {
      showIcon: false
    };
  }
  backToTop(rate) {
    var doc = document.body.scrollTop ? document.body : document.documentElement;
    var scrollTop = doc.scrollTop;
    var top = function() {
      scrollTop = scrollTop + (0 - scrollTop) / (rate || 2);

      // 临界判断，终止动画
      if (scrollTop < 1) {
        doc.scrollTop = 0;
        return;
      }
      doc.scrollTop = scrollTop;
      requestAnimFrame()(top);
    };
    top();
  }
  handleClick() {
    this.backToTop();
  }
  scrollHandler() {
    if (document.body.scrollTop || document.documentElement.scrollTop > 300) {
      this.setState({
        showIcon: true
      });
    } else {
      this.setState({
        showIcon: false
      });
    }
  }
  componentDidMount() {
    document.addEventListener("scroll", this.scrollHandler, { passive: true });
  }
  componentWillUnmount() {
    document.removeEventListener("scroll", this.scrollHandler, { passive: true });
  }
  componentDidUpdate(prev, next) {
    if (prev.state === next.state) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    return this.state.showIcon ? <div className="return-top" onClick={() => this.handleClick()} /> : null;
  }
}
export default News;
