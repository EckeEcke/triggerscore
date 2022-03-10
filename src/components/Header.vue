<template>
    <header class="w-full h-auto bg-red-600 z-10 shadow-md flex flex-col relative sticky top-0">
        <section class="container mx-auto h-full p-4 xl:w-10/12 flex justify-between relative">
            <div class="flex">
              <font-awesome-icon :icon="['fas', 'bars']" class="text-white text-lg self-center mr-3 sm:hidden" @click="showNav = !showNav; showMenu = false; showSearch = false" />
              <router-link to="/" tag="h1" class="text-xl md:text-2xl self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
              </router-link>
            </div>
            <div class="flex">
              <router-link to="/about" tag="a" class="text-white font-semibold self-center mr-10 hidden sm:block hover:text-yellow-500">About</router-link>
              <router-link to="/faq" tag="a" class="text-white font-semibold self-center mr-10 hidden sm:block hover:text-yellow-500">FAQ</router-link>
              <router-link to="/contact" tag="a" class="text-white font-semibold self-center mr-10 hidden sm:block hover:text-yellow-500">Kontakt</router-link>
              <font-awesome-icon :icon="['fas', 'search']" class="text-lg text-yellow-300 mr-8 md:mr-10 self-center hover:text-yellow-500" :class="{'animate-bounce': showSearch}" @click="showSearch = !showSearch; showMenu = false;showNav = false" />
              <font-awesome-icon :icon="['fas', 'ellipsis-v']" class="text-lg text-yellow-300 self-center hover:text-yellow-500" :class="{'animate-bounce': showMenu}" @click="showMenu = !showMenu; showSearch = false; showNav = false" />
            </div>
            <transition  enter-active-class="duration-300 ease-out"
                enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-500 ease-in" leave-class="opacity-100" leave-to-class="opacity-0">
              <nav v-if="showNav" class="w-80 bg-gray-900 h-screen absolute top-0 left-0 shadow-lg sm:hidden z-40">
                <div class="text-right text-white text-xl p-4">
                  <font-awesome-icon :icon="['fas', 'times']" @click="showNav = false" />
                </div>
                <router-link to="/" tag="div" class="text-2xl md:text-2xl self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer mb-12" @click="showNav = false">
                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                </router-link>     
                <hr>
                <router-link to="/faq" tag="div" class="text-white text-lg font-semibold self-center hover:text-yellow-500"><div class="py-6" @click="showNav = false">FAQ</div></router-link>
                <hr>
                <router-link to="/about" tag="div" class="text-white text-lg font-semibold self-center hover:text-yellow-500"><div class="py-6" @click="showNav = false">About</div></router-link>
                <hr>
                <router-link to="/contact" tag="div" class="text-white text-lg font-semibold self-center hover:text-yellow-500"><div class="py-6" @click="showNav = false">Kontakt</div></router-link>
                <hr>
              </nav>
            </transition>
            <transition enter-active-class="duration-300 ease-out"
                enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-500 ease-in" leave-class="opacity-100" leave-to-class="opacity-0">
              <div v-if="showMenu" class="bg-white shadow-lg rounded-lg w-64 p-4 absolute top-full right-0 mt-2" >
              <p class="text-right"><font-awesome-icon :icon="['fas', 'times']" @click="showMenu = false" /></p>
              <h2 class="font-semibold text-left mb-2">Sortieren</h2>
              <div class="flex w-full my-3 border border-gray-200 rounded">
                <select v-model="sortingOption" class="w-full md:w-auto h-8 md:h-10 bg-white rounded p-2 outline-none text-sm md:text-base">
                    <option class="py-1" value="a-z">A-Z</option>
                    <option class="py-1" value="z-a">Z-A</option>
                    <option class="py-1" value="date-desc">Jahr absteigend</option>
                    <option class="py-1" value="date-asc">Jahr aufsteigend</option>
                    <option class="py-1" value="ts-desc">Triggerscore absteigend</option>
                    <option class="py-1" value="ts-asc">Triggerscore aufsteigend</option>
                </select>
              </div>
              <hr class="my-3">
              <h2 class="font-semibold text-left mb-2">Filtern</h2>
              <div class="form-check text-left mb-2 h-8">
                <input v-model="netflixFilter" class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="filter-netflix">
                <label class="form-check-label inline-block text-gray-800 text-left" for="filter-netflix">
                  <img class="h-4 mt-1 mx-2" src="../assets/images/netflix-logo.svg">
                </label>
              </div>
              <div class="form-check text-left mb-2 h-8">
                <input v-model="primeFilter" class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="filter-amazon">
                <label class="form-check-label inline-block text-gray-800 text-left" for="filter-amazon">
                  <img class="h-4 mt-1 mx-2" src="../assets/images/amazon-prime-logo.svg">
                </label>
              </div>
              <div class="form-check text-left mb-2 h-8">
                <input v-model="disneyFilter" class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="filter-disney">
                <label class="form-check-label inline-block text-gray-800 text-left" for="filter-disney">
                  <img class="h-6 ml-2" src="../assets/images/disney+-logo.svg">
                </label>
              </div>
              <div class="flex my-4">
                <div class="w-1/2 mr-2 flex flex-col">
                  <label class="text-left text-sm font-semibold" for="filter-start">Von</label>
                  <input v-model="filterMin" type="number" id="filter-start" class="border border-gray-200 rounded w-24 p-2 text-center" min=1900 max=2010 placeholder="1900">
                </div>
                <div class="w-1/2 mr-2 flex flex-col">
                  <label class="text-left text-sm font-semibold" for="filter-end">Bis</label>
                  <input v-model="filterMax" type="number" id="filter-end" class="border border-gray-200 rounded w-24 p-2 text-center" min=1900 max=2010 placeholder="2010">  
                </div>
              </div>
              <div class="text-sm my-5 font-semibold">{{results}} Ergebnisse</div>
              <hr  class="my-3">
              <button class="font-semibold bg-yellow-500 py-3 w-full shadow text-gray-900 rounded-lg" @click="resetFilter">Filter zurücksetzen</button>
            </div>
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
                  <input type="text" v-model="searchInput" v-on:keyup.enter="searchMovie" @input="resetSearchResults" class="px-4 w-full outline-none transition" placeholder="Film suchen...">
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
      }
  }
}
</script>