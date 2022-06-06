<template>
    <router-link :to="{name: 'movie', params: {id: movie.id}}" tag="div" class="w-40 h-auto mr-2 bg-white shadow-md flex flex-none flex-col relative rounded transform transition duration-300 lg:hover:scale-105 container-xl cursor-pointer">
        <div class="flex">
            <div class="w-full h-60 bg-cover rounded-t" :style="{backgroundImage: `url(${poster})`}">

            </div>
            <div class="absolute right-2 mx-auto mt-3 h-12 w-12 text-white rounded-lg bg-opacity-90" :class="{'bg-gray-200': !scoreAvailable, 'bg-red-700': scoreAvailable && scores[shownScore] >= 7, 'bg-yellow-500': scoreAvailable && scores[shownScore] < 7 && scores[shownScore] >=4, 'bg-green-600': scoreAvailable && scores[shownScore] < 4}">
                <div class="relative w-full h-full font-semibold">
                    <span v-if="scoreAvailable" class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ scores[shownScore] }}</span>
                    <span v-else class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">-</span>
                </div>
                <div v-if="displayedScore != ''" class="bg-gray-900 bg-opacity-80 rounded py-2 px-1 my-1 text-xs font-light">{{displayedScore}}</div>
            </div>
        </div>
        
        <div class="w-full p-3">
            <article class="text-left relative w-full h-full">
                <h3 v-if="movie.title.length > 0" class="text-sm h-14 mb-1 font-semibold overflow-hidden">{{ movie.title }}</h3>
                <h3 v-else class="text-sm h-16 mb-1 font-semibold overflow-hidden">{{ movie.original_title }}</h3>
                <p class="mt-3 mb-1 text-xs md:text-md">
                    <span class="self-center">{{ movie.release_date.substring(0,4) }}</span>
                    <span class="mx-2">|</span>
                    <span>{{ movie.runtime }} {{ $t('general.minutes') }}</span>
                </p>
            </article>
        </div>  
    </router-link>
</template>

<script>
export default {
  name: 'MovieHighlightsItem',
  props: {
    movie: Object,
    scores: Object,
    shownScore: String
  },
  computed: {
      poster: function() {
              return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
      },
      overview: function() {
        return  this.movie.overview.length > 100 ? this.movie.overview.substring(0, 100) + "..." : this.movie.overview
      },
      scoreAvailable: function() {
          return this.scores != undefined
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
  }
}
</script>