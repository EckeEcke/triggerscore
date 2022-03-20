# Triggerscore

Triggerscore is a rating website for old movies based on how much they trigger viewers today. Users can rate movies based on four categories which add up to an overall Triggerscore. The website is built in Vue using almost exclusively Tailwind for stylings. General movie data is received via TMDB API and combined with Triggerscores received via my own backend application (Node) providing prepared data from a MySQL database.

Features included: 
- searching for movies
- rating movies
- filtering and sorting
- statistics 

Planned features:
- user reviews for movies
- adding likes and dislikes to ratings
- filter by genre
- language switch

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
