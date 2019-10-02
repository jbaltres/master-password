const http = require("http");
const url = require("url");
const { get } = require("./lib/commands");

const server = http.createServer(function(request, response) {
  if (request.url === "/favicon.ico") {
    return response.end();
  }
  if (request.url === "/") {
    return response.end("Welcome to my secrets manager");
  }

  try {
    const path = request.url.slice(1);
    const URLobject = url.parse(path);
    console.log(path);
    console.log(URLobject);
    const secret = get("pula", URLobject.pathname);

    response.write(secret);
  } catch (error) {
    response.write("Can not read secret");
  }

  response.end();
});

server.listen(8080);
