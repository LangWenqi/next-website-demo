import NextHead from "next/head";
import React, { Component } from "react";
import { string } from "prop-types";
const defaultDescription =
  "指学针是致力于为广大教育培训机构管理者提供一站式运营管理解决方案的平台，为教育机构提供家校互动、班级管理、招生营销、多校区管理、小程序定制等服务，助力教育培训机构高效运营。";
const defaultTitle = "指学针 - 培训机构管理系统，学校信息化管理软件";
const defaultKeywords =
  "指学针,教务管理系统,培训学校管理系统,教育培训管理软件,教育机构管理系统,营销招生,艺术培训管理系统,家校互动,教育机构小程序定制";

const Head = props => (
  <NextHead>
    <meta charset="UTF-8" />
    <title>{props.title || defaultTitle}</title>
    <meta name="description" content={props.description || defaultDescription} />
    <link rel="shortcut icon" type="image/ico" href="/static/zxzLogo.png" />
    <meta name="keywords" content={props.keywords || defaultKeywords} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="//tjs.sjs.sinajs.cn/open/api/js/wb.js" type="text/javascript" charset="utf-8" />
    <script src="https://hm.baidu.com/hm.js?2b438f74a30b96b4f3c9b372d1942a7f" />
  </NextHead>
);
// class Head extends Component {
//   render() {
//     let props = this.props;
//     return (
//       <NextHead>
//         <meta charset="UTF-8" />
//         <title>{props.title || defaultTitle}</title>
//         <meta name="description" content={props.description || defaultDescription} />
//         <link rel="shortcut icon" type="image/ico" href="/static/zxzLogo.png" />
//         <meta name="keywords" content={props.keywords || defaultKeywords} />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <script src="//tjs.sjs.sinajs.cn/open/api/js/wb.js" type="text/javascript" charset="utf-8" />
//         <script src="https://hm.baidu.com/hm.js?2b438f74a30b96b4f3c9b372d1942a7f" />
//       </NextHead>
//     );
//   }
// }
Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};
export default Head;
