<template>
    <header class="w-full h-auto bg-gradient-to-b from-red-900 via-red-800 to-red-900 bg-opacity-95 z-30 shadow-md flex flex-col sticky top-0">
        <section class="container mx-auto h-full p-4 xl:w-10/12 flex justify-between relative">
            <div class="flex">
              <router-link to="/" tag="h1" class="leading-5 text-xl md:leading-6 md:text-2xl self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer">
                TRIGGERSC<angry-animation />RE  <!--<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />-->
              </router-link>
            </div>
            <div class="flex">
              <router-link to="/all" tag="a" class="animated-link text-white font-semibold self-center mr-6 sm:mr-10 hidden md:block hover:text-yellow-500 uppercase">{{ $t('header.allMovies') }}</router-link>
              <router-link to="/about" tag="a" class="animated-link text-white font-semibold self-center mr-6 sm:mr-10 hidden md:block hover:text-yellow-500 uppercase">{{ $t('header.about') }}</router-link>
              <router-link to="/faq" tag="a" class="animated-link text-white font-semibold self-center mr-6 sm:mr-10 hidden md:block hover:text-yellow-500 uppercase">{{ $t('header.faq') }}</router-link>
              <router-link to="/contact" tag="a" class="animated-link text-white font-semibold self-center mr-6 sm:mr-10 hidden md:block hover:text-yellow-500 uppercase">{{ $t('header.contact') }}</router-link>
              <button v-if="$root.$i18n.locale == 'en'" @click="switchLanguage('de')" class="mr-6 sm:mr-10"><img class="w-6" src="../assets/images/germany.svg"></button>
              <button v-if="$root.$i18n.locale == 'de'" @click="switchLanguage('en')" class="mr-6 sm:mr-10"><img class="w-6" src="../assets/images/uk.svg"></button>
              <font-awesome-icon :icon="['fas', 'search']" class="text-lg text-white mr-6 sm:mr-10 md:mr-0 self-center hover:text-yellow-500" @click="openSearch" />
              <font-awesome-icon :icon="['fas', 'bars']" class="text-white text-lg self-center md:hidden" @click="showNav = !showNav; showMenu = false; showSearch = false" />
            </div>
            
        </section>
        <transition-group  enter-active-class="duration-300 ease-out"
                enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-500 ease-in" leave-class="opacity-100" leave-to-class="opacity-0">
                 <div v-if="showNav" key="backdrop" class="fixed bg-gray-900 bg-opacity-40 top-0 left-0 w-full h-screen overflow-none"  @click="showNav = false" />
              <nav v-if="showNav" key="sidebar" class="w-80 bg-gray-900 bg-opacity-80 backdrop-blur h-screen absolute top-0 right-0 shadow-lg md:hidden z-40">
                <div class="text-right text-xl p-4 text-white">
                  <font-awesome-icon :icon="['fas', 'times']" @click="showNav = false" />
                </div>
                <div class="">
                  <router-link to="/" tag="div" class="text-2xl md:text-2xl self-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 cursor-pointer pb-12" @click="showNav = false">
                TRIGGERSC<font-awesome-icon :icon="['fas', 'angry']" class="text-white" />RE
                </router-link> 
                </div>
                
                <router-link to="/" tag="div" class="text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase"><div class="py-6" @click="showNav = false">{{ $t('header.home') }}</div></router-link>  
                
                <router-link to="/all" tag="div" class="text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase"><div class="py-6" @click="showNav = false">{{ $t('header.allMovies') }}</div></router-link>
                
                <router-link to="/faq" tag="div" class="text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase"><div class="py-6" @click="showNav = false">{{ $t('header.faq') }}</div></router-link>
                
                <router-link to="/about" tag="div" class="text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase"><div class="py-6" @click="showNav = false">{{ $t('header.about') }}</div></router-link>
                
                <router-link to="/contact" tag="div" class="text-lg text-white font-semibold self-center hover:text-yellow-500 uppercase"><div class="py-6" @click="showNav = false">{{ $t('header.contact') }}</div></router-link>
                
              </nav>
            </transition-group>
            <div v-if="showSearch" class="fixed h-screen w-screen top-0 left-0 bg-gray-900 bg-opacity-90 overflow-none backdrop-blur">
              <div class="fixed top-0 left-0 w-full h-full" @click="showSearch = false"></div>
              <transition enter-active-class="duration-300 ease-out"
                enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-500 ease-in" leave-class="opacity-100" leave-to-class="opacity-0">
                  <div class="container flex flex-col md:flex-row mx-auto md:px-4 xl:w-10/12 absolute top-1/3 left-1/2 transform -translate-x-1/2 h-32">
                    <div class="flex mx-auto mt-6 p-4 sm:px-0 h-24 self-center w-full" style="max-width: 40rem">
                      <div class="rounded-lg flex w-full justify-start">
                        <button class="flex items-center justify-center px-3 w-16 rounded-l-xl bg-yellow-500 text-white" @click="searchMovie">
                            <font-awesome-icon :icon="['fas', 'search']" class="text-lg" />
                        </button>
                        <input type="text" v-model="searchInput" v-on:keyup.enter="searchMovie" @input="resetSearchResults" class="lg:text-xl px-4 w-full outline-none transition" id="search-header" :placeholder="$t('header.searchPlaceholder')">
                        <div class="bg-white rounded-r-xl h-full w-8 flex justify-center">
                          <font-awesome-icon :icon="['fas', 'times']" class="self-center" @click="showSearch = false" />
                        </div>
                      </div>
                    </div>
                  </div>
              </transition>
            </div>
        
        
        
    </header>
