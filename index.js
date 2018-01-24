var fs = require('fs');
var http = require('http');
var Color = require('colors');
var path = require('path');

var MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".jpeg": "image/jpeg"
}

var server = http.createServer(function (req, res) {

    var file = null;
    var fileName = null;

    if (req.url === "/" || req.url === "/index.html") {
        responseToClient('/index.html', 200);
    } else if (req.url === '/css/style.css') {
        responseToClient(req.url, 200);
    } else if (req.url === "/images/friend.jpeg") {
        responseToClient(req.url, 200);
    } else {
        responseToClient("/images/404.jpeg", 404)
    }

    function responseToClient(url, status) {
        fileName = url.slice(1);
        file = fs.createReadStream(path.join(__dirname, fileName));
        res.writeHead(status, {"Content-Type": MIME_TYPES[path.extname(fileName)]});
        file.pipe(res);
    }

});

server.listen(8000, function () {
    console.log('Serwer utworzony pod adresem http://localhost:8000'.green);
})
