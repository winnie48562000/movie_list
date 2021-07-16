// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')
const app = express()
const port = 3000

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) => {
  // console.log('req keyword', req.query.keyword)
  const keyword = req.query.keyword.toLowerCase()
  const movies = movieList.results.filter( movie => {
    return movie.title.toLowerCase().includes(keyword)
  })
  res.render('index', { movies: movies, keyword: keyword })
})

// params 動態路由
app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find( movie => movie.id.toString() === req.params.movie_id )
    res.render('show', { movie: movie })
  })

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

//static files
