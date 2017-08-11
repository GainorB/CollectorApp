const UsersController = require('../controllers/usersController');
const passport = require('passport');
const ValidateUser = require('../services/validateUser');

module.exports = (app) => {
    app.post('/users/new', ValidateUser.test, UsersController.newUser);
    app.post('/users/authenticate', ValidateUser.test, UsersController.LogIn);
    app.get('/users/profile/:id', passport.authenticate('jwt', {session: false }), UsersController.fetchProfile);
}