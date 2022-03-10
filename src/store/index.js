import Vue from 'vue'
import Vuex from 'vuex'

function filterByProvider(netflix, prime, disney, triggerscores,clonedArray,state){
    if (netflix || prime || disney){
        let providerIDs = []
        Promise.all(triggerscores.map(entry => 
            fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}/watch/providers?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c`)
            .then((res) => res.json())
            .then(res => {
                if(res.results.DE && res.results.DE.flatrate !== undefined){
                    if(netflix && res.results.DE.flatrate.some(provider => provider.provider_name == "Netflix")){
                        providerIDs.push(entry.movie_id)
                    }
                    if(prime && res.results.DE.flatrate.some(provider => provider.provider_name == "Amazon Prime Video")){
                        providerIDs.push(entry.movie_id)
                    }
                    if(disney && res.results.DE.flatrate.some(provider => provider.provider_name == "Disney Plus")){
                        providerIDs.push(entry.movie_id)
                    }
                }
                    
            })
            .catch(console.log("Something went wrong"))
        ))
        .then(()=>
            clonedArray = clonedArray.filter(movie => providerIDs.includes(movie.id)))
        .then(()=>
            state.commit("setFilteredMovies",clonedArray))
    }
}

function sortAtoZ(x, y) {
    const titleX = x.title ? x.title : x.original_title
    const titleY = y.title ? y.title : y.original_title
    if (titleX < titleY) { return -1 }
    if (titleX > titleY) { return 1 }
    return 0
}

function sortZtoA(x, y) {
    const titleX = x.title ? x.title : x.original_title
    const titleY = y.title ? y.title : y.original_title
    if (titleX > titleY) { return -1 }
    if (titleX < titleY) { return 1 }
    return 0
}

function sortByDateDesc(x, y) {
    return new Date(y.release_date) - new Date(x.release_date)
}

function sortByDateAsc(x, y) {
    return new Date(x.release_date) - new Date(y.release_date)
}

function sortByTsDesc(array){
    return function(x,y){
        const triggerscoreX = array[array.map(score => score.movie_id).indexOf(x.id)].rating_total
        const triggerscoreY = array[array.map(score => score.movie_id).indexOf(y.id)].rating_total
        if (triggerscoreX > triggerscoreY){ return -1}
        if (triggerscoreX < triggerscoreY){ return 1}
    }
}

function sortByTsAsc(array){
    return function(x,y){
        const triggerscoreX = array[array.map(score => score.movie_id).indexOf(x.id)].rating_total
        const triggerscoreY = array[array.map(score => score.movie_id).indexOf(y.id)].rating_total
        if (triggerscoreX < triggerscoreY){ return -1}
        if (triggerscoreX > triggerscoreY){ return 1}
    }
}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        triggerscores: [],
        movies: [],
        filteredMovies: [],
        searchInput: '',
        searchTerm: '',
        searchResults: [],
        searchError: false,
        bondMovies: [],
        bondMovieIDs: [646,657,658,660,667,668,681,253,682,691,698,699,700,707,708,709,710,714,36643,36669],
        filterMoviesByYearMin: null,
        filterMoviesByYearMax: null,
        filterMoviesByNetflix: false,
        filterMoviesByPrime: false,
        filterMoviesByDisney: false,
        sortingOption: 'a-z',
        highlightsLoading: true,
        moviesLoading: true,
    },
    mutations: {
        setTriggerscores(state,payload) {
            state.triggerscores = payload
        },
        setMovies(state,payload){
            state.movies = payload
        },
        setSearchInput(state,payload){
            state.searchInput = payload
        },
        setSearchTerm(state,payload){
            state.searchTerm = payload
        },
        setSearchResults(state,payload){
            state.searchResults = payload
        },
        setSearchError(state,payload){
            state.searchError = payload
        },
        setBondMovies(state,payload){
            state.bondMovies = payload
        },
        setMovieYearMin(state,payload){
            state.filterMoviesByYearMin = payload
        },
        setMovieYearMax(state,payload){
            state.filterMoviesByYearMax = payload
        },
        setNetflixFilter(state,payload){
            state.filterMoviesByNetflix = payload
        },
        setPrimeFilter(state,payload){
            state.filterMoviesByPrime = payload
        },
        setDisneyFilter(state,payload){
            state.filterMoviesByDisney = payload
        },
        setFilteredMovies(state,payload){
            state.filteredMovies = payload
        },
        setSortingOption(state,payload){
            state.sortingOption = payload
        },
        setHighlightsLoading(state,payload){
            state.highlightsLoading = payload
        },
        setMoviesLoading(state,payload){
            state.moviesLoading = payload
        }
    },
    actions: {
        async setTriggerscores(state){                                                  //also loads movies for now
            const scores = await fetch('https://triggerscore.herokuapp.com/')
            const triggerscores = await scores.json()
            state.commit("setTriggerscores", triggerscores)
            const loadedMovies = Promise.all(triggerscores.map(entry => 
                fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=de`)
                .then((res) => res.json())
            ))
            loadedMovies.then(res => {state.commit("setMovies", res);state.commit("setMoviesLoading",false)} )
            
        },
        setSearchInput(state, payload){
            state.commit("setSearchInput", payload)
        },
        setSearchTerm(state,payload){
            state.commit("setSearchTerm", payload)
        },
        setSearchResults(state){
            state.commit("setSearchResults", [])
            state.commit("setSearchError",false)
            state.commit("setSearchTerm",this.getters.getSearchInput)
            const searchTerm = this.state.searchTerm
            const fetchedSearchResults = fetch(`https://api.themoviedb.org/3/search/movie?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=de&page=1&include_adult=false&query=${searchTerm}`)
                                .then(res => res.json())
                                .catch()
            fetchedSearchResults.then(res => {
                let filteredResults = res.results.filter(result => {
                    return result.poster_path && result.overview && result.release_date && parseInt(result.release_date.substring(0,4)) < 2010})
                    // filter search results to not show garbage entries
            state.commit("setSearchResults",  filteredResults)
            if(this.getters.getSearchResults.length == 0){
              state.commit("setSearchError",true)
            }
            })
        },
        resetSearch(state) {
            state.commit("setSearchError",false)
        },
        setSearchError(state,payload){
            state.commit("setSearchError",payload)
        },
        async setBondMovies(state){
            const loadedMovies = Promise.all(this.getters.getBondMovieIDs.map(id => 
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=de`)
                .then((res) => res.json())
                .catch(console.log("Something went wrong"))
            ))
            loadedMovies.then(res => {state.commit("setBondMovies", res);state.commit("setHighlightsLoading",false)})
        },
        async filterMovies(state){
            let clone = [...this.state.movies]
            filterByProvider(this.state.filterMoviesByNetflix,this.state.filterMoviesByPrime,this.state.filterMoviesByDisney,this.state.triggerscores,clone,state)
            /*
            if (this.state.filterMoviesByNetflix && !this.state.filterMoviesByPrime){
                let netflixIDs = []
                Promise.all(this.state.triggerscores.map(entry => 
                    fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}/watch/providers?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c`)
                    .then((res) => res.json())
                    .then(res => {
                        if(res.results.DE && res.results.DE.flatrate !== undefined){
                            if(res.results.DE.flatrate.some(provider => provider.provider_name == "Netflix")){
                                netflixIDs.push(entry.movie_id)
                            }
                        }
                            
                    })
                    .catch(console.log("Something went wrong"))
                ))
                .then(()=>
                    clone = clone.filter(movie => netflixIDs.includes(movie.id)))
                .then(()=>
                    state.commit("setFilteredMovies",clone))
            }
            if (this.state.filterMoviesByPrime && !this.state.filterMoviesByNetflix){
                let primeIDs = []
                Promise.all(this.state.triggerscores.map(entry => 
                    fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}/watch/providers?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c`)
                    .then((res) => res.json())
                    .then(res=>{
                        if(res.results.DE && res.results.DE.flatrate !== undefined && res.results.DE.flatrate.some(provider => provider.provider_name == "Amazon Prime Video")){
                            primeIDs.push(entry.movie_id)
                        }
                    })
                    .catch(console.log("Something went wrong"))
                ))
                .then(()=>clone = clone.filter(movie => primeIDs.includes(movie.id)))
                .then(()=>state.commit("setFilteredMovies",clone))
            }
            if (this.state.filterMoviesByPrime && this.state.filterMoviesByNetflix){
                let IDs = []
                Promise.all(this.state.triggerscores.map(entry => 
                    fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}/watch/providers?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c`)
                    .then((res) => res.json())
                    .then(res=>{
                        if(res.results.DE && res.results.DE.flatrate !== undefined && res.results.DE.flatrate.some(provider => provider.provider_name == "Amazon Prime Video" || provider.provider_name == "Netflix")){
                            IDs.push(entry.movie_id)
                        }
                    })
                    .catch(console.log("Something went wrong"))
                ))
                .then(()=>clone = clone.filter(movie => IDs.includes(movie.id)))
                .then(()=>state.commit("setFilteredMovies",clone))
            }
            */
            if (!this.state.filterMoviesByPrime && !this.state.filterMoviesByNetflix){
                state.commit("setFilteredMovies",clone)
            }
            if (this.state.filterMoviesByYearMin != null && this.state.filterMoviesByYearMin >= 1900 && this.state.filterMoviesByYearMin <= 2011){
                clone = clone.filter(movie => movie.release_date > this.state.filterMoviesByYearMin)
                state.commit("setFilteredMovies",clone)
            }
            if (this.state.filterMoviesByYearMax != null && this.state.filterMoviesByYearMax >= 1900 && this.state.filterMoviesByYearMax <= 2011){
                clone = clone.filter(movie => movie.release_date < this.state.filterMoviesByYearMax)
                state.commit("setFilteredMovies",clone)
            }
            if (this.state.sortingOption == "a-z") {
                clone = clone.sort(sortAtoZ)
                state.commit("setFilteredMovies",clone)
            }
            if (this.state.sortingOption == "z-a") {
               clone = clone.sort(sortZtoA)
               state.commit("setFilteredMovies",clone)
            }
            if (this.state.sortingOption == "date-desc") {
                clone = clone.sort(sortByDateDesc)
                state.commit("setFilteredMovies",clone)
            }
            if (this.state.sortingOption == "date-asc") {
                clone = clone.sort(sortByDateAsc)
                state.commit("setFilteredMovies",clone)
            }
            if (this.state.sortingOption == "ts-desc") {
                clone = clone.sort(sortByTsDesc(this.state.triggerscores))
                state.commit("setFilteredMovies",clone)
            }
            if (this.state.sortingOption == "ts-asc") {
                clone = clone.sort(sortByTsAsc(this.state.triggerscores))
                state.commit("setFilteredMovies",clone)
            }
            

        },
        resetFilter(state){
            state.commit("setPrimeFilter", false)
            state.commit("setNetflixFilter", false)
            state.commit("setDisneyFilter", false)
            state.commit("setMovieYearMin", null)
            state.commit("setMovieYearMax", null)
        },
        setSortingOption(state,payload){
            state.commit("setSortingOption",payload)
        },
        setMovieYearMin(state,payload){
            state.commit("setMovieYearMin",payload)
        },
        setMovieYearMax(state,payload){
            state.commit("setMovieYearMax",payload)
        }
    },
    modules: {

    },
    getters: {
        getTriggerscores: state => state.triggerscores,
        getMovies: state => state.movies,
        getSearchInput: state => state.searchInput,
        getSearchTerm: state => state.searchTerm,
        getSearchResults: state => state.searchResults,
        getSearchError: state => state.searchError,
        getBondMovies: state => state.bondMovies,
        getBondMovieIDs: state => state.bondMovieIDs,
        getFilteredMovies: state => state.filteredMovies,
        getSortingOption: state => state.sortingOption,
        getHighlightsLoading: state => state.highlightsLoading,
        getMoviesLoading: state => state.moviesLoading
    }
})