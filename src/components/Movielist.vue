<template>
    <div class="">
        <svg v-if="isLoading" class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        <!-- ... -->
        </svg>
        <div v-else>
            <MovieHighlightsContainer v-if="searchResults.length == 0 && !searchError" />
            <div v-if="!isLoading && searchResults.length == 0 && !searchError" class="bg-red-600 py-8 text-white text-left">
                <div class="container px-4 xl:w-10/12 mx-auto">
                    <h2 class="text-2xl font-semibold mb-2">Filme entdecken</h2>
                    <p class="text-sm">Dein Film ist nicht dabei? Einfach über die <span class="text-yellow-500 font-semibold cursor-pointer" @click="focusSearch">Suche</span> nach dem gewünschten Titel suchen und eine Bewertung abgeben</p>
                </div>
            </div>
            <div v-if="searchResults.length > 0 && !searchError" class=" text-center font-semibold container mx-auto md:mt-4 md:mb-12  xl:w-10/12 md:px-4">
                <div class="bg-gray-900 py-6 px-2 md:rounded-lg">
                    <p class="text-white text-lg">Deine Suche nach <i>"{{searchInput}}"</i> ergab {{searchResults.length}} Treffer.</p>
                    <button class="bg-yellow-500 py-2 px-3 mt-3 text-gray-900 rounded-lg font-semibold" @click="resetSearch"><font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />Zurück</button>
                </div>
            </div>
            <div v-if="searchResults.length == 0 && searchError" class=" text-center font-semibold container mx-auto md:mt-4 md:mb-12  xl:w-10/12 md:px-4">
                <div class="bg-gray-900 py-6 px-2 md:rounded-lg">
                    <p class="text-white text-lg">Deine Suche nach <i>"{{searchInput}}"</i> ergab leider keine Treffer.</p>
                    <button class="bg-yellow-500 py-2 px-3 mt-3 text-gray-900 rounded-lg font-semibold" @click="resetSearch"><font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />Zurück</button>
                </div>
            </div>
            <transition-group v-if="!isLoading && searchResults.length > 0" tag="section" class="movielist grid gap-0 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full mx-auto relative container mx-auto md:mt-4 mb-16 md:px-4 xl:w-10/12"
                enter-active-class="duration-500 ease-out"
                enter-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="duration-500 ease-in"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
            >       
                    <MovieListitem v-for="movie in searchResults" :key="movie.id" :movie="movie" :scores="triggerscores[triggerscores.map(score => score.movie_id).indexOf(movie.id)]" />
            </transition-group>
            
            <transition-group v-if="!isLoading && searchResults.length == 0 && !searchError" tag="section" class="movielist grid gap-0 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full relative container mx-auto md:mt-4 mb-16 md:px-4 xl:w-10/12"
                enter-active-class="duration-500 ease-out"
                enter-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="duration-500 ease-in"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
            >       
                    <MovieListitem v-for="movie in filteredMovies" :key="movie.id" :movie="movie" :scores="triggerscores[triggerscores.map(score => score.movie_id).indexOf(movie.id)]" />
            </transition-group>

        </div>
        
    </div>
    
</template>

<script>
import MovieListitem from './MovieListitem.vue'
import MovieHighlightsContainer from './MovieHighlightsContainer.vue'

export default {
  name: 'Movielist',
  components: {
      MovieListitem,
      MovieHighlightsContainer
  },
  data() {
    return {
      movieIDs: [620, 744, 2978, 9527,1915,4232,9279,9876, 4247, 4248, 9336, 9622, 2105, 4327,7916, 11806, 9602, 9657,9595,37136, 10112, 14164,11667,9607,9742],
      selectedSortOption: "a-z",
      isLoading: false,
      showNavbar: true,
      lastScrollPosition: 0,
    }
  },
  mounted: function(){
      this.$store.dispatch("setTriggerscores")
      this.$store.dispatch("setBondMovies")
      this.$store.dispatch("filterMovies")
      window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
      window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
      filteredMovies: function(){
          return this.$store.getters.getFilteredMovies
      },
      triggerscores: function() {
          return this.$store.getters.getTriggerscores
      },
      movies: function() {
          return this.$store.getters.getMovies
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
      sortingOption: function(){
          return this.$store.getters.getSortingOption
      }
  },
  watch: {
      movies: function(){
          this.$store.dispatch("filterMovies")
      },
      sortMovies: function(array){
          console.log(this.sortingOtion)
          if (this.selectedSortOption == "a-z"){
              array = array.sort(this.sortAtoZ)
          }
          if (this.sortingOption == "z-a"){
              array = array.sort(this.sortZtoA)
          }
          if (this.sortingOption == "date-desc"){
              array = array.sort(this.sortByDateDesc)
          }
          if (this.sortingOption == "date-asc"){
             array = array.sort(this.sortByDateAsc)
          }
          return array
      }
  },
  methods: {   
      sortAtoZ: function(x,y) {
          const titleX = x.title ? x.title : x.original_title
          const titleY = y.title ? y.title : y.original_title
          if (titleX < titleY) {return -1}
          if (titleX > titleY) {return 1}
          return 0
      },
      sortZtoA: function(x,y) {
          const titleX = x.title ? x.title : x.original_title
          const titleY = y.title ? y.title : y.original_title
          if (titleX > titleY) {return -1}
          if (titleX < titleY) {return 1}
          return 0
      },
      sortByDateDesc: function(x,y){
          return new Date(y.release_date) - new Date(x.release_date)
      },
      sortByDateAsc: function(x,y){
          return new Date(x.release_date) - new Date(y.release_date)
      },
      sortMovies: function(array){
          console.log(this.sortingOtion)
          if (this.selectedSortOption == "a-z"){
              array = array.sort(this.sortAtoZ)
          }
          if (this.sortingOption == "z-a"){
              array = array.sort(this.sortZtoA)
          }
          if (this.sortingOption == "date-desc"){
              array = array.sort(this.sortByDateDesc)
          }
          if (this.sortingOption == "date-asc"){
             array = array.sort(this.sortByDateAsc)
          }
          return array
      },
      searchMovie: function(){
          this.$store.dispatch("setSearchResults")
      },
      onScroll: function () {
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
      }
  }
}
</script>