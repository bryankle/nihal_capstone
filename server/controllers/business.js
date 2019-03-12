const Business = require("../database/queries/business");
const cert = require("../certificate/createCertificate");
var jsonexport = require("jsonexport");
const fs = require("fs");

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
exports.deleteawards = function(req, res) {
  const award_ids = req.body.award_ids;
  console.log("my award ids", award_ids);
  Business.deleteAwards(award_ids)
    .then(result => {
      res.send(result);
    })
    .catch(reject => {
      console.log(reject);
    });
};
