const mysql = require("../dbcon");

module.exports = {
  createAward: function(recipientID, senderID, awardType, date, time) {
    return new Promise(function(resolve, reject) {
      const params = [recipientID, senderID, awardType, date, time];
      mysql.pool.query(
        "INSERT INTO award (recipient_id, sender_id, type, award_date, award_time) VALUES (?,?,?,?,?)",
        params,
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  },
  getEmployees: function() {
    return new Promise(function(resolve, reject) {
      mysql.pool.query(
        'SELECT user_id, CONCAT(first_name, " ", last_name) as name FROM user WHERE admin = 0',
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  },
  getAwards: function(user_id) {
    return new Promise(function(resolve, reject) {
      const params = [user_id];
      mysql.pool.query(
        `SELECT award_id, CONCAT(user.first_name, ' ', user.last_name) as name, award_type.award_name, DATE_FORMAT(award_date, "%m/%d/%Y") AS date FROM
            (award INNER JOIN user on award.recipient_id = user.user_id)
            INNER JOIN award_type on award.type = award_type.award_type_id
            WHERE award.sender_id=?
            ORDER BY award_date DESC`, params,
            function(err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })        
    },
    deleteAwards: function(award_ids) {
        return new Promise(function(resolve, reject) {
            const params = [award_ids];
            mysql.pool.query(`DELETE FROM award WHERE award_id IN (?)`, params,
            function(err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })        
    },
    insertSigPath: function(sigPath, senderID) {
        return new Promise(function(resolve, reject) {
            const params = [sigPath, senderID];
            mysql.pool.query('UPDATE user SET signature_path = ? WHERE user_id = ?', params,
            function(err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    },
    getSignature: function(user_id) {
        return new Promise(function(resolve, reject) {
            const params = [user_id];
            mysql.pool.query(
            `SELECT signature_path FROM user WHERE user_id = ?`, params,
            function(err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })        
    },
    getAllAwards: function() {
        return new Promise(function(resolve, reject) {
            mysql.pool.query(`SELECT award_id, CONCAT(u.first_name, ' ', u.last_name) as recipientName, CONCAT(u2.first_name, ' ', u2.last_name) as senderName, award_type.award_name, DATE_FORMAT(award_date, "%m/%d/%Y") AS date
            FROM user AS u
            JOIN award AS a ON a.recipient_id = u.user_id
            JOIN user as u2 ON u2.user_id = a.sender_id
            INNER JOIN award_type on a.type = award_type.award_type_id
            ORDER BY a.award_date DESC`, 
            function(err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })        
    }
}
