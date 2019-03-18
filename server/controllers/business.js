const Business = require("../database/queries/business");
const cert = require("../certificate/createCertificate");
var jsonexport = require("jsonexport");
const fs = require("fs");
const User = require("../database/queries/user");

exports.getemployees = function(req, res) {
  Business.getEmployees()
    .then(result => {
      console.log("Result of users", result);
      res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
/*
exports.getawardsSent = function(req, res) {
  console.log("field", req.body);
  const user_id = req.query.user_id;
  console.log("my user id", user_id);
  Business.getAwardsSent(user_id)
    .then(result => {
      console.log("Result of awards", result);
      res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
*/
/*
exports.getawardsReceived = function(req, res) {
  const user_id = req.query.user_id;
  console.log("my user id", user_id);
  Business.getAwardsReceived(user_id)
    .then(result => {
      console.log("Result of awards", result);
      //res.send(result);
      res.download("./testing.csv", "testing.csv");
    })
    .catch(reject => {
      console.log(reject);
    });
};
*/
exports.getawardsSent = function(req, res) {
  console.log("field", req.body);
  const user_id = req.query.user_id;
  console.log("my user id", user_id);
  Business.getAwardsSent(user_id)
    .then(result => {
      jsonexport(result, function(err, csv) {
        if (err) return console.log(err);
        fs.writeFile("./" + "testing" + ".csv", csv, function(err) {
          if (err) {
            return console.log(err);
          }

          console.log("The file was saved!");
          res.download("./testing.csv", "testing.csv");
        });
      });
      //console.log("Result of awards", result);
      //res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
exports.getawardsReceived = function(req, res) {
  const user_id = req.query.user_id;
  console.log("my user id", user_id);
  Business.getAwardsReceived(user_id)
    .then(result => {
      jsonexport(result, function(err, csv) {
        if (err) return console.log(err);
        fs.writeFile("./" + "testing" + ".csv", csv, function(err) {
          if (err) {
            return console.log(err);
          }

          console.log("The file was saved!");
          res.download("./testing.csv", "testing.csv");
        });
        console.log("Result of awards", result);
        //res.send(result);

        //console.log(csv);
      });
      //console.log("Result of awards", result);
      //res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
exports.editUser = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const region_id = req.body.region_id;
  const admin = req.body.admin;
  const user_id = req.body.user_id;
  // TODO - Add checks for other sign up information once user schema is updated from null
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password." });
  }
  // Confirm if a user with the given email exists
  User.findByEmail(email).then(user => {
    // If a user with email does exist, return an error
    if (user.length === 1) {
      return res.status(422).send({ error: "Email is in use" });
    }
    console.log("here in the edit function", user_id);
    // If a user with email does not exist, create and save user record
    // User.create(email, password)
    Business.editUser(
      first_name,
      last_name,
      region_id,
      email,
      password,
      admin,
      user_id
    ).then(result => {
      console.log("Result of newUser", result);
      // Respond to request indicating user was created
      // TODO: Modify this later since admin is creating the account
      res.send({ token: tokenForUser(result) });
      // res.send({});
    });
  });
};

exports.getawardType = function(req, res) {
  const user_id = req.query.user_id;
  console.log("my user id", user_id);
  Business.getAwardType(user_id)
    .then(result => {
      jsonexport(result, function(err, csv) {
        if (err) return console.log(err);
        fs.writeFile("./" + "testing" + ".csv", csv, function(err) {
          if (err) {
            return console.log(err);
          }

          console.log("The file was saved!");
          res.download("./testing.csv", "testing.csv");
        });
        console.log("Result of awards", result);
        //res.send(result);

        //console.log(csv);
      });
      //console.log("Result of awards", result);
      //res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
exports.getawardMonth = function(req, res) {
  const user_id = req.query.user_id;
  console.log("my user id", user_id);
  Business.getAwardMonth(user_id)
    .then(result => {
      jsonexport(result, function(err, csv) {
        if (err) return console.log(err);
        fs.writeFile("./" + "testing" + ".csv", csv, function(err) {
          if (err) {
            return console.log(err);
          }

          console.log("The file was saved!");
          res.download("./testing.csv", "testing.csv");
        });
        console.log("Result of awards", result);
        //res.send(result);

        //console.log(csv);
      });
      //console.log("Result of awards", result);
      //res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
exports.getawardRange = function(req, res) {
  //const beginning = req.body.beginning;
  const beginning = req.query.beginning;
  //const end = req.body.end;
  const end = req.query.end;
  const award_id = req.query.award_id;
  console.log("beginning", beginning);
  console.log("end", end);
  Business.getAwardRange(beginning, end, award_id)
    .then(result => {
      jsonexport(result, function(err, csv) {
        if (err) return console.log(err);
        fs.writeFile("./" + "testing" + ".csv", csv, function(err) {
          if (err) {
            return console.log(err);
          }

          console.log("The file was saved!");
          res.download("./testing.csv", "testing.csv");
        });
        console.log("Result of awards", result);
        //res.send(result);

        //console.log(csv);
      });
      //console.log("Result of awards", result);
      //res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
exports.getawardTotal = function(req, res) {
  const user_id = req.query.user_id;
  console.log("my user id", user_id);
  Business.getAwardTotal(user_id)
    .then(result => {
      jsonexport(result, function(err, csv) {
        if (err) return console.log(err);
        fs.writeFile("./" + "testing" + ".csv", csv, function(err) {
          if (err) {
            return console.log(err);
          }

          console.log("The file was saved!");
          res.download("./testing.csv", "testing.csv");
        });
        console.log("Result of awards", result);
        //res.send(result);

        //console.log(csv);
      });
      //console.log("Result of awards", result);
      //res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
exports.getawardTotalSent = function(req, res) {
  const user_id = req.query.user_id;
  console.log("my user id", user_id);
  Business.getAwardTotalSent(user_id)
    .then(result => {
      jsonexport(result, function(err, csv) {
        if (err) return console.log(err);
        fs.writeFile("./" + "testing" + ".csv", csv, function(err) {
          if (err) {
            return console.log(err);
          }

          console.log("The file was saved!");
          res.download("./testing.csv", "testing.csv");
        });
        console.log("Result of awards", result);
        //res.send(result);

        //console.log(csv);
      });
      //console.log("Result of awards", result);
      //res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
exports.getawardRegion = function(req, res) {
  const user_id = req.query.user_id;
  console.log("my user id", user_id);
  Business.getAwardRegion(user_id)
    .then(result => {
      jsonexport(result, function(err, csv) {
        if (err) return console.log(err);
        fs.writeFile("./" + "testing" + ".csv", csv, function(err) {
          if (err) {
            return console.log(err);
          }

          console.log("The file was saved!");
          res.download("./testing.csv", "testing.csv");
        });
        console.log("Result of awards", result);
        //res.send(result);

        //console.log(csv);
      });
      //console.log("Result of awards", result);
      //res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
/*
exports.getawardType = function(req, res) {
  const user_id = req.query.user_id;
  console.log("my user id", user_id);
  Business.getAwardType(user_id)
    .then(result => {
      console.log("Result of awards", result);
      res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
*/
/*
exports.getawardMonth = function(req, res) {
  const user_id = req.query.user_id;
  console.log("my user id", user_id);
  Business.getAwardMonth(user_id)
    .then(result => {
      console.log("Result of awards", result);
      res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
*/
/*
exports.getawardRange = function(req, res) {
  //const beginning = req.body.beginning;
  const beginning = req.query.beginning;
  //const end = req.body.end;
  const end = req.query.end;
  const award_id = req.query.award_id;
  console.log("beginning", beginning);
  console.log("end", end);
  Business.getAwardRange(beginning, end, award_id)
    .then(result => {
      console.log("Result of awards", result);
      res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
*/
/*
exports.getawardTotal = function(req, res) {
  const user_id = req.query.user_id;
  console.log("my user id", user_id);
  Business.getAwardTotal(user_id)
    .then(result => {
      console.log("Result of awards", result);
      res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
*/
exports.deleteUsers = function(req, res) {
  const user_ids = req.body.user_ids;
  console.log("my award ids", user_ids);
  Business.deleteUsers(user_ids)
    .then(result => {
      res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
exports.getUsers = function(req, res) {
  const user_id = req.query.user_id;
  console.log("my user id!", user_id);
  Business.getUsers()
    .then(result => {
      res.send(result);
      console.log("Result of awards", result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
