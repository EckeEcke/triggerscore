<template>
    <section>
      <div class="container bg-white py-6 md:py-12 text-left text-sm xl:w-10/12 mx-auto md:rounded-lg flex flex-col lg:flex-row gap-12">
        <div class="w-full lg:w-1/2 px-4">
          <div class="bg-white rounded-lg font-semibold">
          <div class="flex justify-between items-center border-b border-gray-300 py-4 gap-4">
            <span class="text-lg">Gesamtzahl abgegebene Bewertungen</span><span class="text-2xl font-semibold h-14 flex items-center">{{ stats.totalRatings }}</span>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 py-4 gap-4">
            <span class="text-lg">Filme auf Triggerscore</span><span class="text-2xl font-semibold h-14 flex items-center">{{ stats.amountMovies }}</span>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 py-4 gap-4">
            <span class="text-lg">Durchschnitt Triggerscore</span>
            <div class="h-14 w-14 text-white rounded-lg font-semibold text-2xl" :class="{'bg-red-700': stats.averageScoreTotal >= 7, 'bg-yellow-400':  stats.averageScoreTotal < 7 &&  stats.averageScoreTotal >=4, 'bg-green-500':  stats.averageScoreTotal < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreTotal }}</span>
                </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 py-4 gap-4">
            <span class="text-lg">Durchschnitt Sexismus</span>
            <div class="h-14 w-14 text-white rounded-lg font-semibold text-2xl" :class="{'bg-red-700': stats.averageScoreSexism >= 7, 'bg-yellow-400':  stats.averageScoreSexism < 7 &&  stats.averageScoreSexism >=4, 'bg-green-500':  stats.averageScoreSexism < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreSexism }}</span>
                </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 py-4 gap-4">
            <span class="text-lg">Durchschnitt Rassismus</span>
            <div class="h-14 w-14 text-white rounded-lg font-semibold text-2xl" :class="{'bg-red-700': stats.averageScoreRacism >= 7, 'bg-yellow-400':  stats.averageScoreRacism < 7 &&  stats.averageScoreRacism >=4, 'bg-green-500':  stats.averageScoreRacism < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreRacism }}</span>
                </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 py-4 gap-4">
            <span class="text-lg">Durchschnitt Sonstige</span>
            <div class="h-14 w-14 text-white rounded-lg font-semibold text-2xl" :class="{'bg-red-700': stats.averageScoreOthers >= 7, 'bg-yellow-400':  stats.averageScoreOthers < 7 &&  stats.averageScoreOthers >=4, 'bg-green-500':  stats.averageScoreOthers < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreOthers }}</span>
                </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 py-4 gap-4">
            <span class="text-lg">Durchschnitt Cringe</span>
            <div class="h-14 w-14 text-white rounded-lg font-semibold text-2xl" :class="{'bg-red-700': stats.averageScoreCringe >= 7, 'bg-yellow-400':  stats.averageScoreCringe < 7 &&  stats.averageScoreCringe >=4, 'bg-green-500':  stats.averageScoreCringe < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreCringe }}</span>
                </div>
            </div>
          </div>
        </div>
        </div>
        <div class="w-full lg:w-1/2 px-4">
          <h2 class="font-semibold text-xl my-4 h-14 flex items-center">Niedrigster Triggerscore</h2>
          <StatItem :scores="lowestScoreMovie" :movie="movie[0]" />
          <h2 class="font-semibold text-xl my-4 flex items-center mt-8">Am häufigsten bewertet ({{mostRatedMovie.ratings}} Bewertungen)</h2>
          <StatItem :scores="mostRatedMovie" :movie="mostRated[0]" />
        </div>
    </div>
    
    </section>
    
    
</template>

<script>
import StatItem from './StatItem.vue'

export default {
  name: 'Stats',
  components: {
    StatItem
  },
  mounted: function(){
    this.$store.dispatch("setStats")
  },
  computed: {
    stats: function(){
      return this.$store.getters.getStats
    },
    lowestScoreMovie: function(){
      return this.$store.getters.getTriggerscores.reduce(function(a,b){
        return a.rating_total < b.rating_total ? a : b
      })
    },
    mostRatedMovie: function(){
      return this.$store.getters.getTriggerscores.reduce(function(a,b){
        return a.ratings > b.ratings ? a : b
      })
    },
    movie: function(){
      if(this.lowestScoreMovie){
        return this.$store.getters.getMovies.filter(movie => movie.id == this.lowestScoreMovie.movie_id)
      } else return {}
    },
    mostRated: function(){
      if(this.mostRatedMovie){
        return this.$store.getters.getMovies.filter(movie => movie.id == this.mostRatedMovie.movie_id)
      } else return {}
    }
  }
}
</script>