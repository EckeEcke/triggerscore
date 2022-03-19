<template>
  <div id="app" class="bg-gray-100 min-h-screen min-h-screen relative pb-72 bg-no-repeat bg-center bg-cover bg-fixed" :style="{'background-image': 'linear-gradient(rgba(10, 0, 0, 0.7), rgba(10, 0, 0, 0.7)),' + 'url(' + require('./assets/images/arnold.jpg') + ')'}">
    <Header />
    <transition tag="section" class="movielist grid gap-2 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full mx-auto relative"
            enter-active-class="duration-100 ease-out"
            enter-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-100 ease-in"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
        >     
    <router-view></router-view>
    </transition>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}

</script>

<style>
@font-face {
  font-family: Lato;
  src: url("./assets/Lato-Regular.ttf");
}
#app {
  font-family: Avenir, Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
