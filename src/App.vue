<template>
  <div id="app-wrap">
    <nav></nav>
    <main>
      <div class="container">
        <v-container fluid fill-height>
          <v-layout justify-center row wrap>
            <h2>{{ message }}</h2>
            <v-flex xs12 sm8 md4>
              <v-card dark class="elevation-1 light-blue darken-1 flat">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Server operating status</div>
                    <ul>
                      <li class="white-text">API    : {{ apiTest }}</li>
                      <li class="white-text">Socket : {{ socketConnected }}</li>
                    </ul>
                  </div>
                </v-card-title>
              </v-card>
              <v-card dark class="elevation-1 green darken-4 flat">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Environment status</div>
                    <ul>
                      <li class="white-text">Soil Humidity : {{ soilHumidity }}</li>
                      <li class="white-text">Light Intensity : {{ lightIntensity }}</li>
                    </ul>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
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
    this.socket.on('currentSensorValue', (data) => {
      this.socketConnected = true
      this.soilHumidity = data.soilHumidity
      this.lightIntensity = data.lightIntensity
      console.log(`${this.soilHumidity}, ${this.lightIntensity}`)
    })
  },
  data() {
    return {
      message: 'Plant Monitoring',
      apiTest: '',
      socket: io(window.location.hostname),
      socketConnected: false,
      soilHumidity: 0,
      lightIntensity: 0
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
