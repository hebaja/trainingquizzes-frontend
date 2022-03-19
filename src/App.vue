<template>
  <div id="app">
    <Navbar class="shadow" />
    <b-container fluid="md">
      <router-view />
    </b-container>
    <Footer />
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

/* .default-button {
  background-color: #ffa726!important;
  border: none!important;
  color: #2c3e50!important;
  box-shadow: 3px 5px #c4b8b8;
}

.default-button:hover {
	background-color: #ff9900!important;
  box-shadow: 3px 5px #c4b8b8;
} */

</style>
