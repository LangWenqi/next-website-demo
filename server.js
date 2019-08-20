const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV === "development";
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const app = next({ dev });
const handle = app.getRequestHandler();
const env = process.env.custom_env;
// 如果移动端访问详情页面，则重定向到移动端
let baseUrl = "";
switch (env) {
  case "production":
    baseUrl = "https://html.bestjlb.com/share/";
    break;
  case "development":
    baseUrl = "http://192.168.1.177:3344/";
    break;
  case "test":
    baseUrl = "https://test-html.bestjlb.com/share/";
    break;
}
function isPhone(req) {
  var deviceAgent = req.headers["user-agent"].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/gi);
  return agentID;
}
app.prepare().then(() => {
  const server = express();

  server.get("/news/detail/:id/order/:type", (req, res) => {
    if (isPhone(req)) {
      res.redirect(baseUrl + "pages/news-detail/index.html?id=" + req.params.id);
    } else {
      return app.render(
        req,
        res,
        "/news/detail",
        Object.assign(
          {
            id: req.params.id,
            order: req.params.order
          },
          req.query
        )
      );
    }
  });

  // handle each other url
  server.get("*", (req, res) => {
    if (isPhone(req)) {
      res.redirect(baseUrl + "pages/mobildWebsite/index.html");
    } else {
      return handle(req, res);
    }
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
