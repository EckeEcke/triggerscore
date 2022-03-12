<template>
    <div class="">
        <Searchbox />
        <div v-if="isLoading" class="mt-8">
            <font-awesome-icon :icon="['fas', 'angry']" class="text-white text-5xl animate-spin transform scale-150" />
            <p class="text-white font-semibold animate-bounce mt-8">Lädt Filme</p>
        </div>
        <div v-else>
            <MovieHighlightsContainer v-if="!isLoading" />
            
            <section class="mb-12">
                <div class="py-8 sm:mb-4" style="background-image: linear-gradient(rgba(220, 0, 0, 0.6), rgba(220, 0, 100, 0.6))">
                    <h2 class="text-white text-2xl text-left font-semibold px-4  container mx-auto xl:w-10/12">Neueste <span class="text-xl md:text-2xl self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RES
              </span></h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-4 justify-content-start container mx-auto xl:w-10/12 sm:px-4 ">
                    <RecentRatingsItem v-for="(rating,index) in recentRatings" :key="index" :movie="rating" :scores="triggerscores[triggerscores.map(score => score.movie_id).indexOf(rating.id)]" />
                </div>
                
            </section>
            <div v-if="!isLoading" class="py-8 text-left" style="background-image: linear-gradient(rgba(220, 0, 0, 0.6), rgba(220, 0, 100, 0.6))">
                <div class="container px-4 xl:w-10/12 mx-auto">
                    <h2 class="text-2xl font-semibold mb-2 text-white ">Filme entdecken</h2>
                    <p class="text-sm text-white ">Dein Film ist nicht dabei? Einfach über die <span class="text-yellow-500 transition hover:text-yellow-600 font-semibold cursor-pointer" @click="focusSearch">Suche</span> nach dem gewünschten Titel suchen und eine Bewertung abgeben</p>
                </div> 
            </div>
            <ScoreSelect />
            
            <transition-group v-if="!isLoading && filteredMovies.length > 0" tag="section" class="movielist grid gap-0 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full relative container mx-auto md:mt-4 mb-16 md:px-4 xl:w-10/12" enter-active-class="duration-100 ease-out"
                enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-500 ease-in" leave-class="opacity-100" leave-to-class="opacity-0">
                <MovieListitem v-for="movie in filteredMovies" :key="movie.id" :movie="movie" :scores="triggerscores[triggerscores.map(score => score.movie_id).indexOf(movie.id)]" />
            </transition-group>
            <div class="my-32" v-if="!isLoading && filteredMovies.length == 0">
                <p class="text-white text-xl font-semibold animate-bounce mb-4">Leider keine Ergebnisse</p>
                <button class="font-semibold bg-yellow-500 p-3 shadow text-gray-900 rounded-lg" @click="resetFilter">Filter zurücksetzen</button>
            </div>
            
                
            
        </div>
    </div>
</template>

<script>
import MovieListitem from './MovieListitem.vue'
import MovieHighlightsContainer from './MovieHighlightsContainer.vue'
import Searchbox from './Searchbox.vue'
import ScoreSelect from './ScoreSelect.vue'
import RecentRatingsItem from './RecentRatingsItem.vue'

