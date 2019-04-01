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

// Get sensor value. == currently mockup
function getSensorValue() {
  let sH = (Math.random() * 100).toFixed(2)
  let lI = (Math.random() * 100).toFixed(2)
  console.log(`Sensor value from main ctl: ${sH}, ${lI}`)
  return {
    soilHumidity: sH,
    lightIntensity: lI
  }
}

// API Routes
app.use('/api', require('./api'));

app.use('/', (req, res, next) => {
  res.sendFile( path.join(__dirname, '../', 'dist/index.html') );
})

io.on('connection', (socket) => {
  console.log('a user connected ', socket.id)

  socket.on('disconnect', function () {
    console.log('user disconnected ', socket.id)
  })

  setInterval(() => {
    socket.emit('currentSensorValue', getSensorValue())
  }, 30000)
})

http.listen(port, host, console.log("Server listening on http://" + host + ":" + port))
module.exports = app