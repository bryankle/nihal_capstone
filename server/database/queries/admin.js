const mysql = require('../dbcon');
const bcrypt = require('bcrypt-nodejs');

module.exports =  {
  getAllEmployees: function() {
    return new Promise(function(resolve, reject) {
      mysql.pool.query('SELECT * FROM user WHERE admin = 0',
      function(err, data) {
          if (err) reject(err);
          resolve(data);
      })
    })
  },
  deleteEmployee: function(employeeId) {
    return new Promise(function*(resolve, reject) {
      // const params = [email];
      mysql.pool.query('DELETE * FROM user WHERE user_id=?', employeeId, 
      function(err, data) {
        if (err) reject(err);
        resolve(data);
      })
    })
  }
}


// return new Promise(function(resolve, reject) {
//   const params = [email];
//   mysql.pool.query('SELECT * FROM user WHERE email = ?', params,
//   function(err, data) {
//       if (err) reject(err);
//       resolve(data);
//   })
// })