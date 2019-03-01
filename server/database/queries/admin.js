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
  }
}