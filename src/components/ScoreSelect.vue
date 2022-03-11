<template>
        <div class="container  px-4 xl:w-10/12 mx-auto my-8">
              <h2 class="font-semibold text-left mb-2 text-white">Angezeigter Triggerscore</h2>
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