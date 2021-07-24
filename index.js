var http = require('http');
var url = require('url');
var fs = require('fs');

const page404 = fs.readFileSync('404.html', (err, data) => {
    if (err) throw err;
    return data;
  });

http.createServer(function (req, res) {
  const q = url.parse(req.url, true);
  let filename = `.${q.pathname}`;
  if (filename === './') {
    filename = './index.html';
  }

  fs.readFile(filename, function(err, data) {

    if (err) {
      res.writeHead(404, {'Content-type': 'text/html'});
      res.write(page404);
      return res.end();
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
  
}).listen(8080);