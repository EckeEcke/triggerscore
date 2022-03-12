<template>
    <router-link :to="{name: 'movie', params: {id: movie.id}}" tag="div" class="bg-white sm:rounded-lg shadow-md flex relative border-b-2 md:border-b-0 md:rounded-lg cursor-pointer min-w-sm">
        <div class="w-full max-w-sm p-3">
            <article class="text-left relative w-full h-full">
                <div class="flex items-center gap-2">
                 
                <div class="flex rounded-full justify-center w-8 h-8 md:w-12 md:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': scores.rating_total >= 7, 'bg-yellow-400': scores.rating_total < 7 && scores.rating_total >=4, 'bg-green-500': scores.rating_total < 4}">
                    <p class="self-center text-white text-lg">{{scores.rating_total}}</p>
                </div>
                   <h3 v-if="movie.title.length > 0" class="flex items-center text-base mb-1 font-semibold overflow-hidden inline-block h-12 overflow-hidden">{{ movie.title }}</h3>
                <h3 v-else class="text-base mb-1 font-semibold overflow-hidden">{{ movie.original_title }}</h3>
                </div>
                <hr class="my-3 hidden sm:block">
                <div class="grid grid-cols-2 gap-1 text-xs">
                    <div class="flex my-2 text-sm">
                            <div class="flex rounded-full justify-center w-8 h-8 md:w-12 md:h-12 lg:w-10 lg:h-10 mr-2"  :class="{'bg-red-700': scores.rating_sexism >= 7, 'bg-yellow-400': scores.rating_sexism < 7 && scores.rating_sexism >=4, 'bg-green-500': scores.rating_sexism < 4}">
                                <div class="self-center text-white">{{scores.rating_sexism}}</div>
                            </div>
                            <p class="self-center">Sexismus</p>
                        </div>
                        <div class="flex my-2 text-sm">
                            <div class="flex bg-red-500 rounded-full justify-center w-8 h-8 md:w-12 md:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': scores.rating_racism >= 7, 'bg-yellow-400': scores.rating_racism < 7 && scores.rating_racism >=4, 'bg-green-500': scores.rating_racism < 4}">
                                <div class="self-center text-white">{{scores.rating_racism}}</div>
                            </div>
                            <p class="self-center">Rassismus</p>
                        </div>
                        <div class="flex my-2 text-sm">
                            <div class="flex bg-red-500 rounded-full justify-center w-8 h-8 md:w-12 md:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': scores.rating_others >= 7, 'bg-yellow-400': scores.rating_others < 7 && scores.rating_others >=4, 'bg-green-500': scores.rating_others < 4}">
                                <div class="self-center text-white">{{scores.rating_others}}</div>
                            </div>
                            <p class="self-center">Sonstige</p>
                        </div>
                        <div class="flex my-2 text-sm">
                            <div class="flex bg-red-500 rounded-full justify-center w-8 h-8 md:w-12 md:h-12 lg:w-10 lg:h-10 mr-2" :class="{'bg-red-700': scores.rating_cringe >= 7, 'bg-yellow-400': scores.rating_cringe < 7 && scores.rating_cringe >=4, 'bg-green-500': scores.rating_cringe < 4}">
                                <div class="self-center text-white">{{scores.rating_cringe}}</div>
                            </div> 
                            <p class="self-center">Cringe</p>
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

      scoreAvailable: function() {
          return this.scores != undefined
      }
  }
}
</script>