const http = require("http");

http.createServer((req, res) => {
  function updateTime() {
    setInterval(() => this.time = new Date().toUTCString(), 1000)
    return this.time
  }
  if (req.url === "/") {
    res.writeHead(200, { "Context-Type": "text/html" });
    res.end(`
      <html>
          <!-- <meta http-equiv="Refresh" content="5" /> -->
          Html Update Time: ${updateTime()}
          <script src='main.js'></script>
      </html>
    `);
  } else if (req.url === "/main.js") {
    const content = `document.writeln('<br>JS   Update Time:${updateTime()}')`;
    // 强缓存
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())
    res.statusCode = 200;
    res.end(content);
  } else if (req.url === "/favicon.ico") {
    console.log("favicon..");
    res.end("");
  }
}).listen(3000, function() {
  console.log('Http Cache Test at:' + 3000)
})
