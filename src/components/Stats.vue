<template>
      <section class="bg-transparent text-white py-6 md:pt-4 md:pb-12 md:px-0 text-left text-sm mx-auto md:rounded flex flex-col gap-x-12">
        <div class="w-full px-4 sm:px-0 mb-8">
          <div class=" font-semibold w-full flex flex-col lg:flex-row  lg:gap-16">
            <div class="w-full lg:w-1/3">
              <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
                <span>{{ $t('stats.totalRatings') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ stats.totalRatings }}</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
                <span>{{ $t('stats.moviesOnTS') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ stats.amountMovies }}</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
                <span>{{ $t('stats.totalComments') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ stats.amountComments }}</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
                <span>{{ $t('stats.totalLikes') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ stats.amountLikes }}</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
                <span>{{ $t('stats.totalDislikes') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ stats.amountDislikes }}</span>
              </div>
            </div>
            <div class="w-full lg:w-1/3">
              <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
                <span>{{ $t('stats.averageComments') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ (stats.amountComments / stats.amountMovies).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
                <span>{{ $t('stats.averageLikes') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ (stats.amountLikes / stats.amountMovies).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
                <span>{{ $t('stats.averageDislikes') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ (stats.amountDislikes / stats.amountMovies).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
                <span>{{ $t('stats.averageRatings') }}</span><span class="text-lg font-semibold h-12 flex items-center">{{ (stats.totalRatings / stats.amountMovies).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
                <span>{{ $t('stats.launch') }}</span><span class="text-lg font-semibold h-12 flex items-center">2021</span>
              </div>
            </div>
          <div class="w-full lg:w-1/3">
            <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
            <span>{{ $t('stats.average') }} Triggerscore</span>
            <div class="h-12 w-12 text-white rounded-lg font-semibold text-lg" :class="{'bg-red-700': stats.averageScoreTotal >= 7, 'bg-yellow-500':  stats.averageScoreTotal < 7 &&  stats.averageScoreTotal >=4, 'bg-green-600':  stats.averageScoreTotal < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreTotal }}</span>
                </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
            <span>{{ $t('stats.average') }} {{ $t('categories.sexism') }}</span>
            <div class="h-12 w-12 text-white rounded-lg font-semibold text-lg" :class="{'bg-red-700': stats.averageScoreSexism >= 7, 'bg-yellow-500':  stats.averageScoreSexism < 7 &&  stats.averageScoreSexism >=4, 'bg-green-600':  stats.averageScoreSexism < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreSexism }}</span>
                </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
            <span>{{ $t('stats.average') }} {{ $t('categories.racism') }}</span>
            <div class="h-12 w-12 text-white rounded-lg font-semibold text-lg" :class="{'bg-red-700': stats.averageScoreRacism >= 7, 'bg-yellow-500':  stats.averageScoreRacism < 7 &&  stats.averageScoreRacism >=4, 'bg-green-600':  stats.averageScoreRacism < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreRacism }}</span>
                </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
            <span>{{ $t('stats.average') }} {{ $t('categories.others') }}</span>
            <div class="h-12 w-12 text-white rounded-lg font-semibold text-lg" :class="{'bg-red-700': stats.averageScoreOthers >= 7, 'bg-yellow-500':  stats.averageScoreOthers < 7 &&  stats.averageScoreOthers >=4, 'bg-green-600':  stats.averageScoreOthers < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreOthers }}</span>
                </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-b border-gray-800 py-4 gap-4">
            <span>{{ $t('stats.average') }} {{ $t('categories.cringe') }}</span>
            <div class="h-12 w-12 text-white rounded-lg font-semibold text-lg" :class="{'bg-red-700': stats.averageScoreCringe >= 7, 'bg-yellow-500':  stats.averageScoreCringe < 7 &&  stats.averageScoreCringe >=4, 'bg-green-600':  stats.averageScoreCringe < 4}">
                <div class="relative w-full h-full">
                    <span class="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2">{{ stats.averageScoreCringe }}</span>
                </div>
            </div>
          </div>
          </div>
          
          
        </div>
        </div>
        <div class="w-full sm:max-w-xl lg:max-w-none sm:flex-wrap px-4 sm:px-0 pb-2 flex sm:justify-center overflow-auto hide-scrollbar sm:mx-auto">
          <div>
            <h2 class="font-semibold mt-4 h-14 flex items-center pr-2">{{ $t('stats.lowestScore') }}</h2>
            <MovieHighlightItem :scores="lowestScoreMovie" :movie="movie[0]" shownScore="rating_total" :loadItem=true />
          </div>
          <div>
            <h2 class="font-semibold mt-4 h-14 flex items-center pr-2">{{ $t('stats.highestScore') }}</h2>
            <MovieHighlightItem :scores="highestScoreMovie" :movie="movieHighest[0]" shownScore="rating_total"  :loadItem=true />
          </div>
          <div>
            <h2 class="font-semibold mt-4 h-14 flex items-center pr-2 w-40" v-html="$t('stats.mostRatings',[mostRatedMovie.ratings])"></h2>
            <MovieHighlightItem :scores="mostRatedMovie" :movie="mostRated[0]" shownScore="rating_total" :loadItem=true />
          </div>
          <div>
            <h2 class="font-semibold mt-4 h-14 flex items-center pr-2 w-40" v-html="$t('stats.mostComments',[mostCommentedMovie.comments.filter(comment => {return comment.length > 3}).length])"></h2>
            <MovieHighlightItem :scores="mostCommentedMovie" :movie="mostCommented[0]" shownScore="rating_total" :loadItem=true />
          </div>
          <div>
            <h2 class="font-semibold mt-4 h-14 flex items-center pr-2 w-40" v-html="$t('stats.mostLiked',[mostLikedMovie.likes])"></h2>
            <MovieHighlightItem :scores="mostLikedMovie" :movie="mostLiked[0]" shownScore="rating_total" :loadItem=true />
          </div>
          <div>
            <h2 class="font-semibold mt-4 h-14 flex items-center pr-2 w-40" v-html="$t('stats.mostDisliked',[mostDislikedMovie.dislikes])"></h2>
            <MovieHighlightItem :scores="mostDislikedMovie" :movie="mostDisliked[0]" shownScore="rating_total" :loadItem=true />
          </div>
        </div>
    </section>
</template>

<script>
import MovieHighlightItem from './MovieHighlightItem.vue'

export default {
  name: 'Stats',
  components: {
    MovieHighlightItem
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
    highestScoreMovie: function(){
      return this.$store.getters.getTriggerscores.reduce(function(a,b){
        return a.rating_total > b.rating_total ? a : b
      })
    },
    mostRatedMovie: function(){
      return this.$store.getters.getTriggerscores.reduce(function(a,b){
        return a.ratings > b.ratings ? a : b
      })
    },
    mostLikedMovie: function(){
      return this.$store.getters.getTriggerscores.reduce(function(a,b){
        return a.likes > b.likes ? a : b
      })
    },
    mostDislikedMovie: function(){
      return this.$store.getters.getTriggerscores.reduce(function(a,b){
        return a.dislikes > b.dislikes ? a : b
      })
    },
    mostCommentedMovie: function(){
      return this.$store.getters.getTriggerscores.reduce(function(a,b){
        let filteredArrayA = a.comments.filter(comment => {return comment.length > 3})
        let filteredArrayB = b.comments.filter(comment => {return comment.length > 3})
        return filteredArrayA.length > filteredArrayB.length ? a : b
      })
    },
    movie: function(){
      if(this.lowestScoreMovie){
        return this.$store.getters.getMovies.filter(movie => movie.id == this.lowestScoreMovie.movie_id)
      } else return {}
    },
    movieHighest: function(){
      if(this.highestScoreMovie){
        return this.$store.getters.getMovies.filter(movie => movie.id == this.highestScoreMovie.movie_id)
      } else return {}
    },
    mostRated: function(){
      if(this.mostRatedMovie){
        return this.$store.getters.getMovies.filter(movie => movie.id == this.mostRatedMovie.movie_id)
      } else return {}
    },
    mostCommented: function(){
      if(this.mostCommentedMovie){
        return this.$store.getters.getMovies.filter(movie => movie.id == this.mostCommentedMovie.movie_id)
      } else return {}
    },
    mostLiked: function(){
      if(this.mostLikedMovie){
        return this.$store.getters.getMovies.filter(movie => movie.id == this.mostLikedMovie.movie_id)
      } else return {}
    },
    mostDisliked: function(){
      if(this.mostDislikedMovie){
        return this.$store.getters.getMovies.filter(movie => movie.id == this.mostDislikedMovie.movie_id)
      } else return {}
    },
  }
}
</script>