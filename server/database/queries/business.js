const mysql = require("../dbcon");

module.exports = {
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
  //Awards are sent--returns the reward type and name of all awards sent by a specific user
  getAwardsSent: function(user_id) {
    return new Promise(function(resolve, reject) {
      const params = [user_id];
      mysql.pool.query(
        `SELECT award_type.award_name, DATE_FORMAT(award_date, "%m/%d/%Y") AS date FROM
            (award INNER JOIN user on award.recipient_id = user.user_id)
            INNER JOIN award_type on award.type = award_type.award_type_id
            WHERE award.sender_id=?
            ORDER BY award_date DESC`,
        params,
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  },
  //Awards are received--returns the reward type and name of all awards received by a specific user
  getAwardsReceived: function(user_id) {
    return new Promise(function(resolve, reject) {
      const params = [user_id];
      mysql.pool.query(
        `SELECT award_type.award_name, DATE_FORMAT(award_date, "%m/%d/%Y") AS date FROM
            (award INNER JOIN user on award.sender_id = user.user_id)
            INNER JOIN award_type on award.type = award_type.award_type_id
            WHERE award.recipient_id=?
            ORDER BY award_date DESC`,
        params,
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  },
  getAwardType: function(user_id) {
    return new Promise(function(resolve, reject) {
      const params = [user_id];
      mysql.pool.query(
        `SELECT award_id, CONCAT(user.first_name, ' ', user.last_name) as name, award_type.award_name, DATE_FORMAT(award_date, "%m/%d/%Y") AS date FROM
        (award INNER JOIN user on award.recipient_id = user.user_id)
        INNER JOIN award_type on award.type = award_type.award_type_id
        WHERE award.type=?
        ORDER BY award_date DESC`,
        params,
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  },
  getAwardMonth: function(user_id) {
    return new Promise(function(resolve, reject) {
      const params = [user_id];
      mysql.pool.query(
        `SELECT award_id, CONCAT(user.first_name, ' ', user.last_name) as name, award_type.award_name, DATE_FORMAT(award_date, "%m/%d/%Y") AS date FROM
        (award INNER JOIN user on award.recipient_id = user.user_id)
        INNER JOIN award_type on award.type = award_type.award_type_id
        WHERE month(award.award_date)=?
        ORDER BY award_date DESC`,
        params,
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  },
  getAwardRange: function(beginning, end, award_id) {
    return new Promise(function(resolve, reject) {
      const beginnings = beginning;
      const ends = end;
      console.log("award id here", award_id);
      params = [beginnings, ends, award_id];
      mysql.pool.query(
        `SELECT award_id, CONCAT(user.first_name, ' ', user.last_name) as name, award_type.award_name, DATE_FORMAT(award_date, "%m/%d/%Y") AS date FROM
        (award INNER JOIN user on award.recipient_id = user.user_id)
        INNER JOIN award_type on award.type = award_type.award_type_id
        WHERE (award_date BETWEEN CAST(? AS DATE) AND CAST(? AS DATE) ) AND (award.type=?)
        ORDER BY award_date`,
        params,
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  },

  getAwardTotal: function(user_id) {
    return new Promise(function(resolve, reject) {
      const params = [user_id];
      mysql.pool.query(
        `SELECT CONCAT(user.first_name, ' ', user.last_name) as name, (count(award.recipient_id)) as "Total Awards Received" FROM
            (award INNER JOIN user on award.recipient_id = user.user_id)
            INNER JOIN award_type on award.type = award_type.award_type_id
            GROUP BY award.recipient_id ORDER BY count(award.recipient_id) desc`,
        params,
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  },
  getAwardTotalSent: function(user_id) {
    return new Promise(function(resolve, reject) {
      const params = [user_id];
      mysql.pool.query(
        `SELECT CONCAT(user.first_name, ' ', user.last_name) as name ,(count(award.sender_id)) as "Total Awards Sent" FROM
            award INNER JOIN user on award.sender_id = user.user_id
            GROUP BY name ORDER BY count(award.sender_id) desc  `,
        params,
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  },
  deleteAwards: function(award_ids) {
    return new Promise(function(resolve, reject) {
      const params = [award_ids];
      mysql.pool.query(
        `DELETE FROM award WHERE award_id IN (?)`,
        params,
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  }
};
