<template>
    
    <div class="">
        <svg v-if="isLoading" class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        <!-- ... -->
        </svg>
        <div v-else>
        <div class="flex justify-around flex-col md:flex-row p-4 md:p-0 bg-gradient-to-b from-red-700 to red-600 to-red-600 sticky top-0 z-10 shadow-lg">
            <div class="container flex flex-col md:flex-row mx-auto md:px-4 xl:w-10/12">
                <div class="flex mx-auto my-3 h-8 md:h-10 self-center w-full md:w-96">
                <div class="rounded flex w-full md:w-auto justify-start">
                    <button class="flex items-center justify-center px-4 rounded-l" :class="searchTerm.length == 0 ? 'bg-yellow-500' : 'bg-yellow-400'" @click="searchMovie">
                        <svg class="w-6 h-6 text-gray-600" fill="#111827" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
                            </path>
                        </svg>
                    </button>
                    <input type="text" id="search" v-model="searchTerm" @input="()=>{searchResults = [];searchError = false}" v-on:keyup.enter="searchMovie" class="px-4 w-full rounded-r outline-none transition" placeholder="Film suchen...">
                </div>
            </div>
            <div class="flex justify-end w-full my-3" :class="{'hidden': !showNavbar, 'md:flex': !showNavbar}">
                <select v-model="selectedSortOption" class="w-full md:w-auto h-8 md:h-10 bg-white rounded px-3 py-2 outline-none text-sm md:text-base" @change="sortMovies">
                    <option class="py-1" value="a-z">A-Z</option>
                    <option class="py-1" value="z-a">Z-A</option>
                    <option class="py-1" value="date-desc">Veröffentlichung absteigend</option>
                    <option class="py-1" value="date-asc">Veröffentlichung aufsteigend</option>
                    <option disabled class="py-1" value="ts-desc">Triggerscore absteigend</option>
                    <option disabled class="py-1" value="ts-asc">Triggerscore aufsteigend</option>
                </select>
            </div>
            </div>
            
        </div>
            <div v-if="searchResults.length > 0" class="bg-gray-900 bg-opacity-95 text-white text-lg md:text-2xl pt-6 pb-4 md:rounded-lg container mx-auto my-2 md:my-8 md:px-4 xl:w-10/12">
                <p>Deine Suche nach <b>"{{ searchTerm }}"</b> ergab {{ searchResults.length}} Treffer</p>
                <button class="bg-yellow-500 text-gray-900 p-4 w-32 text-base rounded-lg mt-4" @click="searchResults=[]"><font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />Zurück</button>
            </div>
            <div v-if="searchError" class="bg-gray-900 bg-opacity-95 text-white text-lg md:text-2xl pt-6 pb-4 md:rounded-lg container mx-auto my-2 md:my-8 md:px-4 xl:w-10/12">
                <p>Deine Suche nach <b>"{{ searchTerm }}"</b> ergab leider keine Treffer. Bitte versuche es erneut.</p>
                <button class="bg-yellow-500 text-gray-900 p-4 w-32 text-base rounded-lg mt-4" @click="searchError = false"><font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />Zurück</button>
            </div>
            <div v-if="searchResults.length == 0 && !searchError" class="w-full bg-gray-900 bg-opacity-95 px-4 py-8 mb-0">
                <div class="font-semibold mb-4 container mx-auto xl:w-10/12">
                    <h2 class="text-2xl text-yellow-500 text-left text-underline mb-2">James Bond Special</h2>
                    <p class="text-left text-white">Lizenz zum Triggern: Film anklicken und Triggerscore vergeben</p>
                </div>
                
                <div id="highlight-container" class="hide-scrollbar flex flex-none flex-row  overflow-x-scroll py-4 px-0 md:px-4">
                    <MovieHighlightsItem v-for="movie in bondMovies" :key="movie.id" :movie="movie"/>
                </div>
                <div class="flex justify-between md:px-4 container mx-auto xl:w-10/12">
                    <button @click="scrollHighlightContainer('left')"><font-awesome-icon class="text-yellow-500 text-3xl transform hover:scale-105" :icon="['fas', 'arrow-circle-left']" /></button>
                    <button @click="scrollHighlightContainer('right')"><font-awesome-icon class="text-yellow-500 text-3xl transform hover:scale-105" :icon="['fas', 'arrow-circle-right']" /></button>
                </div>
                
            </div>
            <div v-if="!isLoading && searchResults.length == 0 && !searchError" class="bg-red-600 py-8 text-white text-left">
                <div class="container px-4 xl:w-10/12 mx-auto">
                    <h2 class="text-2xl font-semibold mb-2">Filme entdecken</h2>
                    <p class="text-sm">Dein Film ist nicht dabei? Einfach über die <span class="text-yellow-500 font-semibold cursor-pointer" @click="focusSearch">Suche</span> nach dem gewünschten Titel suchen und eine Bewertung abgeben</p>
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
                    <MovieListitem v-for="movie in searchResults" :key="movie.id" :movie="movie" />
            </transition-group>
            
            <transition-group v-if="!isLoading && searchResults.length == 0 && !searchError" tag="section" class="movielist grid gap-0 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full relative container mx-auto md:mt-4 mb-16 md:px-4 xl:w-10/12"
                enter-active-class="duration-500 ease-out"
                enter-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="duration-500 ease-in"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
            >       
                    <MovieListitem v-for="movie in movies" :key="movie.id" :movie="movie" />
            </transition-group>

        </div>
        
    </div>
    
