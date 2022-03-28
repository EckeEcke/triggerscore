<template>
<div class="bg-gray-900 flex py-2 sm:py-0 mt-4">
<div class="flex items-center gap-4 justify-end container mx-auto xl:w-10/12 px-4">
                <h2 class="text-left my-2 text-sm text-yellow-500 font-semibold">{{ $t('filter.displayedScore') }}</h2>
                <div class="flex my-3 rounded max-w-md">
                <select v-model="shownScore" class="w-full md:w-auto h-8 md:h-10 bg-white rounded p-2 outline-none text-sm md:text-base">
                    <option class="py-1" value="rating_total">{{ $t('categories.totalScore') }}</option>
                    <option class="py-1" value="rating_sexism">{{ $t('categories.sexism') }}</option>
                    <option class="py-1" value="rating_racism">{{ $t('categories.racism') }}</option>
                    <option class="py-1" value="rating_others">{{ $t('categories.others') }}</option>
                    <option class="py-1" value="rating_cringe">{{ $t('categories.cringe') }}</option>
                </select>
                </div>
              </div>
</div>
              
    
</template>

<script>
export default {
  name: 'ScoreSelect',
  computed: {
    shownScore: {
      get: function(){
        return this.$store.state.shownScore
      },
      set: function(value){
        this.$store.commit("setShownScore",value)
        this.$store.dispatch("filterMovies")
      }
    },
  }
}
</script>