<template>
  <div id="app-wrap">
    <nav></nav>
    <main>
      <div class="container">
        <h1>{{ message }}</h1>
        <p>{{ apiTest }}</p>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import axios from 'axios'
const apiHost = process.env.API_HOST || ''

export default {
  name: 'App',
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
    this.getData()
  },
  data() {
    return {
      message: 'Vue, Parcel, Express Starter',
      apiTest: ''
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
