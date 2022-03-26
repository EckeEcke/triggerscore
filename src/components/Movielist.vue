<template>
    <div class="bg-gray-900">
        <Searchbox showTitle />
        <div v-if="isLoading" class="py-32 lg:py-48">
            <font-awesome-icon :icon="['fas', 'angry']" class="text-white text-5xl animate-spin transform scale-150" />
            <p class="text-white font-semibold animate-bounce mt-8">Lädt Filme</p>
        </div>
        <div v-else>
            <MovieHighlightsContainer 
                v-if="!isLoading" 
                :movies="bondMovies" 
                shownScore="rating_total"
                title="James Bond Special" 
                subTitle="Lizenz zum Triggern: Film anklicken und Triggerscore vergeben"
                moreSpacing
            />
            <section class="sm:mb-12">
                <div class="py-12 sm:mb-12" style="background-image: linear-gradient(rgba(220, 0, 0, 0.6), rgba(220, 0, 100, 0.6))">
                    <h2 class="text-white text-xl md:text-3xl text-left font-semibold px-4  container mx-auto xl:w-10/12 mb-2">Neueste <span class="text-xl md:text-3xl self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RES
              </span></h2>
              <p class="text-sm text-white font-semibold text-left px-4  container mx-auto xl:w-10/12 ">Kürzlich abgegebene Bewertungen</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:gap-5 justify-content-start container mx-auto xl:w-10/12 sm:px-4 ">
                    <RecentRatingsItem v-for="(rating,index) in recentRatings" :key="index" :movie="rating" :scores="recentScores[index]" />
                </div>
                
            </section>
            <div v-if="!isLoading" class="py-12 text-left" style="background-image: linear-gradient(rgba(220, 0, 0, 0.6), rgba(220, 0, 100, 0.6))">
                <div class="container px-4 xl:w-10/12 mx-auto">
                    <h2 class="text-xl md:text-3xl font-semibold mb-2 text-white "><span class="self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
              </span> TOP 10s</h2>
                    <p class="text-sm text-white font-semibold">Trigger-happy: Filme mit höchsten Triggerscores</p>
                </div> 
            </div>
            <MovieHighlightsContainer 
                v-if="!isLoading" 
                :movies="top10Sexism"  
                shownScore="rating_sexism"
                title="Top 10 Sexistische Filme"
                subTitle="It is a man's world: Filme mit höchsten Sexismus-Ratings"
                showBorder
            />
            <MovieHighlightsContainer 
                v-if="!isLoading" 
                :movies="top10Racism"  
                shownScore="rating_racism"
                title="Top 10 Rassistische Filme"
                subTitle="Für alte weiße Männer: Filme mit höchsten Rassismus-Ratings"
                showBorder
            />
            <MovieHighlightsContainer 
                v-if="!isLoading" 
                :movies="top10Others"  
                shownScore="rating_others"
                title="Top 10 Sonstige Filme "
                subTitle="Diese Filme triggern. Aus Gründen: Filme mit höchsten Sonstige-Ratings"
                showBorder
            />
            <MovieHighlightsContainer 
                v-if="!isLoading" 
                :movies="top10Cringe"  
                shownScore="rating_cringe"
                title="Top 10 Cringe Filme"
                subTitle="Diese Filme sind einfach nur zum Fremdschämen: Filme mit höchsten Cringe-Ratings"
            />
            <div v-if="!isLoading" class="py-12 text-left" style="background-image: linear-gradient(rgba(220, 0, 0, 0.6), rgba(220, 0, 100, 0.6))">
                <div class="container px-4 xl:w-10/12 mx-auto">
                    <h2 class="text-xl md:text-3xl font-semibold mb-2 text-white "><span class="self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
              </span> Stats</h2>
                    <p class="text-sm text-white font-semibold">Statistiken für Zahlenbegeisterte</p>
                </div> 
            </div>
            <div class="sm:py-8 sm:px-4 container xl:w-10/12 mx-auto">
                <Stats />
            </div>            
        </div>
    </div>
</template>

<script>
import MovieHighlightsContainer from './MovieHighlightsContainer.vue'
import Searchbox from './Searchbox.vue'
import RecentRatingsItem from './RecentRatingsItem.vue'
import Stats from './Stats.vue'

export default {
    name: 'Movielist',
    components: {
        MovieHighlightsContainer,
        Searchbox,
        RecentRatingsItem,
        Stats
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
        this.$store.dispatch("setTop10Sexism")
        this.$store.dispatch("setTop10Racism")
        this.$store.dispatch("setTop10Others")
        this.$store.dispatch("setTop10Cringe")
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
        bondMovies: function() {
        return this.$store.getters.getBondMovies
        },
        recentRatings: function() {
            return this.$store.getters.getRecentRatings
        },
        recentScores: function(){
            return this.$store.getters.getRecentScores
        },
        top10Sexism: function() {
            return this.$store.getters.getTop10Sexism
        },
        top10Racism: function() {
            return this.$store.getters.getTop10Racism
        },
        top10Others: function() {
            return this.$store.getters.getTop10Others
        },
        top10Cringe: function() {
            return this.$store.getters.getTop10Cringe
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
        }
    }
}
</script>