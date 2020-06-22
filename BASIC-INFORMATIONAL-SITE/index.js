let http = require('http');
let url = require('url');
let fs = require('fs');
http.createServer((req, res) => {
    let q = url.parse(req.url, true)
    let filename = q.pathname !== '/' ? `.${q.pathname}.html` : 'index.html';
    if(!fs.existsSync(filename)) filename = '404.html';
    fs.readFile(filename, function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8080);
