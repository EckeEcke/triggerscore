<template>
    <router-link :to="{name: 'movie', params: {id: movie.id}}" tag="div" class="bg-white sm:rounded shadow-md flex flex-col relative border-b-2 md:border-b-0 cursor-pointer min-w-sm lg:hover:scale-105 transform transition duration-300">
        <div class="hidden md:block relative w-full h-44 p-3 text-white bg-cover bg-center sm:rounded-t w-3/4" :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(22,0,0,0.1),rgba(22,0,0,0.2)),url(' + poster + ')'}">
                 
                <div class="flex absolute top-2 right-2 rounded-lg justify-center w-16 h-16 mr-2 bg-opacity-80" :class="{'bg-red-700': scoreTotal >= 7, 'bg-yellow-500': scoreTotal < 7 && scoreTotal >=4, 'bg-green-600': scoreTotal < 4}">
                    <p class="self-center text-white text-xl font-semibold">{{scoreTotal}}</p>
                </div>
        </div>
        <div class="md:hidden sm:rounded-t px-3 pt-5 sm:pt-3 pb-0 bg-white text-inherit">
            <div class="flex items-center gap-2 text-left">
                 
                <div class="flex rounded-lg justify-center w-10 h-10 mr-2" :class="{'bg-red-700': scoreTotal >= 7, 'bg-yellow-500': scoreTotal < 7 && scoreTotal >=4, 'bg-green-600': scoreTotal < 4}">
                    <p class="self-center text-white text-lg font-semibold">{{scoreTotal}}</p>
                </div>
                <div class=" w-10/12">
                    <h3 v-if="movie.title.length > 0" class="text-base font-semibold overflow-hidden h-6 overflow-hidden whitespace-nowrap custom-headline">{{ movie.title }}</h3>
                    <h3 v-else class="text-base font-semibold overflow-hidden">{{ movie.original_title }}</h3>
                    <div class="text-xs pt-1">
                    <span>{{ movie.release_date.substring(0,4) }}</span>
                    <span class="mx-2">|</span>
                    <span>{{ movie.runtime }} {{ $t('general.minutes') }}</span>
                </div> 
                </div>
                   
                </div>
        </div>
        <div class="w-full max-w-sm p-3 pt-2 pb-5 sm:pb-2">
            <article class="text-left relative w-full h-full">
                <h3 v-if="movie.title.length > 0" class="hidden md:block text-base mb-1 font-semibold overflow-hidden h-6 overflow-hidden">{{ movie.title }}</h3>
                <h3 v-else class="hidden md:block text-base mb-1 font-semibold overflow-hidden">{{ movie.original_title }}</h3>
                <div class="text-xs mb-1 py-1 hidden sm:block">
                    <span>{{ movie.release_date.substring(0,4) }}</span>
                    <span class="mx-2">|</span>
                    <span>{{ movie.runtime }} {{ $t('general.minutes') }}</span>
                </div> 
                <div class="grid grid-cols-2 text-sm">
                    <div class="flex my-2 text-sm">
                            <div class="flex justify-center rounded-lg w-8 h-8 mr-2"  :class="{'bg-red-700': scores.rating_sexism >= 7, 'bg-yellow-500': scores.rating_sexism < 7 && scores.rating_sexism >=4, 'bg-green-600': scores.rating_sexism < 4}">
                                <div class="self-center text-white">{{scores.rating_sexism}}</div>
                            </div>
                            <p class="self-center">{{ $t('categories.sexism') }}</p>
                        </div>
                        <div class="flex my-2 text-sm">
                            <div class="flex bg-red-500 rounded-lg justify-center w-8 h-8 mr-2" :class="{'bg-red-700': scores.rating_racism >= 7, 'bg-yellow-500': scores.rating_racism < 7 && scores.rating_racism >=4, 'bg-green-600': scores.rating_racism < 4}">
                                <div class="self-center text-white">{{scores.rating_racism}}</div>
                            </div>
                            <p class="self-center">{{ $t('categories.racism') }}</p>
                        </div>
                        <div class="flex my-2 text-sm">
                            <div class="flex bg-red-500 rounded-lg justify-center w-8 h-8 mr-2" :class="{'bg-red-700': scores.rating_others >= 7, 'bg-yellow-500': scores.rating_others < 7 && scores.rating_others >=4, 'bg-green-600': scores.rating_others < 4}">
                                <div class="self-center text-white">{{scores.rating_others}}</div>
                            </div>
                            <p class="self-center">{{ $t('categories.others') }}</p>
                        </div>
                        <div class="flex my-2 text-sm">
                            <div class="flex bg-red-500 rounded-lg justify-center w-8 h-8 mr-2" :class="{'bg-red-700': scores.rating_cringe >= 7, 'bg-yellow-500': scores.rating_cringe < 7 && scores.rating_cringe >=4, 'bg-green-600': scores.rating_cringe < 4}">
                                <div class="self-center text-white">{{scores.rating_cringe}}</div>
                            </div> 
                            <p class="self-center">{{ $t('categories.cringe') }}</p>
                        </div>
                </div>
            </article>
        </div>  
    </router-link>
</template>

<script>
export default {
  name: 'RecentRatingsItem',
  props: {
    movie: Object,
    scores: Object
  },
  computed: {
      poster: function() {
          if(this.movie.backdrop_path){
              return `https://image.tmdb.org/t/p/original/${this.movie.backdrop_path}`
          } else return require('@/assets/images/film-poster-placeholder.png')
          
      },
      scoreAvailable: function() {
          return this.scores != undefined
      },
      scoreTotal: function() {
          if(this.scores){
              return Math.floor((this.scores.rating_sexism + this.scores.rating_racism + this.scores.rating_others) / 3 * 10) / 10
          } else return "-"
          
      }
  }
}
</script>

<style>
    .custom-headline {
        width: calc(100% - 10px);
        text-overflow: ellipsis;
    }
</style>