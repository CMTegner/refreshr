var CONNECT = require("connect"),
    updated = Date.now();

CONNECT()
    .use(CONNECT.query())
    .use(function (request, response) {
        response.writeHead(200, { "Content-type": "text/javascript; charset=utf-8" });
        response.end(request.query.callback + "(" + updated + ");");
    })
    .listen(9898);

require("fs").watch("./").on("change", function (event, filename) {
    updated = Date.now();
});

