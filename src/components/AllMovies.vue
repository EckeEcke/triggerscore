<template>
    <div class="bg-gray-900">
        <Searchbox />
        <div v-if="isLoading" class="py-32 lg:py-48">
            <font-awesome-icon :icon="['fas', 'angry']" class="text-white text-5xl animate-spin transform scale-150" />
            <p class="text-white font-semibold animate-bounce mt-8">{{  $t('general.loadMovies')}}</p>
        </div>
        <div v-else>
            <div class="container px-4 xl:w-10/12 mx-auto flex flex-col mt-8 mb-4">
                <div class="text-left xl:hidden">
                    <h2 class="text-2xl md:text-3xl font-semibold mb-2 text-yellow-500 ">{{ $t('index.headline') }}</h2>
                    <p class="text-sm text-white ">{{ $t('index.intro1') }}<span class="text-yellow-500 transition hover:text-yellow-600 font-semibold cursor-pointer" @click="focusSearch">{{ $t('index.search') }}</span>{{ $t('index.intro2') }}</p>
                </div>
                <div class="ml-auto mt-4 -mr-3 sm:mr-0 xl:hidden">
                    <button class="bg-yellow-500 text-white uppercase disabled:opacity-50 font-semibold p-3 rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-600" @click="showMenu = !showMenu"><font-awesome-icon class="mr-2" :icon="['fas', 'filter']" />Filter</button>
                </div>  
            </div>
            <Filtermenu class="hidden xl:block mt-4" />
            <div v-if="isFiltering" class="py-32 lg:py-48">
                <font-awesome-icon :icon="['fas', 'angry']" class="text-white text-5xl animate-spin transform scale-150" />
                <p class="text-white font-semibold animate-bounce mt-8">{{ $t('general.loadMovies') }}</p>
            </div>
            <section v-if="!isLoading && filteredMovies.length > 0 && !isFiltering" class="movielist grid gap-0 md:gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full relative container mx-auto md:mt-2 sm:pb-8 md:px-4 xl:w-10/12">
                <MovieListitem v-for="movie in loadedMovies" :key="movie.id" :movie="movie" :scores="triggerscores[triggerscores.map(score => score.movie_id).indexOf(movie.id)]" />
            </section>
            <div class="py-32" v-if="!isLoading && filteredMovies.length == 0 && !isFiltering">
                <p class="text-white text-xl font-semibold animate-bounce mb-4">{{ $t('search.noResults') }}</p>
                <button class="font-semibold bg-yellow-500 p-3 shadow text-white uppercase rounded-lg" @click="resetFilter">{{ $t('filter.resetFilter') }}</button>
            </div>
            <transition v-if="showMenu" enter-active-class="duration-100 ease-out"
                enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-100 ease-in" leave-class="opacity-100" leave-to-class="opacity-0">
                <Sidebar @close="showMenu = !showMenu"/>
            </transition>
        </div>
        <div v-if="totalPages > 1" class="flex gap-1 justify-center my-8 md:mt-0">
            <button 
                v-for="index in totalPages" 
                v-bind:key="index" 
                @click="setPage((index-1)*24,(index-1)*24+24)"
                class="text-lg text-black px-4 py-2 font-semibold bg-opacity-90 hover:text-yellow-700 hover:bg-white"
                :class="start == Math.round((index-1)*24) ? 'bg-white' : 'bg-gray-500'"
                >
                {{index}}
            </button>
        </div>
        
    </div>
</template>

<script>
import MovieListitem from './MovieListitem.vue'
import Searchbox from './Searchbox.vue'
import Sidebar from './Sidebar.vue'
import Filtermenu from './Filtermenu.vue'

export default {
    name: 'AllMovies',
    components: {
        MovieListitem,
        Searchbox,
        Sidebar,
        Filtermenu
    },
    data() {
        return {
            showNavbar: true,
            lastScrollPosition: 0,
            showMenu: false,
            loadMoviesAmount: 24,
            start: 0,
            end: 24
        }
    },
    mounted: function() {
        this.$store.dispatch("setTriggerscores")
        this.$store.dispatch("filterMovies")
        this.$store.dispatch("setRecentRatings")
        this.$store.dispatch("setBondMovies")
    },
    computed: {
        totalPages: function() {
            return Math.round(this.filteredMovies.length / 24)
        },
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
        loadedMovies: function() {
            return [...this.filteredMovies].filter((movie,index) => index >= this.start && index < this.end)
        },
        triggerscores: function() {
            return this.$store.getters.getTriggerscores
        },
        movies: function() {
            return this.$store.getters.getMovies
        },
        shownScore: {
            get: function(){
                return this.$store.state.shownScore
            },
            set: function(value){
                this.$store.commit("setShownScore",value)
                this.$store.dispatch("filterMovies")
            }
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
        isFiltering: function(){
           return this.$store.getters.getIsFiltering
        }
      
    },
    watch: {
        movies: function() {
            this.$store.dispatch("filterMovies")
        }
    },
    methods: {
 
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
        },
        setPage(start,end) {
            this.start = start
            this.end = end
        }
    }
}
</script>
