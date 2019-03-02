const passport = require('passport');
const passportService = require('./services/passport');
const Admin = require('./controllers/admin');
const Authentication = require('./controllers/authentication');

module.exports = function(app) {
    const requireAuth = passport.authenticate('jwt', { session: false });
    const requireSignin = passport.authenticate('local', { session: false });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);    
    app.get('/employee', Admin.getAllEmployees);
    app.post('/delete-employee', Admin.deleteEmployee);
}