<template>
    <section class="w-full bg-center bg-cover" :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${backdrop}`}">
        <div class="container mx-auto pt-8 pb-28 px-1 lg:px-16 xl:px-60">
        <div class="w-full mb-8 flex justify-between">
            <button class="bg-red-500 p-3 rounded-lg text-white" @click="$router.back()"> <font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />Back</button>
        </div>
        <div class="flex flex-col w-100 lg:flex-row bg-white mt-4 rounded-t-lg justify-start">
            
            <img :src=poster class="w-2/5 mx-auto lg:ml-0 lg:w-60 h-auto lg:rounded-lg lg:rounded-r-none lg:rounded-bl-none" />
            <div class="flex flex-col xl:flex-row">
                <div class="text-left px-4 md:px-8 py-2 flex flex-col">
                    <div class="flex justify-between">
                        <h2 class="text-xl font-semibold md:text-2xl self-center w-4/5">
                        {{ movie.title }}
                        </h2>
                        <div class="h-12 w-12 md:h-20 md:w-20 bg-gradient-to-b from-red-700 to-red-600 text-white rounded-full">
                            <div class="relative w-full h-full">
                                <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">7.9</span>
                            </div>
                        </div>
                    </div>
                    
                    <p class="mb-4 text-xs md:text-md">Veröffentlicht: {{ movie.release_date.substring(0,4) }}</p>
                    <i v-if="movie.tagline && movie.tagline.length > 1" class="text-sm md: text-md">"{{ movie.tagline }}"</i>
                    <article class="my-4 text-sm md:text-md">
                        {{ movie.overview }}
                    </article>
                    <div class="flex justify-between my-4 align-end">
                        <div class="streaming-services flex">
                            <img v-if="onNetflix" class="w-16 mr-1" src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg">
                            <img v-if="onAmazon" class="w-16 mr-1" src="https://image.tmdb.org/t/p/original/68MNrwlkpF7WnmNPXLah69CR5cb.jpg">
                        </div>
                        <button class="bg-red-500 text-white p-3 rounded-lg" @click="scrollToRating">Bewerten</button>
                    </div> 
                </div>
            
            </div>
            
        </div>
        <Ratingpage :title="movie.title" :id="movie.id" />
    </div>
    </section>
    
</template>

<script>
import Ratingpage from './Ratingpage.vue'
export default {
  name: 'Detailpage',
  components: {
      Ratingpage
  },
  data(){
      return {
          movie: {},
          backdrop: "",
          onNetflix: false,
          onAmazon: false
      }
  },
  mounted: function() {
    this.loadMovie()  
    this.loadProviders() 
  },
  computed: {
      poster: function() {
          return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
      }
  },
  methods: {
      loadMovie: async function() {
          try {
              const response = await fetch(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=de`)
              const loadedMovie = await response.json()
              this.movie = loadedMovie
              this.backdrop = `url(https://image.tmdb.org/t/p/original/${loadedMovie.backdrop_path})`
              console.log(this.movie)
          }
          catch {
              console.log("oops")
          }
      },
      loadProviders: async function(){
          try {
              const response = await fetch(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/watch/providers?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c`)
              const providers = await response.json()
              console.log(providers)
              this.onNetflix = providers.results.DE.flatrate.some(provider => provider.provider_name == "Netflix")
              this.onAmazon = providers.results.DE.flatrate.some(provider => provider.provider_name == "Amazon Prime Video")
          }
          catch {
              console.log("ooops")
          }
      },
      scrollToRating: function() {
          const rating = document.getElementById("rating")
          rating.scrollIntoView({behavior: 'smooth'})
      }
  }
}
</script>