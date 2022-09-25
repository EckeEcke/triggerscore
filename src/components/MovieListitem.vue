<template>
    <router-link :to="{name: 'movie', params: {id: movie.id}}" tag="div" class="movie-highlight-item transition-300 w-full h-44 bg-transparent sm:bg-gradient-to-r from-gray-950 to-gray-800 md:hover:from-gray-900 text-white sm:border border-t border-b sm:border-r-0 border-gray-950 border-opacity- md:border-0 shadow-md flex relative border-b md:rounded container-xl cursor-pointer">
        <div class="h-full w-44 md:rounded-l overflow-hidden" load="lazy">
            <div class="movie-poster w-full h-full bg-cover bg-center" :style="{'background-image': `url(${poster})`}" />
        </div>
        <div class="w-full p-3">
            <div class="absolute top-2 right-2 h-12 w-12 text-lg text-white rounded-lg font-semibold" :class="{'bg-gray-200': !scoreAvailable, 'bg-red-700': scoreAvailable && score >= 7, 'bg-yellow-500': scoreAvailable && score < 7 && score >=4, 'bg-green-600': scoreAvailable && score < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ scores ? score : '-' }}</span>
                </div>
                <div v-if="displayedScore != ''" class="bg-gray-400 rounded p-1 my-1 text-xs font-light">{{displayedScore}}</div>
            </div>
            <article class="text-left relative w-full h-full">
                <h3 v-if="movie.title.length > 0" class="text-base w-4/5 h-12 mb-1 font-semibold overflow-hidden">{{ movie.title }}</h3>
                <h3 v-else class="text-base w-4/5 h-12 mb-1 font-semibold overflow-hidden">{{ movie.original_title }}</h3>
                <p class="text-xs text-gray-300">
                    {{ movie.release_date.substring(0,4) }}
                    <span v-if="movie.runtime" class="mx-2">|</span>
                    <span v-if="movie.runtime">{{ movie.runtime }} {{ $t('general.minutes') }}</span>
                </p>
                <p v-if="overview.length > 2" class="text-xs absolute top-1/2 py-3 text-gray-300">{{ overview }} </p>
                <p v-else class="text-xs absolute top-1/2 py-3 text-gray-300">{{ $t('general.noDescription') }}</p>
            </article>
        </div>  
    </router-link>
</template>

<script>
export default {
  name: 'MovieListitem',
  props: {
    movie: Object,
    scores: Object
  },
  computed: {
      poster: function() {
              return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
      },
      overview: function() {
        return  this.movie.overview.length > 100 ? this.movie.overview.substring(0, 110) + "..." : this.movie.overview
      },
      scoreAvailable: function() {
          return this.scores != undefined
      },
      shownScore: function() {
          return this.$store.getters.getShownScore
      },
      displayedScore: function(){
          if(this.shownScore == "rating_sexism"){
              return "Sexism"
          } else if(this.shownScore == "rating_racism"){
              return "Racism"
          } else if(this.shownScore == "rating_others"){
              return "Others"
          } else if(this.shownScore == "rating_cringe"){
              return "Cringe"
          } else return ""
      },
      score: function() {
          if(this.shownScore && this.scoreAvailable){
              return this.scores[this.shownScore]
          } else return this.scores["rating_total"]
      }
  }
}
</script>