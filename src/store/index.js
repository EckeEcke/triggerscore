import Vue from 'vue'
import Vuex from 'vuex'

async function filterByProvider(netflix, prime, disney, triggerscores,array,locale,state){
    let clonedArray = [...array]
    if (netflix || prime || disney){
        let providerIDs = []
        let providerRegion = locale.toUpperCase()
        if(providerRegion == "EN"){
            providerRegion = "GB"
        }
        Promise.all(triggerscores.map(entry => 
            fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}/watch/providers?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c`)
            .then((res) => res.json())
            .then(res => {
                if(res.results[providerRegion] && res.results[providerRegion].flatrate !== undefined){
                    if(netflix && res.results[providerRegion].flatrate.some(provider => provider.provider_name == "Netflix")){
                        providerIDs.push(entry.movie_id)
                    }
                    if(prime && res.results[providerRegion].flatrate.some(provider => provider.provider_name == "Amazon Prime Video")){
                        providerIDs.push(entry.movie_id)
                    }
                    if(disney && res.results[providerRegion].flatrate.some(provider => provider.provider_name == "Disney Plus")){
                        providerIDs.push(entry.movie_id)
                    }
                }
                    
            })
            .catch(console.log("Something went wrong"))
        ))
        .then(()=>
            clonedArray = clonedArray.filter(movie => providerIDs.includes(movie.id)))
        .then(()=>{
            state.commit("setFilteredMovies",clonedArray);
            state.commit("setIsFiltering",false)
        })  
    }
    else {
        state.commit("setFilteredMovies",clonedArray)
        state.commit("setIsFiltering",false)
    }
}

function filterByYear(filterMax,filterMin,array,state){
    let clonedArray = [...array]
    if (filterMin != null && filterMin >= 1900 && filterMin <= 2011){
        clonedArray = clonedArray.filter(movie => movie.release_date >= filterMin)
    }
    if (filterMax != null && filterMax >= 1900 && filterMax <= 2011){
        clonedArray = clonedArray.filter(movie => movie.release_date <= filterMax + 1)      
    }
    state.commit("setFilteredMovies",clonedArray)
}

function sortMovies(sortingOption,array,triggerscores,shownScore,state){
    let clonedArray = [...array]
    if (sortingOption == "a-z") {
        clonedArray = clonedArray.sort(sortAtoZ)      
    }
    if (sortingOption == "z-a") {
       clonedArray = clonedArray.sort(sortZtoA)
    }
    if (sortingOption == "date-desc") {
        clonedArray = clonedArray.sort(sortByDateDesc)
    }
    if (sortingOption == "date-asc") {
        clonedArray = clonedArray.sort(sortByDateAsc)
    }
    if (sortingOption == "ts-desc") {
        clonedArray = clonedArray.sort(sortByTsDesc(triggerscores,shownScore))
    }
    if (sortingOption == "ts-asc") {
        clonedArray = clonedArray.sort(sortByTsAsc(triggerscores,shownScore))
    }
    state.commit("setFilteredMovies",clonedArray)
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

function sortByTsDesc(array,key){
    return function(x,y){
        const triggerscoreX = array[array.map(score => score.movie_id).indexOf(x.id)][key]
        const triggerscoreY = array[array.map(score => score.movie_id).indexOf(y.id)][key]
        if (triggerscoreX > triggerscoreY){ return -1}
        if (triggerscoreX < triggerscoreY){ return 1}
    }
}

function sortByTsAsc(array,key){
    return function(x,y){
        const triggerscoreX = array[array.map(score => score.movie_id).indexOf(x.id)][key]
        const triggerscoreY = array[array.map(score => score.movie_id).indexOf(y.id)][key]
        if (triggerscoreX < triggerscoreY){ return -1}
        if (triggerscoreX > triggerscoreY){ return 1}
    }
}

function filterByScore(array,triggerscores,min,max,shownScore,state){
    let clonedArray = [...array]
    let clonedScores = [...triggerscores]
    clonedScores = clonedScores.filter(score => {
        return score[shownScore] >= min && score[shownScore] <= max
    })
    clonedArray = clonedArray.filter(movie=>{
        return clonedScores.map(score => score.movie_id).indexOf(movie.id) > -1
    })
    state.commit("setFilteredMovies",clonedArray)
}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        triggerscores: [],
        movies: [],
        recentRatings: [],
        recentScores: [],
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
        shownScore: "rating_total",
        top10Sexism: [],
        top10Racism: [],
        top10Others: [],
        top10Cringe: [],
        stats: {},
        minScore: 0,
        maxScore: 10,
        isFiltering: false,
        locale: "en"
    },
    mutations: {
        setTriggerscores(state,payload) {
            state.triggerscores = payload
        },
        setMovies(state,payload){
            state.movies = payload
        },
        setRecentRatings(state,payload){
            state.recentRatings = payload
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
        },
        setShownScore(state,payload){
            state.shownScore = payload
        },
        setTop10Sexism(state,payload){
            state.top10Sexism = payload
        },
        setTop10Racism(state,payload){
            state.top10Racism = payload
        },
        setTop10Others(state,payload){
            state.top10Others = payload
        },
        setTop10Cringe(state,payload){
            state.top10Cringe = payload
        },
        setRecentScores(state,payload){
            state.recentScores = payload
        },
        setStats(state,payload){
            state.stats = payload
        },
        setMinScore(state,payload){
            state.minScore = payload
        },
        setMaxScore(state,payload){
            state.maxScore = payload
        },
        setIsFiltering(state,payload){
            state.isFiltering = payload
        },
        setLocale(state,payload){
            state.locale = payload
        }
    },
    actions: {
        async setTriggerscores(state){                                                  //also loads movies for now
            const scores = await fetch('https://triggerscore.herokuapp.com/')
            const triggerscores = await scores.json()
            state.commit("setTriggerscores", triggerscores)
            const loadedMovies = Promise.all(triggerscores.map(entry => 
                fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${this.getters.getLocale}`)
                .then((res) => res.json())
            ))
            loadedMovies.then(res => {state.commit("setMovies", res);state.commit("setMoviesLoading",false)} )
            
        },
        async setRecentRatings(state){
            const scores = await fetch('https://triggerscore.herokuapp.com/recentratings')
            const ratings = await scores.json()
            state.commit("setRecentScores",ratings)
            const recentRatings = Promise.all(ratings.map(entry => 
                fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${this.getters.getLocale}`)
                .then((res) => res.json())
            ))
            recentRatings.then(res => {state.commit("setRecentRatings", res);state
        } )
        },
        async setTop10Sexism(state){
            const scores = await fetch('https://triggerscore.herokuapp.com/top10-sexism')
            const top10 = await scores.json()
            const loadedTop10 = Promise.all(top10.map(entry => 
                fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${this.getters.getLocale}`)
                .then((res) => res.json())
            ))
            loadedTop10.then(res => {state.commit("setTop10Sexism", res)} )
        },
        async setTop10Racism(state){
            const scores = await fetch('https://triggerscore.herokuapp.com/top10-racism')
            const top10 = await scores.json()
            const loadedTop10 = Promise.all(top10.map(entry => 
                fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${this.getters.getLocale}`)
                .then((res) => res.json())
            ))
            loadedTop10.then(res => {state.commit("setTop10Racism", res)} )
        },
        async setTop10Others(state){
            const scores = await fetch('https://triggerscore.herokuapp.com/top10-others')
            const top10 = await scores.json()
            const loadedTop10 = Promise.all(top10.map(entry => 
                fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${this.getters.getLocale}`)
                .then((res) => res.json())
            ))
            loadedTop10.then(res => {state.commit("setTop10Others", res)} )
        },
        async setTop10Cringe(state){
            const scores = await fetch('https://triggerscore.herokuapp.com/top10-cringe')
            const top10 = await scores.json()
            const loadedTop10 = Promise.all(top10.map(entry => 
                fetch(`https://api.themoviedb.org/3/movie/${entry.movie_id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${this.getters.getLocale}`)
                .then((res) => res.json())
            ))
            loadedTop10.then(res => {state.commit("setTop10Cringe", res)} )
        },
        async setStats(state){
            const response = await fetch('https://triggerscore.herokuapp.com/stats')
            const stats = await response.json()
            state.commit("setStats",stats)
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
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3e92da81c3e5cfc7c33a33d6aa2bad8c&language=${this.getters.getLocale}`)
                .then((res) => res.json())
                .catch(console.log("Something went wrong"))
            ))
            loadedMovies.then(res => {state.commit("setBondMovies", res);state.commit("setHighlightsLoading",false)})
        },
        async filterMovies(state){
            state.commit("setIsFiltering",true)
            sortMovies(this.state.sortingOption,this.state.movies,this.state.triggerscores,this.getters.getShownScore,state)
            filterByYear(this.state.filterMoviesByYearMax,this.state.filterMoviesByYearMin,this.state.filteredMovies,state)
            filterByScore(this.state.filteredMovies,this.state.triggerscores,this.state.minScore,this.state.maxScore,this.state.shownScore,state)  
            filterByProvider(this.state.filterMoviesByNetflix,this.state.filterMoviesByPrime,this.state.filterMoviesByDisney,this.state.triggerscores,this.state.filteredMovies,this.state.locale,state)
        },
        resetFilter(state){
            state.commit("setPrimeFilter", false)
            state.commit("setNetflixFilter", false)
            state.commit("setDisneyFilter", false)
            state.commit("setMovieYearMin", null)
            state.commit("setMovieYearMax", null)
            state.commit("setMinScore",0)
            state.commit("setMaxScore",10)
        },
        setSortingOption(state,payload){
            state.commit("setSortingOption",payload)
        },
        setMovieYearMin(state,payload){
            state.commit("setMovieYearMin",payload)
        },
        setMovieYearMax(state,payload){
            state.commit("setMovieYearMax",payload)
        },
        setShownScore(state,payload){
            state.commit("setShownScore", payload)
        },
        setMinScore(state,payload){
            state.commit("setMinScore",payload)
        },
        setMaxScore(state,payload){
            state.commit("setMaxScore",payload)
        },
        setIsFiltering(state,payload){
            state.commit("setIsFiltering",payload)
        },
        setLocale(state,payload){
            state.commit("setLocale",payload)
        }
    },
    modules: {

    },
    getters: {
        getTriggerscores: state => state.triggerscores,
        getMovies: state => state.movies,
        getRecentRatings: state => state.recentRatings,
        getSearchInput: state => state.searchInput,
        getSearchTerm: state => state.searchTerm,
        getSearchResults: state => state.searchResults,
        getSearchError: state => state.searchError,
        getBondMovies: state => state.bondMovies,
        getBondMovieIDs: state => state.bondMovieIDs,
        getFilteredMovies: state => state.filteredMovies,
        getSortingOption: state => state.sortingOption,
        getHighlightsLoading: state => state.highlightsLoading,
        getMoviesLoading: state => state.moviesLoading,
        getShownScore: state => state.shownScore,
        getTop10Sexism: state => state.top10Sexism,
        getTop10Racism: state => state.top10Racism,
        getTop10Others: state => state.top10Others,
        getTop10Cringe: state => state.top10Cringe,
        getRecentScores: state => state.recentScores,
        getStats: state => state.stats,
        getIsFiltering: state => state.isFiltering,
        getLocale: state => state.locale
    }
})