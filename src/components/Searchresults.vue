<template>
    <main class="bg-gray-900">
        <div v-if="searchResults.length == 0 && searchError" class=" text-center font-semibold container mx-auto my-8  xl:w-10/12 md:px-4">
                <div class="py-6 px-2 md:rounded-lg">
                    <p class="text-white text-lg">{{ $t('search.noResults1') }} <i>"{{searchTerm}}"</i>&nbsp; {{ $t('search.noResults2') }}</p>
                    <button class="bg-yellow-500 transition hover:bg-yellow-600 py-2 px-3 mt-3 text-gray-900 rounded-lg font-semibold" @click="resetSearch"><font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />{{ $t('general.back') }}</button>
                </div>
            </div>
            <div v-if="searchResults.length > 0 && !searchError" class=" text-center font-semibold container mx-auto my-8  xl:w-10/12 md:px-4">
                <div class="py-6 px-2 md:rounded-lg">
                    <p class="text-white text-lg">{{ $t('search.results',[searchTerm,searchResults.length])}}</p>
                    <button class="bg-yellow-500 transition hover:bg-yellow-600 py-2 px-3 mt-3 text-gray-900 rounded-lg font-semibold" @click="$router.go(-1)"><font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />{{ $t('general.back') }}</button>
                </div>
            </div>
    <transition-group v-if="searchResults.length > 0" tag="section" class="movielist grid gap-0 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full mx-auto relative container mx-auto md:mt-4 mb-16 md:px-4 xl:w-10/12"
        enter-active-class="duration-500 ease-out"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-500 ease-in"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
    >       
            <MovieListitem v-for="movie in searchResults" :key="movie.id" :movie="movie" :scores="triggerscores[triggerscores.map(score => score.movie_id).indexOf(movie.id)]" />
    </transition-group>
    </main>
    

</template>

<script>
import MovieListitem from './MovieListitem.vue'

export default {
  name: 'search',
  components: {
      MovieListitem,
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
        }
  }
}

</script>

<style>
    main {
        min-height: calc(100vh - 20rem);
    }
</style>