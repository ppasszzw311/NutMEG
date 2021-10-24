// use the mariadb node.js connector
var mariadb = require('mariadb')

// create a connection pool
var pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user: 'app_user',
  password: '1234',
  database: 'nutMeg'
})

// expose a method to establish connection with MariaDB SkySQL 
module.exports = Object.freeze({
  pool: pool
})