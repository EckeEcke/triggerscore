<template>
  <div id="app" class="flex flex-col radial-background h-auto min-h-screen min-h-screen relative bg-no-repeat bg-center bg-cover bg-fixed"> <!-- :style="{'background-image': 'linear-gradient(rgba(10, 0, 0, 0.7), rgba(10, 0, 0, 0.7)),' + 'url(' + require('./assets/images/arnold.jpg') + ')'}"  just add it back in within tag-->
    <Header />
    <transition tag="section" class="movielist grid gap-2 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full mx-auto"
            mode="out-in"
            enter-active-class="duration-100 ease-out"
            enter-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-100 ease-in"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
        >     
    <router-view></router-view>
    </transition>
    
    <Footer class="mt-auto" />
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
@font-face {
  font-family: Avenir;
  src: url("./assets/Avenir.otf");
}
@font-face {
  font-family: AvenirLight;
  src: url("./assets/AvenirLight.otf");
}
#app {
  font-family: AvenirLight, Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.font-semibold {
  font-family: Avenir;
}

</style>
