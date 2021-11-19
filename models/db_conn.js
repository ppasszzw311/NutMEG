const Sequelize = require('sequelize')
const config = require('../config/development_config.js')

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mariadb',
  pool: {
    max: 5,
    min: 0,
    idle: 300000
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('connection has been established successfully')
  })
  .catch(err => {
    console.error('unable to connect to the database', err)
  })


// const User = sequelize.define('api_user', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true
//   },
//   username: Sequelize.STRING(150),
//   password: Sequelize.STRING(128),
//   email: Sequelize.STRING(254),
//   create_time: Sequelize.DATE,
// }, {
//   timestamps: false,
//   freezeTableName: true,
// });