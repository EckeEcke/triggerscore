<template>
    <router-link :to="{name: 'movie', params: {id: movie.id}}" tag="div" class="w-full h-44 bg-white shadow-md flex relative md:rounded-lg transform transition duration-300 md:hover:scale-105 container-xl cursor-pointer">
        <img load="lazy" class="h-full md:rounded-l-lg" :src=poster @error="$event.target.src='http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'" />
        <div class="w-full p-3">
            <div class="absolute top-1 right-1 h-12 w-12 bg-gradient-to-b from-red-700 to-red-600 text-white rounded-full">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">7.9</span>
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
  name: 'MovieListitem',
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