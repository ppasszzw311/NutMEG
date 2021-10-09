const express = require('express')
const exphbs = require('express-handlebars')

// set app
const app = express()

// set port
const port = process.env.port || 3000

// set engine
app.engine('handlebars', exphbs({
  defultLayous: 'main',
}))
app.set('view engine', 'handlebars')

// 
app.use(express.static(__dirname + '/public'))

// set routing
app.get('/', (req, res) => {
  res.render('home')
})


// 自訂404
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// 自訂500 網頁
app.use((err, req, res, next) => {
  console.error(err.message) 
  res.status(500)
  res.render('500') 
})

app.listen(port, () => console.log(`Express started on http://localhost:${port}; `))