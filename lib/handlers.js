const db = require('../models/db')



// item data 商品取得
db.query('SELECT id, category, name, cost, price, unit, inbound_unit, use_yn FROM products', (err, result) => {
  if (err) throw err;
  const items = result
})


exports.login = (req, res) => res.render('login')
exports.home = (req, res) => res.render('home')
exports.checkin = (req, res) => res.render('checkin')
exports.checkout = (req, res) => res.render('checkout')
exports.printAndSale = (req, res) => res.render('printAndSale')
exports.checkinList = (req, res) => res.render('checkinList')
exports.purchase = (req, res) => res.render('purchase')
exports.manager = (req, res) => res.render('manager')
exports.saleRank = (req, res) => res.render('saleRank')
exports.monlyReport = (req, res) => res.render('monlyReport')
exports.itemData = (req, res) => {
  const user_id = req.params.user_id 
  db.query('SELECT p.id, s.id as storeId , s.name as storeName, p.category, p.name, p.cost, p.price, p.inbound_unit, p.inbound_unit_count, p.use_yn FROM products as p LEFT JOIN store as s ON p.store_id = s.id WHERE s.vendor_id = ?', user_id, (err, result) => {
    if (err) {
      res.render('/login')
    } else {
      const items = result
      res.render('itemData', { items: items}) 
    }
    
  });
}


exports.errorfix = (req, res) => res.render('errorfix')
exports.record = (req, res) => res.render('record')


exports.notFound = (req, res) => res.render('404')

exports.serverError = (err, req, res, next) => res.render('500')

