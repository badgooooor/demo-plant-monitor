require('dotenv').config()
const express = require('express');
const compression = require("compression");
const path = require('path');
const isDev = process.env.NODE_ENV === 'development'

const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

process.env.TZ = 'Asia/Bangkok';
process.env.isDev = isDev

var http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(compression());
app.use(express.static(path.resolve('./dist')));

// API Routes
app.use('/api', require('./api'));

app.use('/', (req, res, next) => {
  res.sendFile( path.join(__dirname, '../', 'dist/index.html') );
})

io.on('connection', (socket) => {
  console.log('a user connected', socket.id)
})

http.listen(port, host, console.log("Server listening on http://" + host + ":" + port))
module.exports = app