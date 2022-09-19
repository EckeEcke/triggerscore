<template>
    <section class="w-full bg-center bg-cover bg-fixed" style="min-height:100vh-5rem;" :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), ${backdrop}`,minHeight: 'calc(100vh - 20rem)'}">
        <div class="container mx-auto sm:pt-6 sm:pb-12 xl:w-10/12 md:px-4">
            <LoadingAnimation v-if="triggerscoreLoading"/>
            <div v-else class="flex flex-col lg:flex-row lg:rounded-b px-0 sm:px-4 md:px-0">
                <div class="flex flex-col w-full radial-background text-white rounded-t lg:rounded justify-start lg:mr-6 md:p-4">
                    <div class="flex justify-between w-full sm:rounded-t p-4 pr-0">
                        <img :src=poster class="w-1/2 lg:w-76 h-auto object-contain self-start rounded self-center" />
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
                        <div class="w-full text-left px-4 py-2 flex flex-col">
                            <div class="flex justify-between">
                                <h2 class="text-xl font-semibold md:text-2xl self-center mb-1 sm:mb-2">
                                {{ movie.title }}
                                </h2>
                            </div>
                            <div class="mb-4 text-xs md:text-md text-gray-400">
                                {{ releaseDate }}
                                <span class="mx-2">|</span>
                                <span>{{ movie.runtime }} {{ $t('general.minutes') }}</span>
                                <span v-if="totalRatings[0]" class="mx-2">|</span>
                                <span v-if="totalRatings[0]">{{ totalRatings[0].ratings }} {{ $t('general.ratings') }}</span>
                                <span v-if="movie.vote_average" class="mx-2">|</span>
                                <span v-if="movie.vote_average"><wbr>{{ $t('rating.tmdb-rating') }}: {{ movie.vote_average.toFixed(2) }}</span>
                                <span class="mx-2 mb-2">|</span>
                                <div class="inline-block mt-2 sm:mt-0">
                                    <font-awesome-icon :icon="['fas', 'thumbs-up']" class="mr-1" />
                                    <span class="mr-3">{{ score.likes }}</span>
                                    <font-awesome-icon :icon="['fas', 'thumbs-down']" class="mr-1" />
                                    <span>{{ score.dislikes }}</span>
                                </div>
                            </div>
                            
                            <i v-if="movie.tagline && movie.tagline.length > 1" class="text-sm md: text-md">"{{ movie.tagline }}"</i>
                            <p class="my-4 flex flex-wrap gap-1">
                                <span class="text-xs bg-gray-400 text-white p-2 rounded" v-for="genre in genres" :key="genre">{{ genre }}</span>
                            </p>
                            <article class="my-4 text-sm md:text-md">
                                {{ movie.overview }}
                            </article>
                            <div class="flex justify-between my-4 mb-8 align-end">   
                                <div class="streaming-services flex gap-4 w-full">
                                    <a  v-if="onNetflix" href="https://www.netflix.com" target="_blank" class="self-center">
                                    <img class="w-16" src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg">
                                    </a>
                                    <a v-if="onAmazon" href="https://www.amazon.de/primevideo" target="_blank" class="self-center -mx-2">
                                        <img  class="w-16" src="../assets/images/amazon-prime-logo3.svg">
                                    </a>
                                    <a v-if="onDisney" href="https://www.disneyplus.com/" target="_blank" class="self-center">
                                        <img class="w-16" src="../assets/images/disney+-logo2.svg">
                                    </a>
                                    <a v-if="onSky" href="https://skyticket.sky.de/home/login" target="_blank" class="self-center">
                                        <img class="w-16" src="../assets/images/sky-logo.svg">
                                    </a>
                                    <a class="self-center" v-if="movie.id" :href="tmdbURL" target="_blank">
                                        <img class="w-16" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg">
                                    </a>
                                    <a class="self-center" v-if="movie.imdb_id" :href="imdbURL" target="_blank">
                                        <img class="w-16" src="../assets/images/imdb-logo.svg">
                                    </a>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="comments && comments.length > 0" class="px-4 mb-12 mt-4">
                        <h2 class="text-white font-semibold text-lg text-left mb-6">{{ $t('general.comments') }}</h2>
                        <div v-for="(comment,index) in comments" :key="comment" class="max-w-md text-white text-left text-sm p-4 md:p-6 pb-10 md:pb-8 bg-gradient-to-r from-gray-950 to-gray-800 italic rounded mb-2 relative" :class="{'hidden': index >= 1 && !showMoreComments}">
                            <p>"{{ comment }}"</p>
                            <p class="text-gray-500 absolute bottom-2 right-3 transition hover:text-yellow-500 cursor-pointer" @click="pushToContact(comment)">
                                <font-awesome-icon :icon="['fas', 'flag']" class="mr-1" />
                                {{ $t('rating.report') }}
                            </p>
                        </div>
                        <p v-if="comments.length > 1 && !showMoreComments" @click="showMoreComments = !showMoreComments" class="max-w-md text-right mt-3 cursor-pointer transition hover:text-yellow-500">{{ $t('general.showMore') }} <font-awesome-icon :icon="['fas', 'caret-down']" class="" /></p>
                        <p v-if="comments.length > 1 && showMoreComments" @click="showMoreComments = !showMoreComments" class="max-w-md text-right mt-3 cursor-pointer transition hover:text-yellow-500">{{ $t('general.showLess') }} <font-awesome-icon :icon="['fas', 'caret-up']" class="" /></p>
                    </div>
                </div>
                <Ratingpage :title="movie.title" :id="movie.id" />
                <hr class="border-gray-800 md:hidden">
                <div class="md:hidden flex flex-col justify-center gap-4 py-12 px-2 radial-background">
                    <h3
                        class="pb-0 text-white font-semibold text-lg self-center"       
                        target="_blank">{{ $t('rating.share') }}
                    </h3>
                    <div class="flex justify-center gap-6">
                        <a :href="'whatsapp://send?text=' + 'Triggerscore - ' + movie.title + ' ' + currentURL"
                            class=""       
                            data-action="share/whatsapp/share"  
                            target="_blank"> 
                            <img class="w-10" src="../assets/images/WhatsApp.svg">
                        </a>
                        <a :href="'https://www.reddit.com/submit?url=' + currentURL"
                            target="_blank">
                            <img class="w-10" src="../assets/images/reddit-logo.svg">
                        </a>
                        <a :href="'mailto:?subject= ' + movie.title + ' on Triggerscore&body=Check out ' + movie.title + ' on Triggerscore: ' + currentURL"
                            title="Share by Email">
                            <font-awesome-icon :icon="['fas', 'envelope']" class="text-white" style="width:auto;height:2.5rem"/>
                        </a> 
                    </div> 
                </div>     
            </div>          
        </div>
    </section>   
</template>

<script>
import Ratingpage from './Ratingpage.vue'
import LoadingAnimation from './LoadingAnimation.vue'

export default {
  name: 'Detailpage',
  components: {
      Ratingpage,
      LoadingAnimation
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
          showMoreComments: false
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
      },
      currentURL: function(){
        return window.location.href
      },
      comments: function(){
        return this.score ? this.score.comments.filter(comment => {return comment.length > 3}) : null
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
              this.onSky = providers.results[this.regionProvider].flatrate.some(provider => provider.provider_name == "WOW")
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
      },
      pushToContact: function(comment){
        this.$router.push({ path: '/contact', query: { id: this.$route.params.id, comment: comment.substring(0,Math.min(20,comment.length)) } })
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