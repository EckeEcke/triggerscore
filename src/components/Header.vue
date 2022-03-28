<template>
    <header class="w-full h-auto bg-red-800 z-30 shadow-md flex flex-col relative sticky top-0">
        <section class="container mx-auto h-full p-4 xl:w-10/12 flex justify-between relative">
            <div class="flex">
              <router-link to="/" tag="h1" class="text-xl md:text-2xl self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
              </router-link>
            </div>
            <div class="flex">
              <router-link to="/all" tag="a" class="text-white font-semibold self-center mr-6 sm:mr-10 hidden md:block hover:text-yellow-500">{{ $t('header.allMovies') }}</router-link>
              <router-link to="/about" tag="a" class="text-white font-semibold self-center mr-6 sm:mr-10 hidden md:block hover:text-yellow-500">{{ $t('header.about') }}</router-link>
              <router-link to="/faq" tag="a" class="text-white font-semibold self-center mr-6 sm:mr-10 hidden md:block hover:text-yellow-500">{{ $t('header.faq') }}</router-link>
              <router-link to="/contact" tag="a" class="text-white font-semibold self-center mr-6 sm:mr-10 hidden md:block hover:text-yellow-500">{{ $t('header.contact') }}</router-link>
              <button v-if="$root.$i18n.locale == 'en'" @click="switchLanguage('de')" class="mr-6 sm:mr-10"><img class="w-8" src="../assets/images/germany.svg"></button>
              <button v-if="$root.$i18n.locale == 'de'" @click="switchLanguage('en')" class="mr-6 sm:mr-10"><img class="w-8" src="../assets/images/uk.svg"></button>
              <font-awesome-icon :icon="['fas', 'search']" class="text-lg text-white mr-6 sm:mr-10 self-center hover:text-yellow-500" :class="{'animate-bounce': showSearch}" @click="showSearch = !showSearch; showMenu = false;showNav = false" />
              <font-awesome-icon :icon="['fas', 'bars']" class="text-white text-lg self-center md:hidden" @click="showNav = !showNav; showMenu = false; showSearch = false" />
            </div>
            <transition  enter-active-class="duration-300 ease-out"
                enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-500 ease-in" leave-class="opacity-100" leave-to-class="opacity-0">
              <nav v-if="showNav" class="w-80 bg-white h-screen absolute top-0 right-0 shadow-lg md:hidden z-40">
                <div class="text-right text-xl p-4 bg-gray-900 text-white">
                  <font-awesome-icon :icon="['fas', 'times']" @click="showNav = false" />
                </div>
                <div class="bg-gray-900">
                  <router-link to="/" tag="div" class="text-2xl md:text-2xl self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer pb-12" @click="showNav = false">
                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                </router-link> 
                </div>
                <hr>
                <router-link to="/" tag="div" class="text-lg font-semibold self-center hover:text-yellow-500"><div class="py-6" @click="showNav = false">{{ $t('header.home') }}</div></router-link>  
                <hr>
                <router-link to="/all" tag="div" class="text-lg font-semibold self-center hover:text-yellow-500"><div class="py-6" @click="showNav = false">{{ $t('header.allMovies') }}</div></router-link>
                <hr>
                <router-link to="/faq" tag="div" class="text-lg font-semibold self-center hover:text-yellow-500"><div class="py-6" @click="showNav = false">{{ $t('header.faq') }}</div></router-link>
                <hr>
                <router-link to="/about" tag="div" class="text-lg font-semibold self-center hover:text-yellow-500"><div class="py-6" @click="showNav = false">{{ $t('header.about') }}</div></router-link>
                <hr>
                <router-link to="/contact" tag="div" class="text-lg font-semibold self-center hover:text-yellow-500"><div class="py-6" @click="showNav = false">{{ $t('header.contact') }}</div></router-link>
                <hr>
              </nav>
            </transition>
        </section>
        <transition enter-active-class="duration-300 ease-out"
                enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-500 ease-in" leave-class="opacity-100" leave-to-class="opacity-0">
          <section v-if="showSearch">
            <div class="container flex flex-col md:flex-row mx-auto md:px-4 xl:w-10/12 absolute top-full left-1/2 transform -translate-x-1/2 bg-red-700">
              <div class="flex mx-auto p-4 h-16 self-center w-full">
                <div class="rounded flex w-full justify-start">
                  <button class="flex items-center justify-center px-4 rounded-l bg-yellow-500" @click="searchMovie">
                      <font-awesome-icon :icon="['fas', 'search']" class="text-lg" />
                  </button>
                  <input type="text" v-model="searchInput" v-on:keyup.enter="searchMovie" @input="resetSearchResults" class="px-4 w-full outline-none transition" :placeholder="$t('header.searchPlaceholder')">
                  <div class="bg-white rounded-r h-8 w-8 flex justify-center">
                    <font-awesome-icon :icon="['fas', 'times']" class="self-center" @click="showSearch = false" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </transition>
        
        
    </header>
</template>

<script>
export default {
  name: 'Header',
  data(){
    return {
      showSearch: false,
      showMenu: false,
      showNav: false,
    }
  },
  computed: {
    searchInput: {
          get: function() {
              return this.$store.state.searchInput
          },
          set: function(value) {
              this.$store.commit("setSearchInput", value)
          }
    },
    netflixFilter: {
      get: function() {
        return this.$store.state.filterMoviesByNetflix
      },
      set: function(value) {
        this.$store.commit("setNetflixFilter", value)
        this.$store.dispatch("filterMovies")
      }
    },
    primeFilter: {
      get: function() {
        return this.$store.state.filterMoviesByPrime
      },
      set: function(value) {
        this.$store.commit("setPrimeFilter", value)
        this.$store.dispatch("filterMovies")
      }
    },
    disneyFilter: {
      get: function() {
        return this.$store.state.filterMoviesByDisney
      },
      set: function(value) {
        this.$store.commit("setDisneyFilter", value)
        this.$store.dispatch("filterMovies")
      }
    },
    sortingOption: {
      get: function(){
        return this.$store.state.sortingOption
      },
      set: function(value){
        this.$store.commit("setSortingOption",value)
        this.$store.dispatch("filterMovies")
      }
    },
    filterMin: {
      get: function(){
        return this.$store.state.filterMoviesByYearMin
      },
      set: function(value){
        this.$store.commit("setMovieYearMin",value)
        this.$store.dispatch("filterMovies")
      }
    },
    filterMax: {
      get: function(){
        return this.$store.state.filterMoviesByYearMax
      },
      set: function(value){
        this.$store.commit("setMovieYearMax",value)
        this.$store.dispatch("filterMovies")
      }
    },
    results: function(){
      return this.$store.getters.getFilteredMovies.length
    }
  },
  methods: {
    searchMovie: function(){
        if(this.searchInput.length > 0){
          this.$store.dispatch("setSearchResults")
          this.showSearch = false
          this.$router.push('/search')
        }  
      },
      resetSearchResults: function() {
          this.$store.dispatch("resetSearch")
      },
      resetFilter: function(){
        this.$store.dispatch("resetFilter")
        this.$store.dispatch("filterMovies")
      },
      switchLanguage: function(language){
        this.$root.$i18n.locale = language
        this.$store.commit("setLocale",language)
        this.$store.dispatch("setTriggerscores")
        this.$store.dispatch("setRecentRatings")
        this.$store.dispatch("setTop10Sexism")
        this.$store.dispatch("setTop10Racism")
        this.$store.dispatch("setTop10Others")
        this.$store.dispatch("setTop10Cringe")
        this.$store.dispatch("setBondMovies")
      }
  }
}
</script>