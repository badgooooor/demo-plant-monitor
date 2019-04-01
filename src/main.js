import Vue from 'vue'
import App from './App.vue'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'

new Vue({
  el: '#app',
  render: h => h(App)
})

var ioInstance = socketio('http://localhost:3000')
Vue.use(VueSocketio, ioInstance)