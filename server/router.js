const Authentication = require('./controllers/authentication');
const Award = require('./controllers/award');
const passportService = require('./services/passport');
const passport = require('passport');

module.exports = function(app) {
    const requireAuth = passport.authenticate('jwt', { session: false });
    const requireSignin = passport.authenticate('local', { session: false });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);    
    app.get('/employee', Authentication.getEmployee)
    app.post('/createaward', Award.createaward);
    app.get('/getemployees', Award.getemployees);
    app.get('/getawards', Award.getawards);
    app.get('/getsignature', Award.getsignature);
    app.delete('/deleteawards', Award.deleteawards);
    app.get('/getallawards', Award.getallawards);
    app.get('/getfullname', Authentication.getfullname);
    app.put('/changename', Authentication.changename);
}