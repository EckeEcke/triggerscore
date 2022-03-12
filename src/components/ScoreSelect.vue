<template>
<div class="bg-gray-900 flex py-2 sm:py-0">
<div class="flex items-center gap-4 justify-end container mx-auto xl:w-10/12 px-4">
                <h2 class="text-left my-2 text-sm text-yellow-500 font-semibold">Angezeigter Triggerscore</h2>
                <div class="flex my-3 rounded max-w-md">
                <select v-model="shownScore" class="w-full md:w-auto h-8 md:h-10 bg-white rounded p-2 outline-none text-sm md:text-base">
                    <option class="py-1" value="rating_total">Gesamtwertung</option>
                    <option class="py-1" value="rating_sexism">Sexismus</option>
                    <option class="py-1" value="rating_racism">Rassismus</option>
                    <option class="py-1" value="rating_others">Sonstige</option>
                    <option class="py-1" value="rating_cringe">Cringe</option>
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