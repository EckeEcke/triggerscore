<template>
    <router-link :to="{name: 'movie', params: {id: movie.id}}" tag="div" class="w-40 h-56 mx-2 bg-white shadow-md flex flex-none flex-col relative rounded-lg transform transition duration-300 md:hover:scale-105 container-xl cursor-pointer">
        <div class="flex">
            <img class="h-32 flex-none w-auto rounded-tl-lg" :src=poster @error="$event.target.src='http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'" />
            <div class="mx-auto mt-3 h-12 w-12 text-white rounded-full" :class="{'bg-gray-200': !scoreAvailable, 'bg-red-700': scoreAvailable && scores.rating_total >= 7, 'bg-yellow-400': scoreAvailable && scores.rating_total < 7 && scores.rating_total >=4, 'bg-green-500': scoreAvailable && scores.rating_total < 4}">
                <div class="relative w-full h-full">
                    <span v-if="scoreAvailable" class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ scores.rating_total }}</span>
                    <span v-else class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">-</span>
                </div>
            </div>
        </div>
        
        <div class="w-full p-3">
            <article class="text-left relative w-full h-full">
                <h3 v-if="movie.title.length > 0" class="text-sm h-16 mb-1 font-semibold overflow-hidden">{{ movie.title }}</h3>
                <h3 v-else class="text-sm h-16 mb-1 font-semibold overflow-hidden">{{ movie.original_title }}</h3>
            </article>
        </div>  
    </router-link>
</template>

<script>
export default {
  name: 'MovieHighlightsItem',
  props: {
    movie: Object,
    scores: Object
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
      }  
  }
}
</script>