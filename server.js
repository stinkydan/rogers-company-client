const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
let fallback = require("express-history-api-fallback");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let port = 3000;

app.use("/", express.static(path.resolve(__dirname, "build")));
app.use(fallback("index.html", { root: `${__dirname}/build` }));
app.listen(port, null, () => {
  console.log("production server is running on " + port);
});
