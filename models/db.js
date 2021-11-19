const mysql = require('mysql')

const PORT = 5432

// create a connection pool
var con = mysql.createConnection({
  host: "34.81.192.26",
  user: "nut_user",
  password: "Evali9295",
  database: "bndb"
})

// open the mysql connection
con.connect(error => {
  if (error) throw error;
  console.log('success connected to the database')
});


// export
module.exports = con; 