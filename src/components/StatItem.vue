<template>
    <router-link :to="{name: 'movie', params: {id: movie.id}}" tag="div" class="w-full h-44 bg-white shadow-md border border-gray-100 flex relative border-b md:border-b-0 md:rounded-lg transform transition duration-300 container-xl cursor-pointer max-w-md">
        <img load="lazy" class="h-full md:rounded-l-lg" :src=poster @error="$event.target.src='http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'" />
        <div class="w-full p-3">
            <div class="absolute top-1 right-1 h-12 w-12 text-white rounded-lg font-semibold" :class="{'bg-gray-200': !scoreAvailable, 'bg-red-700': scoreAvailable && score >= 7, 'bg-yellow-400': scoreAvailable && score < 7 && score >=4, 'bg-green-500': scoreAvailable && score < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ scores ? score : '-' }}</span>
                </div>
            </div>
            <article class="text-left relative w-full h-full">
                <h3 v-if="movie.title.length > 0" class="text-base w-4/5 h-12 mb-1 font-semibold overflow-hidden">{{ movie.title }}</h3>
                <h3 v-else class="text-base w-4/5 h-12 mb-1 font-semibold overflow-hidden">{{ movie.original_title }}</h3>
                <p class="text-xs w-4/5">veröffentlicht: {{ movie.release_date.substring(0,4) }}</p>
                <p v-if="overview.length > 2" class="text-xs absolute top-1/2 italic py-3">"{{ overview }}" </p>
                <p v-else class="text-xs absolute top-1/2 italic py-3">Keine Beschreibung verfügbar</p>
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