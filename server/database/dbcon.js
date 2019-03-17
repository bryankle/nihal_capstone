const mysql = require('mysql');
const pool = mysql.createConnection({
  connectionLimit: 10,
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: 'bac08bb4a926ea',
  password: '8c6dd9b0',
  database: 'heroku_d01e475a4fa2c97'
});
module.exports.pool = pool;


