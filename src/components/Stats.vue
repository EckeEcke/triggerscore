<template>
    <section class="container-xl bg-white p-6 md:p-12 text-left text-sm md:w-8/12 lg:w-1/2 mx-auto md:rounded-lg">
        <div class="bg-white rounded-lg font-semibold">
          <div class="flex justify-between items-center border-b border-gray-300 py-4 h-24 gap-4">
            <span class="text-lg">Gesamtzahl abgegebene Bewertungen:</span><span class="text-3xl font-semibold">{{ stats.totalRatings }}</span>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 py-4 h-24 gap-4">
            <span class="text-lg">Filme auf Triggerscore:</span><span class="text-3xl font-semibold">{{ stats.amountMovies }}</span>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 py-4 gap-4">
            <span class="text-lg">Durchschnitt Triggerscore:</span>
            <div class="h-16 w-16 text-white rounded-lg font-semibold text-3xl" :class="{'bg-red-700': stats.averageScoreTotal >= 7, 'bg-yellow-400':  stats.averageScoreTotal < 7 &&  stats.averageScoreTotal >=4, 'bg-green-500':  stats.averageScoreTotal < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreTotal }}</span>
                </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 py-4 gap-4">
            <span class="text-lg">Durchschnitt Sexismus:</span>
            <div class="h-16 w-16 text-white rounded-lg font-semibold text-3xl" :class="{'bg-red-700': stats.averageScoreSexism >= 7, 'bg-yellow-400':  stats.averageScoreSexism < 7 &&  stats.averageScoreSexism >=4, 'bg-green-500':  stats.averageScoreSexism < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreSexism }}</span>
                </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 py-4 gap-4">
            <span class="text-lg">Durchschnitt Rassismus:</span>
            <div class="h-16 w-16 text-white rounded-lg font-semibold text-3xl" :class="{'bg-red-700': stats.averageScoreRacism >= 7, 'bg-yellow-400':  stats.averageScoreRacism < 7 &&  stats.averageScoreRacism >=4, 'bg-green-500':  stats.averageScoreRacism < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreRacism }}</span>
                </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 py-4 gap-4">
            <span class="text-lg">Durchschnitt Sonstige:</span>
            <div class="h-16 w-16 text-white rounded-lg font-semibold text-3xl" :class="{'bg-red-700': stats.averageScoreOthers >= 7, 'bg-yellow-400':  stats.averageScoreOthers < 7 &&  stats.averageScoreOthers >=4, 'bg-green-500':  stats.averageScoreOthers < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreOthers }}</span>
                </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-300 py-4 gap-4">
            <span class="text-lg">Durchschnitt Cringe:</span>
            <div class="h-16 w-16 text-white rounded-lg font-semibold text-3xl" :class="{'bg-red-700': stats.averageScoreCringe >= 7, 'bg-yellow-400':  stats.averageScoreCringe < 7 &&  stats.averageScoreCringe >=4, 'bg-green-500':  stats.averageScoreCringe < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreCringe }}</span>
                </div>
            </div>
          </div>
        </div>
    </section>
    
</template>

<script>
export default {
  name: 'Stats',
  mounted: function(){
    this.$store.dispatch("setStats")
  },
  computed: {
    stats: function(){
      return this.$store.getters.getStats
    }
  }
}
</script>