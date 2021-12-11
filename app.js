const express = require('express')
const db = require('./models/db')
const exphbs = require('express-handlebars')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// set port
const port = process.env.PORT|| '8080'

// set app
const app = express()
app.set('port', port)

const menu = require('./lib/handlers')
const api = require('./lib/api')




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
app.get('/manager/itemData/:user_id', menu.itemData)
app.get('/manager/errorfix', menu.errorfix)
app.get('/manager/record', menu.record)


// api
app.get('/api/username', api.test)
app.post('./api/apilogin', api.apilogin)

// api for 明勳
app.get('/api/getCurrentWorkShiftId/:store_id', (req, res) => {
  const store_id = req.params.store_id
  const sql = 'SELECT c.user_id,c.store_id, c.class,u.name,c.shift_id FROM check_in  as c left join users as u on c.user_id =u.id and c.store_id=u.store_id left join workshift as w on c.shift_id=w.shift_id where c.store_id= ? and c.shift_id is null order by c.created_at desc limit 1';
  db.query(sql, [store_id], function (err, result) {
    if (err) throw err;
    res.json(result)
  })
})
app.get('/api/getWorkShiftProductInfo/:store_id', (req, res) => {
  const store_id = req.params.store_id
  console.log('store_id')
  const sql = 'SELECT id as product_id,name,stock,price,unit,inbound_unit_count FROM products where store_id = ? and use_yn=1';
  db.query(sql, [store_id], function (err, result) {
    if (err) throw err;
    res.json(result)
  })
})


app.post('/login', (req, response) => {
  const idnum = req.body.idnum
  const userPassword = req.body.password
  db.query('SELECT * FROM users WHERE id = ?', idnum, (err, result) => {
    if (err) {
      console.log('SQL error', error)
    } else if (Object.keys(result).length === 0) {
      response.redirect('login')
    } else {
      const dbHashPassword = result[0].password
      bcrypt.compare(userPassword, dbHashPassword).then((res) => {
        if (res) {
          // 產生jwt
          const payload = {
            user_id: result[0].id,
            user_name: result[0].name
          }
          const token = jwt.sign({ payload, exp: Math.floor(Date.now() / 1000) + (60 * 15)}, 'nut_manager');
          console.log('req.body', req.body, 'token', token)
          response.render('home')
        } else {
          console.log('您輸入的密碼有誤')
          response.redirect('login')
        }
      })
    }
  })
})

// add user 
app.post('/api/user', (req, response) => {
  const userId = req.body.id
  db.query('SELECT * FROM users where id = ?', userId, (err, result) => {
    if (err) {
      console.log('SQL error', error)
    } else if (Object.keys(result).length === 0) {
      const usersinfo = {
        id: userId,
        password: bcrypt.hashSync(req.body.password, 10),
        userName: req.body.userName,
        store_id: req.body.store_id,
        phone: req.body.phone,
        address: req.body.address,
        salary: req.body.salary,
        role: req.body.role,
        created_at: req.body.created_at,
        active: req.body.active  
      }
      const sql ='INSERT INTO users VALUES (?,?,?,?,?,?,?,?,?,?)'
      db.query(sql, [usersinfo.id, usersinfo.password, usersinfo.userName, usersinfo.store_id, usersinfo.phone, usersinfo.address, usersinfo.salary, usersinfo.role, usersinfo.created_at, usersinfo.active], function (err, result) {
        if (err) throw err;
        console.log('success add new user')
        response.redirect('login')
      })
    } else {
      console.log('has user')
      response.redirect('login')
    }
  })
})

// change password
app.post('/api/forgetPassword', (req, res) => {
  const userId = req.body.id
  const password = req.body.password
  db.query('SELECT * FROM users where id = ?', userId, (err, result) => {
    if (err) {
      res.redirect('404')
    } else if (Object.keys(result).length === 0) {
      console.log('no id')
    } else {
      const password1 = bcrypt.hashSync(password, 10)
      db.query('update users set password = ? where id = ?', [password1, userId], (err, ress) => {
        if (err) throw err;
        console.log('password has change sucess?')
      })
    }
  })
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
