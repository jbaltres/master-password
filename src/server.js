const http = require("http");
const url = require("url");
const fs = require("fs");
const { get } = require("./lib/commands");

const server = http.createServer(function(request, response) {
  //http server erstellen
  if (request.url === "/favicon.ico") {
    response.writeHead(200, { "Content-Type": "text/html" });
    return response.end();
  }
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    const content = fs.readFileSync("src/view/index.html", "utf-8");
    return response.end(content);
  }

  try {
    const path = request.url.slice(1); // das ist der Pfad der als URL eingegeben wird
    const URLobject = url.parse(path); // das ist das komplette Objekt, welches parse ausgibt vom neuen path
    console.log(path);
    console.log(URLobject);
    const secret = get("pula", URLobject.pathname);

    response.write(secret);
  } catch (error) {
    response.write("Can not read secret");
  }

  response.end();
});

server.listen(8080, () => {
  console.log("Server listens to http://localhost:8080");
});
