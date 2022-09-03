<template>
    <section class="w-full bg-center bg-cover bg-fixed" style="min-height:100vh-5rem;" :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${backdrop}`,minHeight: 'calc(100vh - 20rem)'}">
        <div class="container mx-auto pt-8 pb-28 xl:w-10/12 md:px-4">
            <div class="w-full mb-8 flex justify-between px-4 md:px-0">
                <button class="bg-yellow-500 transition hover:bg-yellow-600 p-3 rounded-lg text-white font-semibold uppercase" @click="$router.back()"> <font-awesome-icon :icon="['fas', 'arrow-circle-left']" class="mr-2" />{{ $t('general.back') }}</button>
            </div>
            <div v-if="triggerscoreLoading" class="mb-8 py-32 lg:py-48">
                <font-awesome-icon :icon="['fas', 'angry']" class="text-white text-5xl animate-spin transform scale-150" />
                <p class="text-white font-semibold animate-bounce mt-8">{{ $t('general.loadMovies') }}</p>
            </div>
            <div v-else class="flex flex-col lg:flex-row lg:rounded-b px-0 sm:px-4 md:px-0">
                <div class="flex flex-col w-full bg-gray-900 text-white rounded-t lg:rounded justify-start lg:mr-6">
                    <div class="flex bg-gray-900 justify-between w-full sm:rounded-t">
                        <img :src=poster class="w-1/2 lg:w-76 h-auto object-contain self-start rounded-tl self-center" />
                        <div v-if="scoreAvailable" class="w-full flex flex-col mx-2 self-center rounded-tr">
                            <div class="text-base md:text-2xl lg:text-lg self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                            </div>
                            <div class="mx-auto bg-opacity-90 w-12 sm:w-20 md:w-24 lg:w-20 h-12 sm:h-20 md:h-24 lg:h-20 border border-gray-900 p-2 text-3xl rounded-lg flex justify-center my-3" :class="{'bg-red-700': score.rating_total >= 7, 'bg-yellow-500': score.rating_total < 7 && score.rating_total >=4, 'bg-green-600': score.rating_total < 4}">
                                <p class="self-center text-white text-lg md:text-xl font-semibold">{{score.rating_total}}</p>
                            </div>
                            <div class="text-left w-auto mx-auto text-white text-xs sm:text-base">
                                <div class="flex my-2 md:text-lg lg:text-base">
                                    <div class="flex rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2"  :class="{'bg-red-700': score.rating_sexism >= 7, 'bg-yellow-500': score.rating_sexism < 7 && score.rating_sexism >=4, 'bg-green-600': score.rating_sexism < 4}">
                                        <div class="self-center">{{score.rating_sexism}}</div>
                                    </div>
                                    <p class="self-center">{{ $t('categories.sexism') }}</p>
                                </div>
                                <div class="flex my-2 md:text-lg lg:text-base">
                                    <div class="flex bg-red-500 rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': score.rating_racism >= 7, 'bg-yellow-500': score.rating_racism < 7 && score.rating_racism >=4, 'bg-green-600': score.rating_racism < 4}">
                                        <div class="self-center">{{score.rating_racism}}</div>
                                    </div>
                                    <p class="self-center">{{ $t('categories.racism') }}</p>
                                </div>
                                <div class="flex my-2 md:text-lg lg:text-base">
                                    <div class="flex bg-red-500 rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': score.rating_others >= 7, 'bg-yellow-500': score.rating_others < 7 && score.rating_others >=4, 'bg-green-600': score.rating_others < 4}">
                                        <div class="self-center">{{score.rating_others}}</div>
                                    </div>
                                    <p class="self-center">{{ $t('categories.others') }}</p>
                                </div>
                                <div class="flex my-2 md:text-lg lg:text-base">
                                    <div class="flex bg-red-500 rounded sm:rounded-lg justify-center w-8 h-8 sm:w-12 sm:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': score.rating_cringe >= 7, 'bg-yellow-500': score.rating_cringe < 7 && score.rating_cringe >=4, 'bg-green-600': score.rating_cringe < 4}">
                                        <div class="self-center">{{score.rating_cringe}}</div>
                                    </div> 
                                    <p class="self-center">{{ $t('categories.cringe') }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="w-full flex flex-col mx-2 self-center rounded-tr">
                            <div class="text-base md:text-2xl lg:text-lg self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                            </div>
                            <p class="text-white mt-4">{{ $t('general.noRatings') }}</p>
                        </div>
                    </div>
                    <div class="flex flex-col xl:flex-row">
                        <div class="text-left px-4 md:px-4 py-2 flex flex-col">
                            <div class="flex justify-between">
                                <h2 class="text-xl font-semibold md:text-2xl self-center mb-2">
                                {{ movie.title }}
                                </h2>
                            </div>
                            <p class="mb-4 text-xs md:text-md text-gray-400">
                                {{ releaseDate }}
                                <span class="mx-2">|</span>
                                <span>{{ movie.runtime }} {{ $t('general.minutes') }}</span>
                                <span v-if="totalRatings[0]" class="mx-2">|</span>
                                <span v-if="totalRatings[0]">{{ totalRatings[0].ratings }} {{ $t('general.ratings') }}</span>
                                <span v-if="movie.vote_average" class="mx-2">|</span>
                                <span v-if="movie.vote_average"><wbr>{{ $t('rating.tmdb-rating') }}: {{ movie.vote_average }}</span>
                                
                            </p>
                            
                            <i v-if="movie.tagline && movie.tagline.length > 1" class="text-sm md: text-md">"{{ movie.tagline }}"</i>
                            <p class="my-4 flex flex-wrap gap-1">
                                <span class="text-xs bg-gray-400 text-white p-2 rounded" v-for="genre in genres" :key="genre">{{ genre }}</span>
                            </p>
                            <article class="my-4 text-sm md:text-md">
                                {{ movie.overview }}
                            </article>
                            <div class="flex justify-between my-4 mb-8 align-end">   
                                <div class="streaming-services flex gap-2 w-full">
                                    <a  v-if="onNetflix" href="https://www.netflix.com" target="_blank" class="self-center">
                                    <img class="w-16" src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg">
                                    </a>
                                    <a v-if="onAmazon" href="https://www.amazon.de/primevideo" target="_blank" class="self-center">
                                        <img  class="w-16" src="../assets/images/amazon-prime-logo3.svg">
                                    </a>
                                    <a v-if="onDisney" href="https://www.disneyplus.com/" target="_blank" class="self-center">
                                        <img class="w-16" src="../assets/images/disney+-logo2.svg">
                                    </a>
                                    <a v-if="onSky" href="https://skyticket.sky.de/home/login" target="_blank" class="self-center">
                                        <img class="w-20 mr-1" src="../assets/images/sky.svg">
                                    </a>
                                    <a class="ml-auto self-center" v-if="movie.id" :href="tmdbURL" target="_blank">
                                        <img class="w-16" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg">
                                    </a>
                                    <a class="ml-2 self-center" v-if="movie.imdb_id" :href="imdbURL" target="_blank">
                                        <img class="w-16" src="../assets/images/imdb-logo.svg">
                                    </a>
                                </div>
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
          onSky: false,
          releaseDate: 1900,
          score: {},
          triggerscoreLoading: true,
      }
  },
  mounted: function() {
    this.loadMovie()  
    this.loadProviders()
    this.loadTriggerscore()
    this.$store.dispatch("setTriggerscores")
    this.$store.dispatch("filterMovies")
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
      },
      language: function(){
          return this.$root.$i18n.locale
      },
      totalRatings: function(){
        return this.$store.getters.getTriggerscores.filter(movie => movie.movie_id == this.movie.id)
      },
      regionProvider: function(){
          let region = this.$root.$i18n.locale.toUpperCase()
          if(region == "EN"){
              region = "GB"
          }
          return region

      },
      imdbURL: function(){
          return `https://www.imdb.com/title/` + this.movie.imdb_id
      },
      tmdbURL: function(){
          return `https://www.themoviedb.org/movie/` + this.movie.id
      }
  },
  methods: {
      loadMovie: async function() {
          try {
              const response = await fetch(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${this.language}`)
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
              this.onNetflix = false
              this.onAmazon = false
              this.onDisney = false
              this.onSky = false
              this.onNetflix = providers.results[this.regionProvider].flatrate.some(provider => provider.provider_name == "Netflix")
              this.onAmazon = providers.results[this.regionProvider].flatrate.some(provider => provider.provider_name == "Amazon Prime Video")
              this.onDisney = providers.results[this.regionProvider].flatrate.some(provider => provider.provider_name == "Disney Plus")
              this.onSky = providers.results[this.regionProvider].flatrate.some(provider => provider.provider_name == "Sky Ticket")
          }
          catch {
              console.log("ooops")
          }
      },
      loadTriggerscore: async function(){
          const response = await fetch(`https://triggerscore-backend2.onrender.com/movie/${this.$route.params.id}`)
          const scores = await response.json()
          this.score = scores[0]
          this.triggerscoreLoading = false
      }
  },
  watch: {
      language(){
          this.loadMovie()
          this.loadProviders()
      }
  }
}
</script>