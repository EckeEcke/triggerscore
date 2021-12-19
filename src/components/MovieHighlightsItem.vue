<template>
    <router-link :to="{name: 'movie', params: {id: movie.id}}" tag="div" class="w-40 h-60 mx-2 bg-white shadow-md flex flex-none flex-col relative rounded-lg transform transition duration-300 md:hover:scale-105 container-xl cursor-pointer">
        <div>
            <img load="lazy" class="h-32 flex-none w-auto rounded-tl-lg" :src=poster @error="$event.target.src='http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'" />
        </div>
        
        <div class="w-full p-3">
            <div class="absolute top-1 right-1 h-12 w-12 bg-red-700 text-white rounded-full" :class="{'bg-red-700': movie.vote_average >= 7, 'bg-yellow-400': movie.vote_average < 7 && movie.vote_average >=4, 'bg-green-500': movie.vote_average < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ movie.vote_average }}</span>
                </div>
            </div>
            <article class="text-left relative w-full h-full">
                <h3 v-if="movie.title.length > 0" class="text-sm w-4/5 h-16 mb-1 font-semibold overflow-hidden">{{ movie.title }}</h3>
                <h3 v-else class="text-sm w-4/5 h-16 mb-1 font-semibold overflow-hidden">{{ movie.original_title }}</h3>
                <p class="text-xs w-4/5 pb-4">veröffentlicht: {{ movie.release_date.substring(0,4) }}</p>
            </article>
        </div>  
    </router-link>
</template>

<script>
export default {
  name: 'MovieHighlightsItem',
  props: {
    movie: Object
  },
  computed: {
      poster: function() {
              return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
      },
      overview: function() {
        return  this.movie.overview.length > 100 ? this.movie.overview.substring(0, 100) + "..." : this.movie.overview
      } 
  }
}
</script>