<template>
<div class="bg-white rounded-b-lg px-4 py-6">
    <div class="mx-auto md:border md:border-gray-200 rounded-lg overflow-hidden">
        <h2 class="text-xl md:text-white md:bg-red-500 py-4" id="rating">Bewertung abgeben für<br><i class="font-semibold">"{{ title }}"</i></h2>
                    <label class="my-3 block text-lg font-semibold">Sexismus</label>
                    <p class="mb-4">Werden veraltete Rollenbilder vermittelt? </p>
                    <div class="flex w-fit sm:justify-center overflow-y-scroll sm:overflow-hidden mb-5">
                        <button v-for="(n,i) in 11" :key="i" @click="ratingSexism = ratingSexism == i ? null : i " class="p-1 text-center text-sm flex-none w-12 h-12 sm:w-8 sm:h-8 mx-1 rounded-full bg-opacity-20 font-semibold" :class="{ 'bg-green-400': i < 3, 'bg-yellow-400': i > 2 && i < 8, 'bg-red-500': i > 7, 'bg-opacity-100': ratingSexism == i }">
                            {{i}}
                        </button>
                    </div>
                    
                    <hr>
                    <label class="my-3 block text-lg font-semibold">Rassismus</label>
                    <p class="mb-4">Werden unkritisch rassistische Klischees bedient?</p>
                    <div class="flex w-fit sm:justify-center overflow-y-scroll sm:overflow-hidden mb-5">
                        <button v-for="(n,i) in 11" :key="i" @click="ratingRacism = ratingRacism == i ? null : i" class="p-1 text-center text-sm flex-none w-12 h-12 sm:w-8 sm:h-8 mx-1 rounded-full opacity-50 font-semibold" :class="{ 'bg-green-400': i < 3, 'bg-yellow-400': i > 2 && i < 8, 'bg-red-500': i > 7, 'opacity-100': ratingRacism == i }">
                            {{i}}
                        </button>
                    </div>
                    <hr>
                    <label class="my-3 block text-lg font-semibold">Sonstige</label>
                    <p class="mb-4">Enthält der Film weitere triggernde Elemente?</p>
                    <div class="flex w-fit sm:justify-center overflow-y-scroll sm:overflow-hidden mb-5">
                        <button v-for="(n,i) in 11" :key="i" @click="ratingOthers = ratingOthers == i ? null : i" class="p-1 text-center text-sm flex-none w-12 h-12 sm:w-8 sm:h-8 mx-1 rounded-full opacity-50 font-semibold" :class="{ 'bg-green-400': i < 3, 'bg-yellow-400': i > 2 && i < 8, 'bg-red-500': i > 7, 'opacity-100': ratingOthers == i }">
                            {{i}}
                        </button>
                    </div>
                    
                    <hr>
                    <label class="my-3 block text-lg font-semibold">Cringe</label>
                    <p class="mb-4">Sind Inszenierung, Dialoge oder Handlungen "zum Fremdschämen"?</p>
                    <div class="flex w-fit sm:justify-center overflow-y-scroll sm:overflow-hidden mb-5">
                        <button v-for="(n,i) in 11" :key="i" @click="ratingCringe = ratingCringe == i ? null : i" class="p-1 text-center text-sm flex-none w-12 h-12 sm:w-8 sm:h-8 mx-1 rounded-full opacity-50 font-semibold" :class="{ 'bg-green-400': i < 3, 'bg-yellow-400': i > 2 && i < 8, 'bg-red-500': i > 7, 'opacity-100': ratingCringe == i }">
                            {{i}}
                        </button>
                    </div>
                    <hr>
                    <div class="flex justify-center my-8">
                        <button class="bg-red-500 text-white p-3 rounded-lg">Bewertung abschicken</button>
                    </div>
    </div>
                    
                    
                </div>
</template>

<script>
export default {
  name: 'Ratingpage',
  data(){
      return {
          ratingSexism: null,
          ratingRacism: null,
          ratingOthers: null,
          ratingCringe: null // on submit turn to 0 if null
      }
  },
  props: {
    title: String,
    id: Number
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