<template>
    <div class="py-12 bg-cover" :style="{'background-image': 'linear-gradient(rgba(220, 0, 0, 0.6), rgba(220, 0, 100, 0.6))'}">
        <div class="container mx-auto px-2 md:px-4 xl:w-10/12">
            <h1 class="text-white text-2xl font-semibold text-left">
                Film suchen und <router-link to="/faq" class="text-yellow-500">Triggerscore</router-link> vergeben
            </h1>
            <div class="flex flex-col md:flex-row mx-auto">
            <div class="flex mx-auto py-4 self-center w-full opacity-95">
                <div class="rounded-lg flex w-full justify-start">
                <button class="flex items-center justify-center px-3 w-16 rounded-l-xl bg-yellow-500" @click="searchMovie">
                    <font-awesome-icon :icon="['fas', 'search']" class="text-lg" />
                </button>
                <input type="text" id="search" v-model="searchInput" v-on:keyup.enter="searchMovie" @input="resetSearchResults" class="px-4 py-4 w-full rounded-r-xl outline-none transition scroll-my-4" placeholder="Film suchen...">
                </div>
            </div>
        </div>
        </div>
        
    </div>
</template>

<script>
export default {
  name: 'Searchbox',
  computed: {
    searchInput: {
          get: function() {
              return this.$store.state.searchInput
          },
          set: function(value) {
              this.$store.commit("setSearchInput", value)
          }
    }
  },
  methods: {
    searchMovie: function(){
          this.$store.dispatch("setSearchResults")
          this.showSearch = false
          this.$router.push('/search')
      },
      resetSearchResults: function() {
          this.$store.dispatch("resetSearch")
      }
  }
}
</script>