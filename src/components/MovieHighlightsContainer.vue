<template>
    <div  class="w-full bg-gray-900 bg-opacity-95 px-4 py-8 mb-0">
        <div class="font-semibold mb-4 container mx-auto xl:w-10/12">
            <h2 class="text-2xl text-yellow-500 text-left text-underline mb-2">James Bond Special</h2>
            <p class="text-left text-white">Lizenz zum Triggern: Film anklicken und Triggerscore vergeben</p>
        </div>
        <div class="relative group">
            <div id="highlight-container" class="hide-scrollbar flex flex-none flex-row  overflow-x-scroll py-4 px-0 md:px-4 -mx-4">
                <MovieHighlightItem v-for="movie in bondMovies" :key="movie.id" :movie="movie" :scores="triggerscores[triggerscores.map(score => score.movie_id).indexOf(movie.id)]" />
                <div class="justify-between md:px-4 container mx-auto xl:w-10/12 hidden  sm:group-hover:flex pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <button @click="scrollHighlightContainer('left')" class="bg-white rounded-full"><font-awesome-icon class="text-yellow-500 text-4xl transition transform scale-110 hover:scale-125 pointer-events-auto" :icon="['fas', 'arrow-circle-left']" /></button>
                    <button @click="scrollHighlightContainer('right')" class="bg-white rounded-full"><font-awesome-icon class="text-yellow-500 text-4xl transition transform scale-110 hover:scale-125 pointer-events-auto" :icon="['fas', 'arrow-circle-right']" /></button>
                </div> 
            </div>
        </div>      
    </div>
</template>
<script>
import MovieHighlightItem from './MovieHighlightItem.vue'

export default {
  name: 'MovieHighlightsContainer',
  components: {
      MovieHighlightItem
  },
  computed: {
    bondMovies: function() {
        return this.$store.getters.getBondMovies
    },
    triggerscores: function() {
        return this.$store.getters.getTriggerscores
    },
  },
    methods: {
        scrollHighlightContainer: function(direction){
          const highlight = document.getElementById("highlight-container")
          if(direction == 'left'){
              highlight.scrollBy({top: 0, left: -window.innerWidth/2, behavior : "smooth"})
          } else highlight.scrollBy({top: 0, left: window.innerWidth/2, behavior : "smooth"})
      }
    }
}
</script>