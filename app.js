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
app.use(express.json())
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
app.get('/purchase', menu.purchase)
app.get('/manager/manager', menu.manager)
app.get('/manager/saleRank', menu.saleRank)
app.get('/manager/monlyReport', menu.monlyReport)
app.get('/manager/itemData', menu.itemData)
app.get('/manager/errorfix', menu.errorfix)
app.get('/manager/record', menu.record)


// api for 明勳
app.get('/api/getCurrentWorkShiftId/:store_id', (req, res) => {
  const store_id = req.params.store_id
  const sql = 'SELECT c.user_id,c.store_id, c.class,u.name,c.shift_id FROM bndb.check_in  as c left join bndb.users as u on c.user_id =u.id and c.store_id=u.store_id left join bndb.workshift as w on c.shift_id=w.shift_id where c.store_id= ? and c.shift_id is null order by c.created_at desc limit 1';
  db.query(sql, [store_id], function (err, result) {
    if (err) throw err;
    res.json(result)
  })
})
app.get('/api/getWorkShiftProductInfo/:store_id', (req, res) => {
  const store_id = req.params.store_id
  console.log('store_id')
  const sql = 'SELECT id as product_id,name,stock,price,unit,inbound_unit_count FROM bndb.products where store_id = ? and use_yn=1';
  db.query(sql, [store_id], function (err, result) {
    if (err) throw err;
    res.json(result)
  })
})


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
