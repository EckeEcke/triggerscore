<template>
  <div class="container sm:px-4 xl:w-10/12 mx-auto">
    <div class="text-left px-8 py-4 rounded-t" :style="{'background-image': 'linear-gradient(rgba(220, 0, 0, 0.6), rgba(220, 0, 100, 0.6))'}">
      <h2 class="text-2xl md:text-3xl font-semibold mb-2 text-white">{{ $t('index.headline') }}</h2>
      <p class="text-sm text-white ">{{ $t('index.intro1') }}<span class="text-yellow-500 transition hover:text-yellow-600 font-semibold cursor-pointer" @click="focusSearch">{{ $t('index.search') }}</span>{{ $t('index.intro2') }}</p>
    </div>
    <div class="bg-gray-900 px-0 py-4 rounded-b text-white">
      <div class="flex items-end justify-between">
        <div class="flex">
          <div class="w-52 mr-4">
              <h2 class="font-semibold text-left mb-2">{{ $t('filter.sort') }}</h2>
                  <div class="flex w-full my-3 border border-gray-200 rounded">
                      <select v-model="sortingOption" class="w-full h-8 md:h-10 bg-white rounded p-2 outline-none text-sm md:text-base">
                          <option class="py-1" value="a-z">{{ $t('filter.AtoZ') }}</option>
                          <option class="py-1" value="z-a">{{ $t('filter.ZtoA') }}</option>
                          <option class="py-1" value="date-desc">{{ $t('filter.yearDesc') }}</option>
                          <option class="py-1" value="date-asc">{{ $t('filter.yearAsc') }}</option>
                          <option class="py-1" value="ts-desc">{{ $t('filter.scoreDesc') }}</option>
                          <option class="py-1" value="ts-asc">{{ $t('filter.scoreAsc') }}</option>
                      </select>
                  </div>
          </div>
          <div class="w-52">
              <h2 class="font-semibold text-left mb-2 ">{{ $t('filter.chooseScore') }}</h2>
              <div class="flex w-full my-3 border border-gray-200 rounded">
                  <select v-model="shownScore" class="w-full h-8 md:h-10 bg-white rounded p-2 outline-none text-sm md:text-base">
                      <option class="py-1" value="rating_total">{{ $t('categories.totalScore') }}</option>
                      <option class="py-1" value="rating_sexism">{{ $t('categories.sexism') }}</option>
                      <option class="py-1" value="rating_racism">{{ $t('categories.racism') }}</option>
                      <option class="py-1" value="rating_others">{{ $t('categories.others') }}</option>
                      <option class="py-1" value="rating_cringe">{{ $t('categories.cringe') }}</option>
                  </select>
              </div>
          </div>
        </div>
        <div class="flex h-24 flex-col">
        <h2 class="font-semibold text-left mt-2 mb-7">{{ $t('filter.filterByScore') }}</h2>
        <Rangeslider />
        </div>
        <div class="">
          <h2 class="font-semibold text-left">{{ $t('filter.filterByRelease') }}</h2>
          <div class="flex">
            <div class="w-1/2 mr-2 flex flex-col my-3">
              <input v-model="filterMin" type="number" id="filter-start" class="border border-gray-200 rounded w-20 p-2 text-center h-10" min=1900 max=2010 :placeholder="$t('filter.from')" @input="scrollToTop">
            </div>
            <div class="w-1/2 mr-2 flex flex-col my-3">
              <input v-model="filterMax" type="number" id="filter-end" class="border border-gray-200 rounded w-20 p-2 text-center h-10" min=1900 max=2010 :placeholder="$t('filter.to')" @input="scrollToTop">  
            </div>
          </div>
        </div>
    </div>
    
    
    <hr class="my-4">
    <div class="flex justify-between items-center">
      <div class="gap-4">
          <div class="flex items-center -mb-3">
            <div class="form-check text-left mb-1 h-8 mr-8">
              <input v-model="netflixFilter" class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="filter-netflix">
              <label class="form-check-label inline-block text-gray-800 text-left " for="filter-netflix">
                  <img class="h-4 mt-1 mx-2" src="../assets/images/netflix-logo.svg">
              </label>
          </div>
          <div class="form-check text-left mb-1 h-8 mr-8">
              <input v-model="primeFilter" class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="filter-amazon">
              <label class="form-check-label inline-block text-gray-800 text-left " for="filter-amazon">
              <img class="h-5 mt-1 mx-2" src="../assets/images/amazon-prime-logo3.png">
              </label>
          </div>
          <div class="form-check text-left mb-1 mr-8 h-8">
              <input v-model="disneyFilter" class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="filter-disney">
              <label class="form-check-label inline-block text-gray-800 text-left " for="filter-disney">
              <img class="h-7 ml-2 mb-1" src="../assets/images/disney+-logo2.svg">
              </label>
          </div>
          <div class="form-check text-left mb-1 h-8">
              <input v-model="skyFilter" class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="filter-disney">
              <label class="form-check-label inline-block text-gray-800 text-left " for="filter-disney">
              <img class="h-4 mt-1 ml-2" src="../assets/images/sky.svg">
              </label>
          </div>
          </div>
          
        </div>
      <div class="font-semibold p-3 ml-auto mr-4">{{results}} {{ $t('filter.results') }}</div>
        <button class="font-semibold text-yellow-500 p-3 w-auto text-white uppercase" @click="resetFilter">{{ $t('filter.resetFilter') }}</button>
      </div>
    </div>
  </div> 
</template>

<script>
import Rangeslider from './Rangeslider.vue'

export default {
  name: 'Filtermenu',
  components: {
    Rangeslider
  },
  computed: {
    searchText: function(){
      return this.$t('index.intro')
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
    skyFilter: {
      get: function() {
        return this.$store.state.filterMoviesBySky
      },
      set: function(value) {
        this.$store.commit("setSkyFilter", value)
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
            search.scrollIntoView({block: "start"})
            search.focus()
        },
        scrollToTop: function() {
          window.scrollTo(0,0)
        }
  }

}
</script>