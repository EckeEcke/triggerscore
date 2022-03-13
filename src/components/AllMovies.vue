<template>
    <div class="bg-gray-900">
        <Searchbox />
        <div v-if="isLoading" class="py-32">
            <font-awesome-icon :icon="['fas', 'angry']" class="text-white text-5xl animate-spin transform scale-150" />
            <p class="text-white font-semibold animate-bounce mt-8">Lädt Filme</p>
        </div>
        <div v-else>
            <div class="container px-4 xl:w-10/12 mx-auto flex flex-col md:flex-row my-8">
            <div class="text-left">
                <h2 class="text-2xl font-semibold mb-2 text-yellow-500 ">Filme entdecken</h2>
                    <p class="text-sm text-white ">Dein Film ist nicht dabei? Einfach über die <span class="text-yellow-500 transition hover:text-yellow-600 font-semibold cursor-pointer" @click="focusSearch">Suche</span> nach dem gewünschten Titel suchen und eine Bewertung abgeben</p>
            </div>
            <div class="ml-auto mt-8 sm:mt-16 -mr-3 sm:mr-0">
                <button class="bg-yellow-500 text-gray-900 disabled:opacity-50 font-semibold p-3 rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-600" @click="showMenu = !showMenu">Menu</button>
            </div>
                
            </div>
            <transition-group v-if="!isLoading && filteredMovies.length > 0" tag="section" class="movielist grid gap-0 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full relative container mx-auto md:mt-4 sm:pb-8 md:px-4 xl:w-10/12" enter-active-class="duration-100 ease-out"
                enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-500 ease-in" leave-class="opacity-100" leave-to-class="opacity-0">
                <MovieListitem v-for="movie in filteredMovies" :key="movie.id" :movie="movie" :scores="triggerscores[triggerscores.map(score => score.movie_id).indexOf(movie.id)]" />
            </transition-group>
            <div class="my-32" v-if="!isLoading && filteredMovies.length == 0">
                <p class="text-white text-xl font-semibold animate-bounce mb-4">Leider keine Ergebnisse</p>
                <button class="font-semibold bg-yellow-500 p-3 shadow text-gray-900 rounded-lg" @click="resetFilter">Filter zurücksetzen</button>
            </div>
            <transition v-if="showMenu" enter-active-class="duration-300 ease-out"
                enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-500 ease-in" leave-class="opacity-100" leave-to-class="opacity-0">
              <div class="bg-white shadow-lg w-64 p-4 right-0 fixed top-0 right-0 h-screen z-20" >
              <p class="text-right"><font-awesome-icon :icon="['fas', 'times']"  @click="showMenu = !showMenu" /></p>
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
              <h2 class="font-semibold text-left mb-2">Score wählen</h2>
              <div class="flex w-full my-3 border border-gray-200 rounded">
                  <select v-model="shownScore" class="w-full md:w-auto h-8 md:h-10 bg-white rounded p-2 outline-none text-sm md:text-base">
                    <option class="py-1" value="rating_total">Gesamtwertung</option>
                    <option class="py-1" value="rating_sexism">Sexismus</option>
                    <option class="py-1" value="rating_racism">Rassismus</option>
                    <option class="py-1" value="rating_others">Sonstige</option>
                    <option class="py-1" value="rating_cringe">Cringe</option>
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
        </div>
    </div>
</template>

<script>
import MovieListitem from './MovieListitem.vue'
import Searchbox from './Searchbox.vue'

