const db =require('../models/db')

// db 

// test 
exports.test = (req, res) => {
  let test = [{
    test: true
  }]
  res.json(test)
}
// login 
exports.apilogin = (req, res) => {
  const idnum = req.body.idnum
  const userPassword = req.body.password
  let returnMessage = [{
    message: "i",
    token: "zz"
  }]
  // db.query('SELECT * FROM nutMeg.users WHERE id = ?', idnum, (err, result) => {
  //   if (err) {
  //     console.log('SQL error', error)
  //   } else if (Object.keys(result).length === 0) {
  //     returnMessage.message = "查無帳號"
  //   } else {
  //     const dbHashPassword = result[0].password
  //     bcrypt.compare(userPassword, dbHashPassword).then((res) => {
  //       if (res) {
  //         // 產生jwt
  //         const payload = {
  //           user_id: result[0].id,
  //           user_name: result[0].name
  //         }
  //         const token = jwt.sign({ payload, exp: Math.floor(Date.now() / 1000) + (60 * 15)}, 'nut_manager');
  //         let returnMessage = [{
  //           message: "成功登入",
  //           token: token
  //         }]
  //         response.json(returnMessage)
  //       } else {
  //         let returnMessage = [{
  //           message: '密碼錯誤'
  //         }]
  //         response.json(returnMessage)
  //       }
  //     })
  //   }
  // })
  res.json(returnMessage)
};


