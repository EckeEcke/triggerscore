<template>
    <main class="bg-gray-900">
        <div v-if="searchResults.length == 0 && searchError" class=" text-center font-semibold container mx-auto my-8  xl:w-10/12 md:px-4">
                <div class="py-6 px-2 md:rounded-lg">
                    <p class="text-white text-lg">{{ $t('search.noResults1') }} <i>"{{searchTerm}}"</i>&nbsp; {{ $t('search.noResults2') }}</p>
                    <NoResultsAnimation />
                    <button class="bg-yellow-500 transition hover:bg-yellow-600 p-3 my-6 rounded font-semibold text-white uppercase" @click="resetSearch"><font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />{{ $t('general.back') }}</button>
                </div>
            </div>
            <div v-if="searchResults.length > 0 && !searchError" class=" text-center font-semibold container mx-auto my-8  xl:w-10/12 md:px-4">
                <div class="py-6 px-2 md:rounded">
                    <p class="text-white text-lg">{{ $t('search.results',[searchTerm,searchResults.length])}}</p>
                    <button class="bg-yellow-500 transition hover:bg-yellow-600 p-3 mt-3 text-white rounded font-semibold text-white uppercase" @click="$router.go(-1)"><font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />{{ $t('general.back') }}</button>
                </div>
            </div>
    <transition-group v-if="searchResults.length > 0" tag="section" class="movielist grid gap-0 md:gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full mx-auto relative container mx-auto md:mt-4 mb-24 md:px-4 xl:w-10/12"
        enter-active-class="duration-500 ease-out"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-500 ease-in"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
    >       
            <MovieListitem v-for="movie in searchResults" :key="movie.id" :movie="movie" :scores="triggerscores[triggerscores.map(score => score.movie_id).indexOf(movie.id)]" />
    </transition-group>
    <button v-if="searchResults.length > 0 && !hideLoadMore" @click="searchMore" class="bg-yellow-500 transition hover:bg-yellow-600 p-3 my-6 rounded font-semibold text-white uppercase -mt-8 mb-20">{{ $t('search.searchMore') }}</button>
    </main>
    

</template>

<script>
import MovieListitem from './MovieListitem.vue'
import NoResultsAnimation from './NoResultsAnimation.vue'

export default {
  name: 'search',
  components: {
      MovieListitem,
      NoResultsAnimation
  },
  data(){
    return {
        page: 2,
        hideLoadMore: false
    }
  },
  mounted: function() {
    this.redirectToHome()
  },
  computed: {
      searchTerm: function() {
          return this.$store.getters.getSearchTerm
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
      triggerscores: function() {
          return this.$store.getters.getTriggerscores
      },

  },
  methods: {
      resetSearchResults: function() {
          this.$store.dispatch("resetSearch")
          this.$router.go(-1)
      },
      resetSearch: function() {
            this.searchInput = ""
            this.$store.dispatch("resetSearch")
            this.$router.go(-1)
        },
        redirectToHome: function() {
            if(this.$store.getters.getSearchTerm == ""){
                this.$router.push("/")
            }
        },
        searchMore: function(){
            const lengthBeforeLoad = this.searchResults.length.valueOf()
            this.$store.dispatch("searchMore",this.page)
            this.page += 1
            setTimeout(()=>{if(lengthBeforeLoad == this.searchResults.length){
                this.hideLoadMore = true
                console.log("nothing to load")
            }},2000)
        }
  }
}

</script>

<style>
    main {
        min-height: calc(100vh - 20rem);
    }
</style>