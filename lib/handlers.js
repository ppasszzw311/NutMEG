const menuitem = require('./menulist')

exports.home = (req, res) => res.render('home')
exports.checkin = (req, res) => res.render('checkin')
exports.checkout = (req, res) => res.render('checkout')
exports.printAndSale = (req, res) => res.render('printAndSale')
exports.checkinList = (req, res) => res.render('checkinList')
exports.record = (req, res) => res.render('record')
exports.manager = (req, res) => res.render('manager')
// exports.checkin = (req, res) => res.render('')
// exports.checkin = (req, res) => res.render('')
// exports.checkin = (req, res) => res.render('')

exports.notFound = (req, res) => res.render('404')

exports.serverError = (err, req, res, next) => res.render('500')

