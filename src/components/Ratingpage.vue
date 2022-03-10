<template>
<div :class="{'bg-opacity-0': submitted}" class="w-full bg-white rounded-b-lg  lg:rounded-t-lg">
    <div v-if="submitted" class="bg-green-500 text-white text-center text-2xl p-6 rounded-b-lg lg:rounded-lg lg:h-auto lg:sticky lg:bottom-0">
        <img src="../assets/images/thanks.gif" ref="thanks" class="mx-auto hidden lg:block mt-16 mb-8 rounded-lg shadow-lg" />
        <p class="font-bold">Danke für deine Bewertung!</p>
    </div>
    <div v-else class="mx-auto overflow-hidden">
        <h2 class="bg-red-900 bg-opacity-90 text-xl text-white py-4  lg:rounded-t-lg" style="background-image: linear-gradient(rgba(220, 0, 0, 0.6), rgba(220, 0, 100, 0.6))" id="rating">Bewertung abgeben für<br><i class="font-semibold">"{{ title }}"</i></h2>
        <label class="my-3 block text-lg font-semibold">Sexismus</label>
        <p class="mb-4">Werden veraltete Rollenbilder vermittelt? </p>
        <div class="rating hide-scrollbar flex w-fit sm:justify-center overflow-y-scroll sm:overflow-hidden mb-5">
            <button v-for="(n,i) in 11" :key="i" @click="ratingSexism = ratingSexism == 10-i ? null : 10-i " :class="[['rating' + (10-i)], [ratingSexism == 10-i ? 'opacity-100' : 'opacity-40']]" class="w-16 sm:w-8  md:w-12 lg:w-8 xl:w-12 h-16 sm:h-8  md:h-12 lg:h-8 xl:h-12 p-1 text-center text-sm flex-none opacity-50 font-semibold" >
                <div class="w-full h-full rounded-full flex text-center justify-center" :class="{'transform scale-110': ratingSexism == 10-i, 'bg-green-400': 10-i < 4, 'bg-yellow-400': 10-i > 2 && 10-i < 7, 'bg-red-500': 10-i > 6, 'opacity-100': ratingSexism == 10-i }"><span class="self-center">{{10-i}}</span></div>
            </button>
        </div>
        
        <hr class="lg:border-white">
        <label class="my-3 block text-lg font-semibold">Rassismus</label>
        <p class="mb-4">Werden unkritisch rassistische Klischees bedient?</p>
        <div class="rating hide-scrollbar flex w-fit sm:justify-center overflow-y-scroll sm:overflow-hidden mb-5">
            <button v-for="(n,i) in 11" :key="i" @click="ratingRacism = ratingRacism == 10-i ? null : 10-i " :class="[['rating' + (10-i)], [ratingRacism == 10-i ? 'opacity-100' : 'opacity-50']]" class="w-16 sm:w-8  md:w-12 lg:w-8 xl:w-12 h-16 sm:h-8  md:h-12 lg:h-8 xl:h-12 p-1 text-center text-sm flex-none opacity-50 font-semibold">
                <div class="w-full h-full rounded-full flex text-center justify-center" :class="{'transform scale-110': ratingRacism == 10-i, 'bg-green-400': 10-i < 4, 'bg-yellow-400': 10-i > 2 && 10-i < 7, 'bg-red-500': 10-i > 6, 'opacity-100': ratingRacism == 10-i }"><span class="self-center">{{10-i}}</span></div>
            </button>
        </div>
        <hr class="lg:border-white">
        <label class="my-3 block text-lg font-semibold">Sonstige</label>
        <p class="mb-4">Enthält der Film weitere triggernde Elemente?</p>
        <div class="rating hide-scrollbar flex w-fit sm:justify-center overflow-y-scroll sm:overflow-hidden mb-5">
            <button v-for="(n,i) in 11" :key="i" @click="ratingOthers = ratingOthers == 10-i ? null : 10-i " :class="[['rating' + (10-i)], [ratingOthers == 10-i ? 'opacity-100' : 'opacity-50']]" class="w-16 sm:w-8  md:w-12 lg:w-8 xl:w-12 h-16 sm:h-8  md:h-12 lg:h-8 xl:h-12 p-1 text-center text-sm flex-none opacity-50 font-semibold">
                <div class="w-full h-full rounded-full flex text-center justify-center" :class="{'transform scale-110': ratingOthers == 10-i, 'bg-green-400': 10-i < 4, 'bg-yellow-400': 10-i > 2 && 10-i < 7, 'bg-red-500': 10-i > 6, 'opacity-100': ratingOthers == 10-i }"><span class="self-center">{{10-i}}</span></div>
            </button>
        </div>
        
        <hr class="lg:border-white">
        <label class="my-3 block text-lg font-semibold">Cringe</label>
        <p class="mb-4">Sind Inszenierung, Dialoge oder Handlungen "zum Fremdschämen"?</p>
        <div class="rating hide-scrollbar flex w-fit sm:justify-center overflow-y-scroll sm:overflow-hidden mb-5">
            <button v-for="(n,i) in 11" :key="i" @click="ratingCringe = ratingCringe == 10-i ? null : 10-i " :class="[['rating' + (10-i)], [ratingCringe == 10-i ? 'opacity-100' : 'opacity-50']]" class="w-16 sm:w-8  md:w-12 lg:w-8 xl:w-12 h-16 sm:h-8  md:h-12 lg:h-8 xl:h-12 p-1 text-center text-sm flex-none opacity-50 font-semibold">
                <div class="w-full h-full rounded-full flex text-center justify-center" :class="{'transform scale-110': ratingCringe == 10-i, 'bg-green-400': 10-i < 4, 'bg-yellow-400': 10-i > 3 && 10-i < 7, 'bg-red-500': 10-i > 6, 'opacity-100': ratingCringe == 10-i }"><span class="self-center">{{10-i}}</span></div>
            </button>
        </div>
        <hr class="lg:border-white">
        <div class="flex justify-center py-4 bg-white rounded-b-lg">
            <button :disabled="!(ratingSexism != null && ratingRacism != null && ratingOthers != null && ratingCringe != null)" class="bg-yellow-500 text-gray-900 disabled:opacity-50 font-semibold p-3 rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-600" @click="submitRating">Bewertung abschicken</button>
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
          ratingCringe: null,
          submitted: false
      }
  },
  props: {
    title: String,
    id: Number
  },
  mounted: function() {
      this.scrollRatings()
  },
  methods: {
      scrollRatings: function() {
          const ratings = document.getElementsByClassName("rating") // for fixing issues with flex-end and overflow-hidden
          for (let i = 0; i < ratings.length; i++) {
              ratings[i].scrollBy(-500, 0)
          }
      },
      submitRating: function(event) {

            event.preventDefault();
            this.submitted = true
            setTimeout(()=>{
                if(this.$refs.thanks){
                    window.scrollTo({top:0})
                }},1000)
            const data = { movieID: this.id, sexism: this.ratingSexism, racism: this.ratingRacism, others: this.ratingOthers, cringe: this.ratingCringe };
            fetch('https://triggerscore.herokuapp.com/post', {
                method: "post",
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                //mode: 'no-cors',
                //body: JSON.stringify({"Player": "Test","Score": 10})
                body: JSON.stringify(data)

            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => console.log(err));
            }

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
        .rating0:hover ~ button,
        .rating1:hover ~ button,
        .rating2:hover ~ button,
        .rating3:hover ~ button,
        .rating4:hover ~ button,
        .rating5:hover ~ button,
        .rating6:hover ~ button,
        .rating7:hover ~ button,
        .rating8:hover ~ button,
        .rating9:hover ~ button,
        .rating10:hover ~ button {
            opacity: 1
        }
    }
    
    
</style>