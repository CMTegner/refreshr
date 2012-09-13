#! /usr/bin/env node

var URL = require("url"),
    static = new (require("node-static").Server)(__dirname),
    updated = Date.now(),
    port = 9898;

require("fs").watch("./").on("change", function () {
    updated = Date.now();
});

require("http").createServer(function (request, response) {
    var url = URL.parse(request.url, true);
    if (url.pathname === "/watchr.js") {
        response.writeHead(200, { "Content-type": "text/javascript; charset=utf-8" });
        response.end(url.query.callback + "(" + updated + ");");
    } else {
        static.serve(request, response);
    }
}).listen(port);

console.log("<script src=\"http://localhost:" + port + "/refreshr.js\"></script>");

