const CollectionsController = require('../controllers/collectionsController');
const passport = require('passport');

module.exports = (app) => {
    app.post('/collections/:id/new/', passport.authenticate('jwt', { session: false }), CollectionsController.NewItem);
    app.get('/collections/:id/update/info/:itemID/', passport.authenticate('jwt', { session: false }), CollectionsController.GetItemToUpdate);
    app.get('/collections/mine/:id/', passport.authenticate('jwt', { session: false }), CollectionsController.MyCollection);
    app.put('/collections/:userID/update/:postID/', passport.authenticate('jwt', { session: false }), CollectionsController.UpdateItem);
    app.delete('/collections/:userID/delete/:id/', passport.authenticate('jwt', { session: false }), CollectionsController.DeleteItem);
}