export default {
    name: 'Movielist',
    components: {
        MovieListitem,
        MovieHighlightsContainer,
        Searchbox,
        ScoreSelect,
        RecentRatingsItem
    },
    data() {
        return {
            movieIDs: [620, 744, 2978, 9527, 1915, 4232, 9279, 9876, 4247, 4248, 9336, 9622, 2105, 4327, 7916, 11806, 9602, 9657, 9595, 37136, 10112, 14164, 11667, 9607, 9742],
            selectedSortOption: "a-z",
            showNavbar: true,
            lastScrollPosition: 0,
        }
    },
    mounted: function() {
        this.$store.dispatch("setTriggerscores")
        this.$store.dispatch("setRecentRatings")
        this.$store.dispatch("setBondMovies")
        this.$store.dispatch("filterMovies")
        window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    },
    computed: {
        isLoading: function() {
            return this.$store.getters.getHighlightsLoading || this.$store.getters.getMoviesLoading || this.triggerscores.length == 0
        },
        filteredMovies: {
            get: function() {
                return this.$store.getters.getFilteredMovies
            },
            set: function(value) {
                this.$store.commit("setFilteredMovies", value)
            }
        },
        triggerscores: function() {
            return this.$store.getters.getTriggerscores
        },
        movies: function() {
            return this.$store.getters.getMovies
        },
        recentRatings: function() {
            return this.$store.getters.getRecentRatings
        },
        searchInput: {
            get: function() {
                return this.$store.state.searchInput
            },
            set: function(value) {
                this.$store.commit("setSearchInput", value)
            }
        },
        searchResults: function() {
            return this.$store.getters.getSearchResults
        },
        searchError: {
            get: function() {
                return this.$store.getters.getSearchError
            },
            set: function(value) {
                this.$store.commit("setSearchError", value)
            }

        },
        sortingOption: function() {
            return this.$store.getters.getSortingOption
        }
    },
    watch: {
        movies: function() {
            this.$store.dispatch("filterMovies")
        },
        sortingOption: function() {
            if (this.selectedSortOption == "a-z") {
                this.filteredMovies = this.filteredMovies.sort(this.sortAtoZ)
            }
            if (this.sortingOption == "z-a") {
                this.filteredMovies = this.filteredMovies.sort(this.sortZtoA)
            }
            if (this.sortingOption == "date-desc") {
                this.filteredMovies = this.filteredMovies.sort(this.sortByDateDesc)
            }
            if (this.sortingOption == "date-asc") {
                this.filteredMovies = this.filteredMovies.sort(this.sortByDateAsc)
            }
            if (this.sortingOption == "ts-desc") {
                this.filteredMovies = this.filteredMovies.sort(this.sortByTsDesc)
            }
            if (this.sortingOption == "ts-asc") {
                this.filteredMovies = this.filteredMovies.sort(this.sortByTsAsc)
            }
        }
    },
    methods: {
        sortAtoZ: function(x, y) {
            const titleX = x.title ? x.title : x.original_title
            const titleY = y.title ? y.title : y.original_title
            if (titleX < titleY) { return -1 }
            if (titleX > titleY) { return 1 }
            return 0
        },
        sortZtoA: function(x, y) {
            console.log(x)
            const titleX = x.title ? x.title : x.original_title
            const titleY = y.title ? y.title : y.original_title
            if (titleX > titleY) { return -1 }
            if (titleX < titleY) { return 1 }
            return 0
        },
        sortByDateDesc: function(x, y) {
            return new Date(y.release_date) - new Date(x.release_date)
        },
        sortByDateAsc: function(x, y) {
            return new Date(x.release_date) - new Date(y.release_date)
        },
        sortByTsDesc: function(x, y) {
            const triggerscoreX = this.triggerscores[this.triggerscores.map(score => score.movie_id).indexOf(x.id)].rating_total
            const triggerscoreY = this.triggerscores[this.triggerscores.map(score => score.movie_id).indexOf(y.id)].rating_total
            if (triggerscoreX > triggerscoreY) { return -1 }
            if (triggerscoreX < triggerscoreY) { return 1 }
        },
        sortByTsAsc: function(x, y) {
            const triggerscoreX = this.triggerscores[this.triggerscores.map(score => score.movie_id).indexOf(x.id)].rating_total
            const triggerscoreY = this.triggerscores[this.triggerscores.map(score => score.movie_id).indexOf(y.id)].rating_total
            if (triggerscoreX < triggerscoreY) { return -1 }
            if (triggerscoreX > triggerscoreY) { return 1 }
        },
        sortMovies: function(array) {
            if (this.selectedSortOption == "a-z") {
                array = array.sort(this.sortAtoZ)
            }
            if (this.sortingOption == "z-a") {
                array = array.sort(this.sortZtoA)
            }
            if (this.sortingOption == "date-desc") {
                array = array.sort(this.sortByDateDesc)
            }
            if (this.sortingOption == "date-asc") {
                array = array.sort(this.sortByDateAsc)
            }
            return array
        },
        searchMovie: function() {
            this.$store.dispatch("setSearchResults")
        },
        onScroll: function() {
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
            if (currentScrollPosition < 0) {
                return
            }
            if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
                return
            }
            this.showNavbar = currentScrollPosition < this.lastScrollPosition
            this.lastScrollPosition = currentScrollPosition
        },
        focusSearch: function() {
            const search = document.getElementById("search")
            search.scrollIntoView()
            search.focus()
        },
        resetSearch: function() {
            this.searchInput = ""
            this.$store.dispatch("resetSearch")
        },
        resetSearchResults: function() {
            this.$store.dispatch("resetSearch")
        },
        resetFilter: function() {
            this.$store.dispatch("resetFilter")
            this.$store.dispatch("filterMovies")
        }
    }
}
</script>