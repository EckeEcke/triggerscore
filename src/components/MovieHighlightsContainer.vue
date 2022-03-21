<template>
    <div class="w-full bg-gray-900 bg-opacity-95 px-4 py-4 mb-0 container mx-auto xl:w-10/12" :class="{'border-b border-gray-700': showBorder, 'py-8': moreSpacing}">
        <div class="font-semibold mb-4">
            <h2 class="text-xl text-yellow-500 text-left text-underline mb-2">{{title}}</h2>
            <p class="text-left text-white">{{subTitle}}</p>
        </div>
        <div class="relative group">
            <div id="highlight-container" ref="swiper" class="hide-scrollbar flex flex-none flex-row  overflow-x-scroll py-4 px-0 md:pl-4 -mx-4">
                <MovieHighlightItem v-for="movie in movies" :key="movie.id" :movie="movie" :shownScore="shownScore" :scores="triggerscores[triggerscores.map(score => score.movie_id).indexOf(movie.id)]" />
                <div class="justify-between md:px-4 container mx-auto xl:w-10/12 hidden  sm:group-hover:flex pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <button @click="scrollHighlightContainer('left')" class="bg-white rounded-full"><font-awesome-icon class="text-yellow-500 text-4xl transition transform scale-110 hover:scale-125 pointer-events-auto" :icon="['fas', 'arrow-circle-left']" /></button>
                    <button @click="scrollHighlightContainer('right')" class="bg-white rounded-full"><font-awesome-icon class="text-yellow-500 text-4xl transition transform scale-110 hover:scale-125 pointer-events-auto" :icon="['fas', 'arrow-circle-right']" /></button>
                </div> 
            </div>
            <transition enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-500 ease-in" leave-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="!scrolled" class="absolute bottom-0 -right-4 w-12 lg:w-16 h-full" style="background-image: linear-gradient(to right,rgba(17,24,39,0),rgba(17,24,39,0.9));"></div>
            </transition>
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
  data(){
      return {
          scrolled: false
      }
  },
  mounted: function(){
      const swiper = this.$refs.swiper
      swiper.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
      const swiper = this.$refs.swiper
       swiper.removeEventListener('scroll', this.handleScroll);
    },
  props: {
      movies: [],
      shownScore: String,
      title: String,
      subTitle: String,
      showBorder: Boolean,
      moreSpacing: Boolean
  },
  computed: {
    triggerscores: function() {
        return this.$store.getters.getTriggerscores
    },
  },
    methods: {
        handleScroll: function(){
            console.log("scrolled")
            console.log(this.scrolled)
            this.scrolled = true
            if(this.$refs.swiper.scrollLeft == 0){
                this.scrolled = false
            }
        },
        scrollHighlightContainer: function(direction){
          const highlight = this.$refs.swiper //document.getElementById("highlight-container")
          if(direction == 'left'){
              highlight.scrollBy({top: 0, left: -window.innerWidth/2, behavior : "smooth"})
          } else highlight.scrollBy({top: 0, left: window.innerWidth/2, behavior : "smooth"})
      }
    }
}
</script>