<template>
    <div class="">
        <Searchbox />
        <div v-if="isLoading" class="mt-8">
            <font-awesome-icon :icon="['fas', 'angry']" class="text-white text-5xl animate-spin transform scale-150" />
            <p class="text-white font-semibold animate-bounce mt-8">Lädt Filme</p>
            </div>
        <div v-else>
            <MovieHighlightsContainer />
            <div v-if="!isLoading" class="bg-red-600 py-8 text-white text-left">
                <div class="container px-4 xl:w-10/12 mx-auto">
                    <h2 class="text-2xl font-semibold mb-2">Filme entdecken</h2>
                    <p class="text-sm">Dein Film ist nicht dabei? Einfach über die <span class="text-yellow-500 font-semibold cursor-pointer" @click="focusSearch">Suche</span> nach dem gewünschten Titel suchen und eine Bewertung abgeben</p>
                </div>
            </div>    
            <transition-group v-if="!isLoading" tag="section" class="movielist grid gap-0 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full relative container mx-auto md:mt-4 mb-16 md:px-4 xl:w-10/12" enter-active-class="duration-500 ease-out"
                enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-500 ease-in" leave-class="opacity-100" leave-to-class="opacity-0">
                <MovieListitem v-for="movie in filteredMovies" :key="movie.id" :movie="movie" :scores="triggerscores[triggerscores.map(score => score.movie_id).indexOf(movie.id)]" />
            </transition-group> 
        </div>  
    </div>
</template>

<script>
import MovieListitem from './MovieListitem.vue'
import MovieHighlightsContainer from './MovieHighlightsContainer.vue'
import Searchbox from './Searchbox.vue'

export default {
    name: 'Movielist',
    components: {
        MovieListitem,
        MovieHighlightsContainer,
        Searchbox
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
        this.$store.dispatch("setBondMovies")
        this.$store.dispatch("filterMovies")
        window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    },
    computed: {
        isLoading: function () {
            return this.$store.getters.getHighlightsLoading && this.$store.getters.getMoviesLoading 
        },
        filteredMovies: function() {
            return this.$store.getters.getFilteredMovies
        },
        triggerscores: function() {
            return this.$store.getters.getTriggerscores
        },
        movies: function() {
            return this.$store.getters.getMovies
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
            console.log(this.sortingOtion)
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
        sortMovies: function(array) {
            console.log(this.sortingOtion)
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
        }
    }
}
</script>