</template>

<script>
import MovieListitem from './MovieListitem.vue'
import MovieHighlightsItem from './MovieHighlightsItem.vue'

export default {
  name: 'Movielist',
  components: {
      MovieListitem,
      MovieHighlightsItem
  },
  data() {
    return {
      movieIDs: [620, 744, 2978, 9527,1915,4232,9279,9876, 4247, 4248, 9336, 9622, 2105, 4327,7916, 11806, 9602, 9657,9595,37136, 10112, 14164,11667,9607,9742],
      bondMovieIDs: [646,657,658,660,667,668,681,253,682,691,698,699,700,707,708,709,710,714,36643,36669],
      movies: [],
      bondMovies: [],
      selectedSortOption: "a-z",
      searchTerm: "",
      isLoading: true,
      searchResults: [],
      searchError: false,
      showNavbar: true,
      lastScrollPosition: 0
    }
  },
  mounted: function(){
      this.loadMovies()
      this.loadBondMovies()
      window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
      window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
      filteredMovies: function(){
          return this.movies.filter(title => title.original_title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      }
  },
  methods: {
      loadMovies: function() {
          const loadedMovies = Promise.all(this.movieIDs.map(id => 
              fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=de`)
              .then((res) => res.json())
              .then(this.isLoading = false)
              .catch(console.log("Something went wrong"))
          ))
          loadedMovies.then(res => this.movies = res.sort(this.sortAtoZ))
      },
      loadBondMovies: function() {
          const loadedMovies = Promise.all(this.bondMovieIDs.map(id => 
              fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=de`)
              .then((res) => res.json())
              .then(this.isLoading = false)
              .catch(console.log("Something went wrong"))
          ))
          loadedMovies.then(res => this.bondMovies = res)
      },
      scrollHighlightContainer: function(direction){
          const highlight = document.getElementById("highlight-container")
          if(direction == 'left'){
              highlight.scrollBy({top: 0, left: -window.innerWidth/2, behavior : "smooth"})
          } else highlight.scrollBy({top: 0, left: window.innerWidth/2, behavior : "smooth"})
      },
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
      sortMovies: function(){
          console.log(this.selectedSortOption)
          if (this.selectedSortOption == "a-z"){
              this.movies = this.movies.sort(this.sortAtoZ)
          }
          if (this.selectedSortOption == "z-a"){
              this.movies = this.movies.sort(this.sortZtoA)
          }
          if (this.selectedSortOption == "date-desc"){
              this.movies = this.movies.sort(this.sortByDateDesc)
          }
          if (this.selectedSortOption == "date-asc"){
              this.movies = this.movies.sort(this.sortByDateAsc)
          }
      },
      searchMovie: function(){
          this.searchError = false
          const fetchedSearchResults = fetch(`https://api.themoviedb.org/3/search/movie?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=de&page=1&include_adult=false&query=${this.searchTerm}`)
                                .then(res => res.json())
                                .catch()
          fetchedSearchResults.then(res => {
              this.searchResults = res.results.filter(result => {
                return result.poster_path && result.overview && result.release_date && parseInt(result.release_date.substring(0,4)) < 2010}); 
                if(this.searchResults.length == 0){
                    this.searchError = true
            }})
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
      }
  }
}
</script>