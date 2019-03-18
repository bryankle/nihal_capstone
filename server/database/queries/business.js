const mysql = require("../dbcon");
const bcrypt = require("bcrypt-nodejs");

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
  //getAwardTotal--returns all award winners grouped by recipient and sorted by number of awards
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
  //getAwardTotalSent--returns award sender groubed by nam and sorted by number of awards sent
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
  getAwardRegion: function(user_id) {
    return new Promise(function(resolve, reject) {
      const params = [user_id];
      mysql.pool.query(
        `SELECT region.region_name,(count(user.region_id)) as "Region Award Recipient Totals" FROM
            region INNER JOIN user on region.region_id = user.region_id
            GROUP BY region.region_name ORDER BY count(user.region_id) desc  `,
        params,
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  },
  getUsers: function() {
    return new Promise(function(resolve, reject) {
      //const params
      mysql.pool.query(
        `SELECT user.user_id, CONCAT(user.first_name, ' ', user.last_name) as name, user.email, user.admin FROM user
           
            ORDER BY user.user_id DESC`,

        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  },
  editUser: function(
    first_name,
    last_name,
    region_id,
    email,
    password,
    admin,
    user_id
  ) {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        let hashedPassword = "";
        if (err) reject(err);
        bcrypt.hash(password, salt, null, function(err, hash) {
          if (err) reject(err);
          hashedPassword = hash;
          const params = [first_name, last_name];
          // const created_on = todaydate();
          //var created_on = today.hhgetDate();
          // console.log(created_on);
          console.log(first_name + last_name + region_id);
          mysql.pool.query(
            "SELECT * FROM `user` WHERE user_id=?",
            [user_id],
            function(err, result) {
              if (err) {
                return;
              }

              var curVals = result[0];
              mysql.pool.query(
                "UPDATE `user` SET first_name=?, last_name=?, region_id=?, email=?, password=?, admin=? WHERE user_id=? ",
                [
                  first_name || curVals.first_name,
                  last_name || curVals.last_name,
                  region_id || curVals.region_id,
                  email || curVals.email,
                  password || curVals.password,
                  admin || curVals.admin,
                  user_id
                ],
                function(err, data) {
                  if (err) reject(err);
                  resolve(data);
                }
              );
            }
          );
        });
      });
    });
  },

  deleteUsers: function(award_ids) {
    return new Promise(function(resolve, reject) {
      const params = [award_ids];
      mysql.pool.query(
        `DELETE FROM user WHERE user_id IN (?)`,
        params,
        function(err, data) {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  }
};
