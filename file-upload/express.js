const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// app.get("/", (req, res, next) => {
//   fs.createReadStream("./index.html").pipe(res);
// });
app.use(express.static('./static'));

app.post("/upload", upload.single("file"), (req, res, next) => {
  console.log(req.file);
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  res.end("文件上传成功");
});
app.use("/login", (req, res, next) => {
  console.log(req);
});
app.listen(3000);
