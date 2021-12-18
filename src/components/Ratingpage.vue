<template>
<div class="bg-white rounded-b-lg pt-6">
    <div class="mx-auto overflow-hidden">
        <h2 class="text-xl text-white bg-red-600 py-4" id="rating">Bewertung abgeben für<br><i class="font-semibold">"{{ title }}"</i></h2>
                    <label class="my-3 block text-lg font-semibold">Sexismus</label>
                    <p class="mb-4">Werden veraltete Rollenbilder vermittelt? </p>
                    <div class="rating hide-scrollbar flex w-fit sm:justify-center overflow-y-scroll sm:overflow-hidden mb-5">
                        <button v-for="(n,i) in 11" :key="i" @click="ratingSexism = ratingSexism == 10-i ? null : 10-i " :class="[['rating' + (10-i)], [ratingSexism == 10-i ? 'opacity-100' : 'opacity-40']]" class="w-16 h-16 sm:w-8 sm:h-8 md:w-12 md:h-12 p-1 text-center text-sm flex-none opacity-50 font-semibold" >
                            <div class="w-full h-full rounded-full flex text-center justify-center" :class="{'transform scale-110': ratingSexism == 10-i, 'bg-green-400': 10-i < 3, 'bg-yellow-400': 10-i > 2 && 10-i < 8, 'bg-red-500': 10-i > 7, 'opacity-100': ratingSexism == 10-i }"><span class="self-center">{{10-i}}</span></div>
                        </button>
                    </div>
                    
                    <hr>
                    <label class="my-3 block text-lg font-semibold">Rassismus</label>
                    <p class="mb-4">Werden unkritisch rassistische Klischees bedient?</p>
                    <div class="rating hide-scrollbar flex w-fit sm:justify-center overflow-y-scroll sm:overflow-hidden mb-5">
                        <button v-for="(n,i) in 11" :key="i" @click="ratingRacism = ratingRacism == 10-i ? null : 10-i " :class="[['rating' + (10-i)], [ratingRacism == 10-i ? 'opacity-100' : 'opacity-50']]" class="w-16 h-16 sm:w-8 sm:h-8 md:w-12 md:h-12 p-1 text-center text-sm flex-none font-semibold">
                            <div class="w-full h-full rounded-full flex text-center justify-center" :class="{'transform scale-110': ratingRacism == 10-i, 'bg-green-400': 10-i < 3, 'bg-yellow-400': 10-i > 2 && 10-i < 8, 'bg-red-500': 10-i > 7, 'opacity-100': ratingRacism == 10-i }"><span class="self-center">{{10-i}}</span></div>
                        </button>
                    </div>
                    <hr>
                    <label class="my-3 block text-lg font-semibold">Sonstige</label>
                    <p class="mb-4">Enthält der Film weitere triggernde Elemente?</p>
                    <div class="rating hide-scrollbar flex w-fit sm:justify-center overflow-y-scroll sm:overflow-hidden mb-5">
                        <button v-for="(n,i) in 11" :key="i" @click="ratingOthers = ratingOthers == 10-i ? null : 10-i " :class="[['rating' + (10-i)], [ratingOthers == 10-i ? 'opacity-100' : 'opacity-50']]" class="w-16 h-16 sm:w-8 sm:h-8 md:w-12 md:h-12 p-1 text-center text-sm flex-none font-semibold">
                            <div class="w-full h-full rounded-full flex text-center justify-center" :class="{'transform scale-110': ratingOthers == 10-i, 'bg-green-400': 10-i < 3, 'bg-yellow-400': 10-i > 2 && 10-i < 8, 'bg-red-500': 10-i > 7, 'opacity-100': ratingOthers == 10-i }"><span class="self-center">{{10-i}}</span></div>
                        </button>
                    </div>
                    
                    <hr>
                    <label class="my-3 block text-lg font-semibold">Cringe</label>
                    <p class="mb-4">Sind Inszenierung, Dialoge oder Handlungen "zum Fremdschämen"?</p>
                    <div class="rating hide-scrollbar flex w-fit sm:justify-center overflow-y-scroll sm:overflow-hidden mb-5">
                        <button v-for="(n,i) in 11" :key="i" @click="ratingCringe = ratingCringe == 10-i ? null : 10-i " :class="[['rating' + (10-i)], [ratingCringe == 10-i ? 'opacity-100' : 'opacity-50']]" class="w-16 h-16 sm:w-8 sm:h-8 md:w-12 md:h-12 p-1 text-center text-sm flex-none font-semibold">
                            <div class="w-full h-full rounded-full flex text-center justify-center" :class="{'transform scale-110': ratingCringe == 10-i, 'bg-green-400': 10-i < 3, 'bg-yellow-400': 10-i > 2 && 10-i < 8, 'bg-red-500': 10-i > 7, 'opacity-100': ratingCringe == 10-i }"><span class="self-center">{{10-i}}</span></div>
                        </button>
                    </div>
                    <hr>
                    <div class="flex justify-center py-4 bg-red-600 rounded-b-lg">
                        <button class="bg-red-500 border border-white text-white font-semibold p-3 rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:bg-red-700">Bewertung abschicken</button>
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
<style>
    .hide-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .hide-scrollbar {
         -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;
    }
    .rating {
        direction: rtl;
    }

    @media (min-width: 576px){
        .rating button:hover {
        opacity: 1
        }
        .rating0:hover ~ button {
            opacity: 1
        }
        .rating1:hover ~ button {
            opacity: 1
        }
        .rating2:hover ~ button {
            opacity: 1
        }
        .rating3:hover ~ button {
            opacity: 1
        }
        .rating4:hover ~ button {
            opacity: 1
        }
        .rating5:hover ~ button {
            opacity: 1
        }
        .rating6:hover ~ button {
            opacity: 1
        }
        .rating7:hover ~ button {
            opacity: 1
        }
        .rating8:hover ~ button {
            opacity: 1
        }
        .rating9:hover ~ button {
            opacity: 1
        }
        .rating10:hover ~ button {
            opacity: 1
        }
    }
    
    
</style>