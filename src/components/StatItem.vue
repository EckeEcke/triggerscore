<template>
    <router-link :to="{name: 'movie', params: {id: movie.id}}" tag="div" class="movie-highlight-item w-full h-44 bg-white border border-gray-300 shadow-md flex relative rounded-lg transform transition duration-300 container-xl cursor-pointer max-w-md">
        <div class="w-full h-60 overflow-hidden">
                <div class="w-full h-full bg-cover rounded-t transition-300 transform scale-100 movie-poster" :style="[{'backgroundImage': `url(${poster})`}]">

                </div>
            </div>
        <div class="w-full p-3">
            <div class="absolute top-3 right-3 h-12 w-12 text-white rounded-lg font-semibold" :class="{'bg-gray-200': !scoreAvailable, 'bg-red-700': scoreAvailable && score >= 7, 'bg-yellow-500': scoreAvailable && score < 7 && score >=4, 'bg-green-600': scoreAvailable && score < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ scores ? score : '-' }}</span>
                </div>
            </div>
            <article class="text-left relative w-full h-full">
                <h3 v-if="movie.title.length > 0" class="text-base w-4/5 h-12 mb-1 pr-3 font-semibold overflow-hidden">{{ movie.title }}</h3>
                <h3 v-else class="text-base w-4/5 h-12 mb-1 font-semibold overflow-hidden">{{ movie.original_title }}</h3>
                <p class="text-xs w-4/5">{{ $t('general.released') }}: {{ movie.release_date.substring(0,4) }}</p>
                <p v-if="overview.length > 2" class="text-xs absolute top-1/2 italic py-3">"{{ overview }}" </p>
                <p v-else class="text-xs absolute top-1/2 italic py-3">{{ $t('general.noDescription') }}</p>
            </article>
        </div>  
    </router-link>
</template>

<script>
export default {
  name: 'StatItem',
  props: {
    movie: Object,
    scores: Object
  },
  computed: {
      poster: function() {
              return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
      },
      overview: function() {
        return  this.movie.overview.length > 90 ? this.movie.overview.substring(0, 90) + "..." : this.movie.overview
      },
      scoreAvailable: function() {
          return this.scores != undefined
      },
      shownScore: function() {
          return this.$store.getters.getShownScore
      },
      score: function() {
          if(this.shownScore && this.scoreAvailable){
              return this.scores[this.shownScore]
          } else return this.scores["rating_total"]
      }
  }
}
</script>