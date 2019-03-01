const Admin = require('../database/queries/admin');


exports.getAllEmployees = function(req, res, next) {
    Admin.getAllEmployees()
        .then(users => {
            console.log('Users: ', users);
            res.send(users);
        })
}

exports.deleteEmployee = function(req, res, next) {

}
