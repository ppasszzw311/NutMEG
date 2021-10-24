const express = require('express')
const db = require('./models/db')
const exphbs = require('express-handlebars')

// set port
const port = process.env.PORT|| '8080'

// set app
const app = express()
app.set('port', port)

const menu = require('./lib/handlers')



// set engine
app.engine('handlebars', exphbs({
  defultLayous: 'main',
}))
app.set('view engine', 'handlebars')

// 
app.use(express.static(__dirname + '/public'))

// db 

app.use(express.urlencoded({ extended: true}))

//wait to use
app.get('./tasks', async (req,res) => {
  try {
    const result = await db.pool.query("select * from tasks")
    res.send(result)
  } catch (err) {
    throw err
  }
})
// POST
app.post('/tasks', async (req, res) => {
    let task = req.body;
    try {
        const result = await db.pool.query("insert into tasks (description) values (?)", [task.description]);
        res.send(result);
    } catch (err) {
        throw err;
    }
});
 
app.put('/tasks', async (req, res) => {
    let task = req.body;
    try {
        const result = await db.pool.query("update tasks set description = ?, completed = ? where id = ?", [task.description, task.completed, task.id]);
        res.send(result);
    } catch (err) {
        throw err;
    } 
});
 
app.delete('/tasks', async (req, res) => {
    let id = req.query.id;
    try {
        const result = await db.pool.query("delete from tasks where id = ?", [id]);
        res.send(result);
    } catch (err) {
        throw err;
    } 
});

// set routing
app.get('/login', menu.login)
app.get('/', menu.home)
app.get('/checkin', menu.checkin)
app.get('/checkout', menu.checkout)
app.get('/printAndSale', menu.printAndSale)
app.get('/checkinList', menu.checkinList)
app.get('/record', menu.record)
app.get('/manager', menu.manager)
app.get('/manager/saleRank', menu.saleRank)
app.get('/manager/monlyReport', menu.monlyReport)
app.get('/manager/itemData', menu.itemData)
app.get('/manager/errorfix', menu.errorfix)

app.post('/login', (req, res) => {
  console.log('req.body', req.body)
  res.render('home')
})

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