export default {
    name: 'AllMovies',
    components: {
        MovieListitem,
        Searchbox,
    },
    data() {
        return {
            selectedSortOption: "a-z",
            showNavbar: true,
            lastScrollPosition: 0,
            showMenu: false
        }
    },
    mounted: function() {
        this.$store.dispatch("setTriggerscores")
        this.$store.dispatch("filterMovies")
        this.$store.dispatch("setRecentRatings")
        this.$store.dispatch("setBondMovies")
        window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    },
    computed: {
        isLoading: function() {
            return this.$store.getters.getHighlightsLoading || this.$store.getters.getMoviesLoading || this.triggerscores.length == 0
        },
        filteredMovies: {
            get: function() {
                return this.$store.getters.getFilteredMovies
            },
            set: function(value) {
                this.$store.commit("setFilteredMovies", value)
            }
        },
        triggerscores: function() {
            return this.$store.getters.getTriggerscores
        },
        movies: function() {
            return this.$store.getters.getMovies
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
        searchInput: {
            get: function() {
                return this.$store.state.searchInput
            },
            set: function(value) {
                this.$store.commit("setSearchInput", value)
            }
        },
        searchResults: function() {
            return this.$store.getters.getSearchResults
        },
        searchError: {
            get: function() {
                return this.$store.getters.getSearchError
            },
            set: function(value) {
                this.$store.commit("setSearchError", value)
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
    watch: {
        movies: function() {
            this.$store.dispatch("filterMovies")
        },
        sortingOption: function() {
            if (this.selectedSortOption == "a-z") {
                this.filteredMovies = this.filteredMovies.sort(this.sortAtoZ)
            }
            if (this.sortingOption == "z-a") {
                this.filteredMovies = this.filteredMovies.sort(this.sortZtoA)
            }
            if (this.sortingOption == "date-desc") {
                this.filteredMovies = this.filteredMovies.sort(this.sortByDateDesc)
            }
            if (this.sortingOption == "date-asc") {
                this.filteredMovies = this.filteredMovies.sort(this.sortByDateAsc)
            }
            if (this.sortingOption == "ts-desc") {
                this.filteredMovies = this.filteredMovies.sort(this.sortByTsDesc)
            }
            if (this.sortingOption == "ts-asc") {
                this.filteredMovies = this.filteredMovies.sort(this.sortByTsAsc)
            }
        }
    },
    methods: {
        sortAtoZ: function(x, y) {
            const titleX = x.title ? x.title : x.original_title
            const titleY = y.title ? y.title : y.original_title
            if (titleX < titleY) { return -1 }
            if (titleX > titleY) { return 1 }
            return 0
        },
        sortZtoA: function(x, y) {
            console.log(x)
            const titleX = x.title ? x.title : x.original_title
            const titleY = y.title ? y.title : y.original_title
            if (titleX > titleY) { return -1 }
            if (titleX < titleY) { return 1 }
            return 0
        },
        sortByDateDesc: function(x, y) {
            return new Date(y.release_date) - new Date(x.release_date)
        },
        sortByDateAsc: function(x, y) {
            return new Date(x.release_date) - new Date(y.release_date)
        },
        sortByTsDesc: function(x, y) {
            const triggerscoreX = this.triggerscores[this.triggerscores.map(score => score.movie_id).indexOf(x.id)].rating_total
            const triggerscoreY = this.triggerscores[this.triggerscores.map(score => score.movie_id).indexOf(y.id)].rating_total
            if (triggerscoreX > triggerscoreY) { return -1 }
            if (triggerscoreX < triggerscoreY) { return 1 }
        },
        sortByTsAsc: function(x, y) {
            const triggerscoreX = this.triggerscores[this.triggerscores.map(score => score.movie_id).indexOf(x.id)].rating_total
            const triggerscoreY = this.triggerscores[this.triggerscores.map(score => score.movie_id).indexOf(y.id)].rating_total
            if (triggerscoreX < triggerscoreY) { return -1 }
            if (triggerscoreX > triggerscoreY) { return 1 }
        },
        sortMovies: function(array) {
            if (this.selectedSortOption == "a-z") {
                array = array.sort(this.sortAtoZ)
            }
            if (this.sortingOption == "z-a") {
                array = array.sort(this.sortZtoA)
            }
            if (this.sortingOption == "date-desc") {
                array = array.sort(this.sortByDateDesc)
            }
            if (this.sortingOption == "date-asc") {
                array = array.sort(this.sortByDateAsc)
            }
            return array
        },
        searchMovie: function() {
            this.$store.dispatch("setSearchResults")
        },
        onScroll: function() {
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
            if (currentScrollPosition < 0) {
                return
            }
            if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
                return
            }
            this.showNavbar = currentScrollPosition < this.lastScrollPosition
            this.lastScrollPosition = currentScrollPosition
        },
        focusSearch: function() {
            const search = document.getElementById("search")
            search.scrollIntoView()
            search.focus()
        },
        resetSearch: function() {
            this.searchInput = ""
            this.$store.dispatch("resetSearch")
        },
        resetSearchResults: function() {
            this.$store.dispatch("resetSearch")
        },
        resetFilter: function() {
            this.$store.dispatch("resetFilter")
            this.$store.dispatch("filterMovies")
        }
    }
}
</script>