</template>

<script>
import AngryAnimation from './AngryAnimation.vue'
export default {
    name: "Header",
    data() {
        return {
            showSearch: false,
            showMenu: false,
            showNav: false,
        };
    },
    computed: {
        searchInput: {
            get: function () {
                return this.$store.state.searchInput;
            },
            set: function (value) {
                this.$store.commit("setSearchInput", value);
            }
        },
        netflixFilter: {
            get: function () {
                return this.$store.state.filterMoviesByNetflix;
            },
            set: function (value) {
                this.$store.commit("setNetflixFilter", value);
                this.$store.dispatch("filterMovies");
            }
        },
        primeFilter: {
            get: function () {
                return this.$store.state.filterMoviesByPrime;
            },
            set: function (value) {
                this.$store.commit("setPrimeFilter", value);
                this.$store.dispatch("filterMovies");
            }
        },
        disneyFilter: {
            get: function () {
                return this.$store.state.filterMoviesByDisney;
            },
            set: function (value) {
                this.$store.commit("setDisneyFilter", value);
                this.$store.dispatch("filterMovies");
            }
        },
        sortingOption: {
            get: function () {
                return this.$store.state.sortingOption;
            },
            set: function (value) {
                this.$store.commit("setSortingOption", value);
                this.$store.dispatch("filterMovies");
            }
        },
        filterMin: {
            get: function () {
                return this.$store.state.filterMoviesByYearMin;
            },
            set: function (value) {
                this.$store.commit("setMovieYearMin", value);
                this.$store.dispatch("filterMovies");
            }
        },
        filterMax: {
            get: function () {
                return this.$store.state.filterMoviesByYearMax;
            },
            set: function (value) {
                this.$store.commit("setMovieYearMax", value);
                this.$store.dispatch("filterMovies");
            }
        },
        results: function () {
            return this.$store.getters.getFilteredMovies.length;
        }
    },
    methods: {
        searchMovie: function () {
            if (this.searchInput.length > 0) {
                this.$store.dispatch("setSearchResults");
                this.showSearch = false;
                this.$router.push("/search");
            }
        },
        resetSearchResults: function () {
            this.$store.dispatch("resetSearch");
        },
        resetFilter: function () {
            this.$store.dispatch("resetFilter");
            this.$store.dispatch("filterMovies");
        },
        switchLanguage: function (language) {
            this.$root.$i18n.locale = language;
            this.$store.commit("setLocale", language);
            this.$store.dispatch("setTriggerscores");
            this.$store.dispatch("setRecentRatings");
            this.$store.dispatch("setTop10Sexism");
            this.$store.dispatch("setTop10Racism");
            this.$store.dispatch("setTop10Others");
            this.$store.dispatch("setTop10Cringe");
            this.$store.dispatch("setBondMovies");
        },
        focusSearch: function () {
            document.getElementById("search-header").focus();
        },
        openSearch: function () {
            this.showSearch = !this.showSearch;
            this.showMenu = false;
            this.showNav = false;
            setTimeout(this.focusSearch, 200);
        }
    },
    components: { AngryAnimation }
}
</script>

<style>
.animated-link {
  text-decoration: none;
  position: relative;
}

.animated-link::before {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 4px;
  bottom: -4px;
  border-radius: 8px;
  left: 0;
  background-color: rgba(255, 255, 255);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.animated-link:hover::before {
  transform: scaleX(1);
  background-color: rgba(245, 158, 11);
}

</style>