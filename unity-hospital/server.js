const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const path = require("path");

const { REACT_APP_EVENT_API, REACT_APP_USER_API } = process.env;
const API_WHITELIST = [REACT_APP_EVENT_API, REACT_APP_USER_API];
const corsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token"
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: (origin, cb) => {
    if (API_WHITELIST.includes(origin)) cb(null, true);
    else cb(new Error("Not allowed by CORS"));
  },
  preflightContinue: false
};

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static("build"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.listen(8080, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Serving Unity Virtual Portal...");
});
