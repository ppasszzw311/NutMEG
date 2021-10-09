const express = require('express')
const exphbs = require('express-handlebars')

// set app
const app = express()

const menu = require('./lib/handlers')

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
app.get('/', menu.home)
app.get('/checkin', menu.checkin)
app.get('/checkout', menu.checkout)
app.get('/printAndSale', menu.printAndSale)
app.get('/checkinList', menu.checkinList)
app.get('/record', menu.record)
app.get('/manager', menu.manager)

// 自訂404
app.use(menu.notFound)

// 自訂500 網頁
app.use(menu.serverError)

if(require.main === module) {
  app.listen(port, () => console.log(`
  Express started on http://localhost:${port}; `
  ))
} else {
  module.exports = app
}
