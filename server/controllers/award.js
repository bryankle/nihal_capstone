const Award = require('../database/queries/award');
const cert = require('../certificate/createCertificate')

exports.createaward = function (req, res, next) {
    const recipientID = req.body.recipientID;
    const email = req.body.email;
    const awardType = req.body.awardType;
    const date = req.body.date;
    const time = req.body.time;
    const senderID = req.body.senderID;
    const sigPad64 = req.body.sigPath;

    if (sigPad64 != null) {
        let sigPath = senderID + '.png'
        console.log("sigpath name ", sigPath)
        Award.insertSigPath(sigPath, senderID)
        .then(result => {
            var fs = require('fs');
            // strip off the data: url prefix to get just the base64-encoded bytes
            var data = sigPad64.replace(/^data:image\/\w+;base64,/, "");
            var buf = new Buffer(data, 'base64');
            fs.writeFile("./certificate/signatures/" + sigPath, buf, (img) => {
                console.log("converted to image file")
            });
        })
        .catch(reject => {
            console.log(reject)
        })

    }
    Award.createAward(recipientID, senderID, awardType, date, time)
        .then(result => {
            console.log('Result of award', result);
            cert.getAwardType(result.insertId, email);
            res.send(result);
        })
        .catch(reject => {
            console.log(reject)
        })
}

exports.getemployees = function (req, res) {
    Award.getEmployees()
        .then(result => {
            console.log('Result of users', result);
            res.send(result);
        })
        .catch(reject => {
            console.log(reject)
        })
}


exports.getawards = function (req, res) {
    const user_id = req.query.user_id;
    console.log("my user id", user_id)
    Award.getAwards(user_id)
        .then(result => {
            res.send(result);
        })
        .catch(reject => {
            console.log(reject)
        })
}


exports.deleteawards = function (req, res) {
    const award_ids = req.body.award_ids;
    console.log("my award ids", award_ids)
    Award.deleteAwards(award_ids)
        .then(result => {
            res.send(result);
        })
        .catch(reject => {
            console.log(reject)
        })
}

exports.getsignature = function (req, res) {
    const user_id = req.query.user_id;
    console.log("my user id", user_id)
    Award.getSignature(user_id)
        .then(result => {
            console.log('Result of sig', result);
            res.send(result);
        })
        .catch(reject => {
            console.log(reject)
        })
}

exports.getallawards = function (req, res) {
    Award.getAllAwards()
        .then(result => {
            res.send(result);
        })
        .catch(reject => {
            console.log(reject)
        })
}