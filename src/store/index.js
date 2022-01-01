import Vue from 'vue'
import Vuex from 'vuex'

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
            console.log(this.state.filterMoviesByNetflix, this.state.filterMoviesByPrime)
            if (this.state.filterMoviesByNetflix && !this.state.filterMoviesByPrime){
                let netflixIDs = []
                Promise.all(this.state.triggerscores.map(entry => 
                    fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}/watch/providers?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c`)
                    .then((res) => res.json())
                    .then(res => {
                        console.log(res)
                        if(res.results.DE.flatrate && res.results.DE.flatrate.some(provider => provider.provider_name == "Netflix")){
                            netflixIDs.push(entry.movie_id)
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
                        console.log(res)
                        if(res.results.DE.flatrate && res.results.DE.flatrate.some(provider => provider.provider_name == "Amazon Prime Video")){
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
                        if(res.results.DE.flatrate && res.results.DE.flatrate.some(provider => provider.provider_name == "Amazon Prime Video" || provider.provider_name == "Netflix")){
                            IDs.push(entry.movie_id)
                        }
                    })
                    .catch(console.log("Something went wrong"))
                ))
                .then(()=>clone = clone.filter(movie => IDs.includes(movie.id)))
                .then(()=>state.commit("setFilteredMovies",clone))
            }
            if (!this.state.filterMoviesByPrime && !this.state.filterMoviesByNetflix){
                state.commit("setFilteredMovies",clone)
            }
            if (this.state.filterMoviesByYearMin != null && this.state.filterMoviesByYearMin >= 1900 && this.state.filterMoviesByYearMin <= 2011){
                clone = clone.filter(movie => movie.release_date > this.state.filterMoviesByYearMin)
                console.log(clone)
                state.commit("setFilteredMovies",clone)
            }
            if (this.state.filterMoviesByYearMax != null && this.state.filterMoviesByYearMax >= 1900 && this.state.filterMoviesByYearMax <= 2011){
                clone = clone.filter(movie => movie.release_date < this.state.filterMoviesByYearMax)
                state.commit("setFilteredMovies",clone)
            }
            

        },
        resetFilter(state){
            state.commit("setPrimeFilter", false)
            state.commit("setNetflixFilter", false)
            state.commit("setMovieYearMin", null)
            state.commit("setMovieYearMax", null)
            state.commit("setFilteredMovies", this.state.movies)
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