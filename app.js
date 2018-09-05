const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('http-proxy-middleware');
const serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(path.join(__dirname, 'dist'), { maxAge: 86400000 }));
const apiProxy = proxy('/', { target: 'http://sszzz.me:8080/' });
app.use('/api', apiProxy);
app.use('/oauth/token', apiProxy);

app.get('/*', function(req, res) {

  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
module.exports = app;

// app.listen(process.env.PORT || 3001);
