<template>
    <div class="bg-gray-900">
        <Searchbox v-if="!isLoading" showTitle />
        <LoadingAnimation v-if="isLoading" />
        <div v-else>
            <MovieHighlightsContainer 
                v-if="!isLoading" 
                :movies="bondMovies" 
                shownScore="rating_total"
                :title="$t('highlights.headline1')" 
                :subTitle="$t('highlights.copy1')"
                moreSpacing
            />
            <section class="sm:mb-12 px-0 sm:px-4  container mx-auto xl:w-10/12">
                <div class="py-16 md:py-20 sm:mb-12 bg-cover bg-center px-4 rounded" :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(153,27,27,0.5), rgba(153,27,27,0.6)),url(' + require('@/assets/images/backdrop-ballermann6.jpg') + ')'}">
                    <h2 class="text-white text-2xl sm:text-4xl text-left font-semibold mb-2 uppercase">{{ $t('general.newest') }} <span class="text-2xl sm:text-4xl self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RES
              </span></h2>
              <p class="text-base md:text-lg text-white font-semibold text-left">{{ $t('general.recentRatings') }}</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 sm:gap-4 justify-content-start">
                    <RecentRatingsItem v-for="(rating,index) in recentRatings" :key="index" :movie="rating" :scores="recentScores[index]" />
                </div>
                
            </section>
            <section>
                <div class="container xl:w-10/12 mx-auto sm:px-4 mb-3 sm:mb-6">
                    <div v-if="!isLoading" class="py-16 md:py-20 text-left bg-cover bg-center px-4 rounded" :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(153,27,27,0.5), rgba(153,27,27,0.6)),url(' + require('@/assets/images/backdrop-backtothefuture.jpg') + ')'}">
                        <div class="">
                            <h2 class="text-2xl sm:text-4xl font-semibold mb-2 text-white uppercase"><span class="self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                        TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                    </span> {{ $t('general.top10') }}</h2>
                            <p class="text-base md:text-lg text-white font-semibold">{{ $t('general.top10Copy') }}</p>
                        </div> 
                    </div>
                </div>
                
                <MovieHighlightsContainer 
                    v-if="!isLoading" 
                    :movies="top10Sexism"  
                    shownScore="rating_sexism"
                    :title="$t('highlights.headline2')"
                    :subTitle="$t('highlights.copy2')"
                />
                <MovieHighlightsContainer 
                    v-if="!isLoading" 
                    :movies="top10Racism"  
                    shownScore="rating_racism"
                    :title="$t('highlights.headline3')"
                    :subTitle="$t('highlights.copy3')"
                    showBorder
                />
                <MovieHighlightsContainer 
                    v-if="!isLoading" 
                    :movies="top10Others"  
                    shownScore="rating_others"
                    :title="$t('highlights.headline4')"
                    :subTitle="$t('highlights.copy4')"
                    showBorder
                />
                <MovieHighlightsContainer 
                    v-if="!isLoading" 
                    :movies="top10Cringe"  
                    shownScore="rating_cringe"
                    :title="$t('highlights.headline5')"
                    :subTitle="$t('highlights.copy5')"
                    showBorder
                />
            </section>
            <section class="sm:px-4 container xl:w-10/12 mx-auto">
                <div v-if="!isLoading" class="py-16 md:py-20 text-left bg-center bg-cover px-4 rounded sm:my-6"  :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(153,27,27,0.5), rgba(153,27,27,0.6)),url(' + require('@/assets/images/backdrop-jurassicpark.jpg') + ')'}">
                    <div class="">
                        <h2 class="text-2xl sm:text-4xl font-semibold mb-2 text-white uppercase">
                            <span class="self-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                            </span> 
                            {{ $t('general.stats') }}
                        </h2>
                        <p class="text-base md:text-lg text-white font-semibold">{{ $t('general.statsCopy') }}</p>
                    </div> 
                </div>
                <div class="sm:pt-8">
                    <Stats />
                </div> 
            </section>
            <section class="container xl:w-10/12 mx-auto px-4 my-6">
                <div class="bg-opacity-90 py-16">
                    <h2 class="text-white text-xl font-semibold my-4">{{ $t('general.discoverMoreMovies') }}</h2>
                    <router-link to="/all" tag="button" class="bg-yellow-500 transition hover:bg-yellow-600 p-3 rounded-lg text-white font-semibold uppercase my-4">{{ $t('header.allMovies') }}</router-link>
                </div>  
            </section>
                       
        </div>
    </div>
</template>

<script>
import MovieHighlightsContainer from './MovieHighlightsContainer.vue'
import Searchbox from './Searchbox.vue'
import RecentRatingsItem from './RecentRatingsItem.vue'
import Stats from './Stats.vue'
import LoadingAnimation from './LoadingAnimation.vue'

export default {
    name: 'Movielist',
    components: {
    MovieHighlightsContainer,
    Searchbox,
    RecentRatingsItem,
    Stats,
    LoadingAnimation
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