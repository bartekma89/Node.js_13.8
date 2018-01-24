var fs = require('fs');
var http = require('http');
var Color = require('colors');
var path = require('path');

var server = http.createServer(function (req, res) {

    var file = null;
    var fileName = null;

    if (req.url === "/" || req.url === "/index.html") {
        fileName = "index.html";
        file = fs.createReadStream(path.join(__dirname, fileName));
        res.writeHead(200, {
            "Conteent-Type": "text/html"
        });
        file.pipe(res);
    } else if (req.url === '/css/style.css') {
        fileName = req.url.slice(1);
        file = fs.createReadStream(path.join(__dirname, fileName));
        res.writeHead(200, {
            "Content-Type": "text/css"
        });
        file.pipe(res);
    } else if (req.url === "/images/friend.jpeg") {
        fileName = req.url.slice(1);
        file = fs.createReadStream(path.join(__dirname, fileName));
        res.writeHead(200, {"Content-Type": "image/jpeg"});
        file.pipe(res);
    } else {
        file = fs.createReadStream(path.join(__dirname, 'images', "404.jpeg"));
        res.writeHead(404, {
            "Content-Type": "image/jpeg"
        });
        file.pipe(res);
    }


});

server.listen(8000, function () {
    console.log('Serwer utworzony pod adresem http://localhost:8000'.green);
})
