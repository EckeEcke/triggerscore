<template>
  <div class="container sm:px-4 xl:w-10/12 mx-auto px-4">
    <div class="text-left px-8 py-4 rounded-t-lg" :style="{'background-image': 'linear-gradient(rgba(220, 0, 0, 0.6), rgba(220, 0, 100, 0.6))'}">
      <h2 class="text-2xl md:text-3xl font-semibold mb-2 text-white">Filme entdecken</h2>
                        <p class="text-sm text-white ">Dein Film ist nicht dabei? Einfach über die <span class="text-yellow-500 transition hover:text-yellow-600 font-semibold cursor-pointer" @click="focusSearch">Suche</span> nach dem gewünschten Titel suchen und eine Bewertung abgeben</p>
    </div>
    <div class="bg-white px-8 py-4 rounded-b-lg">
      <div class="flex items-end justify-between">
        <div class="flex">
          <div class="w-52 mr-4">
              <h2 class="font-semibold text-left mb-2">Sortieren</h2>
                  <div class="flex w-full my-3 border border-gray-200 rounded">
                      <select v-model="sortingOption" class="w-full h-8 md:h-10 bg-white rounded p-2 outline-none text-sm md:text-base">
                          <option class="py-1" value="a-z">A-Z</option>
                          <option class="py-1" value="z-a">Z-A</option>
                          <option class="py-1" value="date-desc">Jahr absteigend</option>
                          <option class="py-1" value="date-asc">Jahr aufsteigend</option>
                          <option class="py-1" value="ts-desc">Triggerscore absteigend</option>
                          <option class="py-1" value="ts-asc">Triggerscore aufsteigend</option>
                      </select>
                  </div>
          </div>
          <div class="w-52">
              <h2 class="font-semibold text-left mb-2 ">Score wählen</h2>
              <div class="flex w-full my-3 border border-gray-200 rounded">
                  <select v-model="shownScore" class="w-full h-8 md:h-10 bg-white rounded p-2 outline-none text-sm md:text-base">
                      <option class="py-1" value="rating_total">Gesamtwertung</option>
                      <option class="py-1" value="rating_sexism">Sexismus</option>
                      <option class="py-1" value="rating_racism">Rassismus</option>
                      <option class="py-1" value="rating_others">Sonstige</option>
                      <option class="py-1" value="rating_cringe">Cringe</option>
                  </select>
              </div>
          </div>
        </div>
        
        <div class="flex mb-2">
          <div class="form-check text-left mb-2 h-8 mr-8">
              <input v-model="netflixFilter" class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="filter-netflix">
              <label class="form-check-label inline-block text-gray-800 text-left " for="filter-netflix">
                  <img class="h-4 mt-1 mx-2" src="../assets/images/netflix-logo.svg">
              </label>
          </div>
          <div class="form-check text-left mb-2 h-8 mr-8">
              <input v-model="primeFilter" class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="filter-amazon">
              <label class="form-check-label inline-block text-gray-800 text-left " for="filter-amazon">
              <img class="h-4 mt-1 mx-2" src="../assets/images/amazon-prime-logo.svg">
              </label>
          </div>
          <div class="form-check text-left mb-2 h-8">
              <input v-model="disneyFilter" class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="filter-disney">
              <label class="form-check-label inline-block text-gray-800 text-left " for="filter-disney">
              <img class="h-6 ml-2" src="../assets/images/disney+-logo.svg">
              </label>
          </div>
        </div>
        <div class="flex">
          <div class="w-1/2 mr-2 flex flex-col">
            <label class="text-left text-sm font-semibold  mb-2" for="filter-start">Von</label>
            <input v-model="filterMin" type="number" id="filter-start" class="border border-gray-200 rounded w-20 p-2 text-center my-3" min=1900 max=2010 placeholder="1900">
          </div>
          <div class="w-1/2 mr-2 flex flex-col">
            <label class="text-left text-sm font-semibold  mb-2" for="filter-end">Bis</label>
            <input v-model="filterMax" type="number" id="filter-end" class="border border-gray-200 rounded w-20 p-2 text-center my-3" min=1900 max=2010 placeholder="2010">  
          </div>
        </div>
    </div>
    <hr class="mt-4 mb-2">
    <div class="flex justify-between items-center">
      <div class="text-sm font-semibold">{{results}} Ergebnisse</div>
        <button class="font-semibold text-yellow-500 p-3 w-auto text-sm" @click="resetFilter">Filter zurücksetzen</button>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'Filtermenu',
  computed: {
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
    },
    shownScore: {
      get: function(){
        return this.$store.state.shownScore
      },
      set: function(value){
        this.$store.commit("setShownScore",value)
        this.$store.dispatch("filterMovies")
      }
    },
  },
  methods: {
      
        resetFilter: function() {
            this.$store.dispatch("resetFilter")
            this.$store.dispatch("filterMovies")
        },
        focusSearch: function() {
            const search = document.getElementById("search")
            search.scrollIntoView()
            search.focus()
        },
  }

}
</script>