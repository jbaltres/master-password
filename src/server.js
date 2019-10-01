let http = require("http");
const { readSecrets } = require("./lib/secrets");
const secrets = readSecrets();
console.log(secrets);
http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(JSON.stringify(secrets));
    res.end();
  })
  .listen(8080);
