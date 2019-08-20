let env = process.env.custom_env;
let mobileUrl = null; // 移动端官网文章详情页面
// https://html.bestjlb.com/share/pages/mobildWebsite/index.html
if (env === "production") {
  mobileUrl = "https://html.bestjlb.com/share/pages/news-detail/index.html";
} else if (env === "test") {
  mobileUrl = "https://test-html.bestjlb.com/share/pages/news-detail/index.html";
} else {
  mobileUrl = "http://192.168.1.177:3344/pages/news-detail/index.html";
}
export { mobileUrl };
