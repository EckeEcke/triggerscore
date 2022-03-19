<template>
    <section class="w-full bg-center bg-cover bg-fixed" :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${backdrop}`}">
        <div class="container mx-auto pt-8 pb-28 px-1 xl:px-20">
            <div class="w-full mb-8 flex justify-between">
                <button class="bg-yellow-500 transition hover:bg-yellow-600 p-3 rounded-lg text-gray-900 font-semibold" @click="$router.back()"> <font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />Zurück</button>
            </div>
            <div v-if="triggerscoreLoading" class="mb-8 py-32 lg:py-48">
                <font-awesome-icon :icon="['fas', 'angry']" class="text-white text-5xl animate-spin transform scale-150" />
                <p class="text-white font-semibold animate-bounce mt-8">Lädt Film</p>
            </div>
            <div v-else class="flex flex-col lg:flex-row lg:rounded-b-lg">
                <div class="flex flex-col w-full bg-white rounded-t-lg lg:rounded-lg justify-start lg:mr-6">
                    <div class="flex bg-gray-900 justify-between w-full lg:rounded-t-lg">
                        <img :src=poster class="w-1/2 lg:w-60 h-auto object-contain self-start rounded-tl-lg self-center" />
                        <div v-if="scoreAvailable" class="w-full flex flex-col mx-2 self-center rounded-tr-lg">
                            <div class="text-base md:text-2xl lg:text-lg self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                            </div>
                            <div class="mx-auto bg-opacity-90 w-12 sm:w-20 md:w-24 lg:w-20 h-12 sm:h-20 md:h-24 lg:h-20 border border-gray-900 p-2 text-3xl rounded-lg flex justify-center my-3" :class="{'bg-red-700': score.rating_total >= 7, 'bg-yellow-400': score.rating_total < 7 && score.rating_total >=4, 'bg-green-500': score.rating_total < 4}">
                                <p class="self-center text-white text-lg">{{score.rating_total}}</p>
                            </div>
                            <div class="text-left w-36 mx-auto text-white">
                                <div class="flex my-2 md:text-lg lg:text-base">
                                    <div class="flex rounded-lg justify-center w-8 h-8 md:w-12 md:h-12 lg:w-10 lg:h-10 mr-2"  :class="{'bg-red-700': score.rating_sexism >= 7, 'bg-yellow-400': score.rating_sexism < 7 && score.rating_sexism >=4, 'bg-green-500': score.rating_sexism < 4}">
                                        <div class="self-center">{{score.rating_sexism}}</div>
                                    </div>
                                    <p class="self-center">Sexismus</p>
                                </div>
                                <div class="flex my-2 md:text-lg lg:text-base">
                                    <div class="flex bg-red-500 rounded-lg justify-center w-8 h-8 md:w-12 md:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': score.rating_racism >= 7, 'bg-yellow-400': score.rating_racism < 7 && score.rating_racism >=4, 'bg-green-500': score.rating_racism < 4}">
                                        <div class="self-center">{{score.rating_racism}}</div>
                                    </div>
                                    <p class="self-center">Rassismus</p>
                                </div>
                                <div class="flex my-2 md:text-lg lg:text-base">
                                    <div class="flex bg-red-500 rounded-lg justify-center w-8 h-8 md:w-12 md:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': score.rating_others >= 7, 'bg-yellow-400': score.rating_others < 7 && score.rating_others >=4, 'bg-green-500': score.rating_others < 4}">
                                        <div class="self-center">{{score.rating_others}}</div>
                                    </div>
                                    <p class="self-center">Sonstige</p>
                                </div>
                                <div class="flex my-2 md:text-lg lg:text-base">
                                    <div class="flex bg-red-500 rounded-lg justify-center w-8 h-8 md:w-12 md:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': score.rating_cringe >= 7, 'bg-yellow-400': score.rating_cringe < 7 && score.rating_cringe >=4, 'bg-green-500': score.rating_cringe < 4}">
                                        <div class="self-center">{{score.rating_cringe}}</div>
                                    </div> 
                                    <p class="self-center">Cringe</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="w-full flex flex-col mx-2 self-center rounded-tr-lg">
                            <div class="text-base md:text-2xl lg:text-lg self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                            </div>
                            <p class="text-white mt-4">Noch keine Bewertungen</p>
                        </div>
                    </div>
                    <div class="flex flex-col xl:flex-row">
                        <div class="text-left px-4 md:px-4 py-2 flex flex-col">
                            <div class="flex justify-between">
                                <h2 class="text-xl font-semibold md:text-2xl self-center">
                                {{ movie.title }}
                                </h2>
                            </div>
                            
                            <p class="mb-4 text-xs md:text-md">Veröffentlicht: {{ releaseDate }}</p>
                            
                            <i v-if="movie.tagline && movie.tagline.length > 1" class="text-sm md: text-md">"{{ movie.tagline }}"</i>
                            <p class="my-4">
                                <span class="text-xs bg-gray-400 text-white p-2 mr-1 rounded" v-for="genre in genres" :key="genre">{{ genre }}</span>
                            </p>
                            <article class="my-4 text-sm md:text-md">
                                {{ movie.overview }}
                            </article>
                            <div class="flex justify-between my-4 align-end">
                                <div class="streaming-services flex">
                                    <img v-if="onNetflix" class="w-16 mr-1" src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg">
                                    <img v-if="onAmazon" class="w-16 mr-1" src="https://image.tmdb.org/t/p/original/68MNrwlkpF7WnmNPXLah69CR5cb.jpg">
                                    <img v-if="onDisney" class="w-16 mr-1" src="../assets/images/disney+-logo.svg">
                                </div>
                                <button class="bg-yellow-500 text-gray-900 p-3 rounded-lg md:hidden font-semibold" @click="scrollToRating">Bewerten</button>
                            </div> 
                        </div>
                    </div>
                </div>
                <Ratingpage :title="movie.title" :id="movie.id" />
            </div>      
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
          movie: {
              genres: []
          },
          backdrop: "",
          onNetflix: false,
          onAmazon: false,
          onDisney: false,
          releaseDate: 1900,
          score: {},
          triggerscoreLoading: true,
      }
  },
  mounted: function() {
    this.loadMovie()  
    this.loadProviders()
    this.loadTriggerscore()
  },
  computed: {
      poster: function() {
          return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
      },
      genres: function() {
          return this.movie.genres.map(genre => genre.name)
      },
      triggerscores: function() {
          return this.loadTriggerscore()
      },
      scoreAvailable: function() {
          return this.score != undefined
      }
  },
  methods: {
      loadMovie: async function() {
          try {
              const response = await fetch(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=de`)
              const loadedMovie = await response.json()
              this.movie = loadedMovie
              this.releaseDate = this.movie.release_date.substring(0,4)
              this.backdrop = `url(https://image.tmdb.org/t/p/original/${loadedMovie.backdrop_path})`
          }
          catch {
              console.log("oops")
          }
      },
      loadProviders: async function(){
          try {
              const response = await fetch(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/watch/providers?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c`)
              const providers = await response.json()
              this.onNetflix = providers.results.DE.flatrate.some(provider => provider.provider_name == "Netflix")
              this.onAmazon = providers.results.DE.flatrate.some(provider => provider.provider_name == "Amazon Prime Video")
              this.onDisney = providers.results.DE.flatrate.some(provider => provider.provider_name == "Disney Plus")
          }
          catch {
              console.log("ooops")
          }
      },
      loadTriggerscore: async function(){
          const response = await fetch(`https://triggerscore.herokuapp.com/movie/${this.$route.params.id}`)
          const scores = await response.json()
          this.score = scores[0]
          this.triggerscoreLoading = false
      },
      scrollToRating: function() {
          const rating = document.getElementById("rating")
          rating.scrollIntoView({behavior: 'smooth'})
      }
  }
}
</script>