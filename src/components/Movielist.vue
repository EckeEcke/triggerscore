<template>
    
    <div class="container mx-auto md:mt-4 mb-16 md:px-4 xl:w-10/12">
        <svg v-if="isLoading" class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        <!-- ... -->
        </svg>
        <div v-else>
        <div class="flex justify-around mb-2 md:mb-4 flex-col md:flex-row p-4 md:p-0 bg-white md:bg-transparent">
            <div class="flex mx-auto my-3 h-8 md:h-12 self-center w-full md:w-96">
                <div class="rounded flex w-full md:w-auto">
                    <button class="flex items-center justify-center px-4 border-r bg-red-600 rounded-l">
                        <svg class="w-6 h-6 text-gray-600" fill="white" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
                            </path>
                        </svg>
                    </button>
                    <input type="text" v-model="searchTerm" class="px-4 w-full rounded-r outline-none transition focus:bg-red-50 border" placeholder="Search...">
                </div>
            </div>
            <div class="flex justify-end w-full my-3">
                <select v-model="selectedSortOption" class="w-full md:w-auto h-8 md:h-12 border bg-white rounded px-3 py-2 outline-none text-sm md:text-base" @change="sortMovies">
                    <option class="py-1" value="a-z">A-Z</option>
                    <option class="py-1" value="z-a">Z-A</option>
                    <option class="py-1" value="date-desc">Veröffentlichung absteigend</option>
                    <option class="py-1" value="date-asc">Veröffentlichung aufsteigend</option>
                    <option disabled class="py-1" value="ts-desc">Triggerscore absteigend</option>
                    <option disabled class="py-1" value="ts-asc">Triggerscore aufsteigend</option>
                </select>
            </div>
        </div>
        
            <transition-group v-if="!isLoading" tag="section" class="movielist grid gap-2 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full mx-auto relative"
                enter-active-class="duration-500 ease-out"
                enter-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="duration-500 ease-in"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
            >        
                    <MovieListitem v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
            </transition-group>

        </div>
        
    </div>
    
</template>

<script>
import MovieListitem from './MovieListitem.vue'

export default {
  name: 'Movielist',
  components: {
      MovieListitem
  },
  data() {
    return {
      movieIDs: [744,9527,1915,4232,9279,9876, 4247, 4248, 9336, 9622, 2105, 11806, 9602, 9657,9595,37136, 10112],
      movies: [],
      selectedSortOption: "a-z",
      searchTerm: "",
      isLoading: true
    }
  },
  mounted: function(){
      this.loadMovies()
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
      sortAtoZ: function(x,y) {
          if (x.original_title < y.original_title) {return -1}
          if (x.original_title > y.original_title) {return 1}
          return 0
      },
      sortZtoA: function(x,y) {
          if (x.original_title > y.original_title) {return -1}
          if (x.original_title < y.original_title) {return 1}
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
      }

  }
}
</script>