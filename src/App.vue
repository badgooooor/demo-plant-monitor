<template>
  <div id="app-wrap">
    <nav></nav>
    <main>
      <div class="container">
        <h1>{{ message }}</h1>
        <p>Health check : {{ apiTest }}<span v-if="socketConnected"> Socket connected!</span></p>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'
const apiHost = process.env.API_HOST || ''

export default {
  name: 'App',
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
    this.getData()
    this.socket.on('connect', () => {
      this.socketConnected = true
    })
  },
  data() {
    return {
      message: 'Vue, Parcel, Express Starter',
      apiTest: '',
      socket: io('localhost:3000'),
      socketConnected: false,
    };
  },  
  methods: {
    async getData() {
      try {
        const res = await axios.get(`${apiHost}/api/test`)
        this.apiTest = res.data.message
      } catch(e) {
        console.log('Error in the api')
        this.apiTest = 'api is broke!'
      }
    }
  }
};
</script>

<style lang="scss">
@import './assets/styles/app.scss';
</style>
