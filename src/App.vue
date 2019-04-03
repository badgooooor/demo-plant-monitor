<template>
  <div id="app-wrap">
    <v-toolbar>
      <v-toolbar-title>Plant Monitoring Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <div class="container">
        <v-container fluid full-height grid-list-lg>
          <v-layout justify-center row wrap>
            <v-flex xs8>
              <v-card color="green darken-1" class="white--text">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Server operating status</div>
                    <ul>
                      <li v-if="apiTest" class="white-text">API    : {{ apiTest }}</li>
                      <li v-else class="white-text">API: Error</li>
                      <li v-if="socketConnected" class="white-text">Socket : Connected!</li>
                      <li v-else class="white-text">Socket: Not Connected</li>
                    </ul>
                  </div>
                </v-card-title>
              </v-card>  
            </v-flex>
            <v-flex xs8>
              <v-card color="light-blue darken-4" class="white--text">
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
      apiTest: false,
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
        const data = res.data.message
        if (data == 'api works!') this.apiTest = true
      } catch(e) {
        console.log('Error in the api')
        this.apiTest = false
      }
    }
  }
};
</script>

<style lang="scss">
@import './assets/styles/app.scss';
</style>
