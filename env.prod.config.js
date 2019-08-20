var fs = require("fs");

fs.readFile(".env", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  fs.writeFile(".env", "custom_env=production", () => {
    console.log("------->环境变量修改为production");
  });
});
