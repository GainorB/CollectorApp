const Collections = require('../models/collections');
const jwt = require('jsonwebtoken');


module.exports = {

    // CREATE NEW ITEM
    NewItem(req, res, next){
        // ERROR CHECKING
        // if(Object.values(newPost).indexOf('') >= 0){

            // res.status(400).json({ success: false, message: 'Please fill in all fields' });
        
        // } else {
            // ADD NEW POST
            Collections.new(req.body, parseInt(req.params.id))
                .then(post => {
                    
                    Collections.get(parseInt(req.params.id))
                        .then(collection => {
                            res.status(201).json({ collection, success: true, message: 'Post added successfully' });
                        });
                })
                .catch(err => {
                    // console.error(err);
                    res.status(400).json({ success: false, message: `Please fill in ${err.column}` }); 
                });
    },

    // GET ITEM TO UPDATE
    GetItemToUpdate(req, res, next){
        Collections.info(parseInt(req.params.id), parseInt(req.params.itemID))
            .then(info => {
                res.status(200).json({
                    success: true,
                    message: 'Item to update received',
                    info
                });
            });
    },

    // GET MY COLLECTION
    MyCollection(req, res, next){
        Collections.get(parseInt(req.params.id))
            .then(collection => {
                res.status(200).json({
                    success: true,
                    message: 'All posts received',
                    collection
                });
            });
    },

    // UPDATE AN ITEM
    UpdateItem(req, res, next){
        Collections.edit(req.body, parseInt(req.params.userID), parseInt(req.params.postID))
            .then(update => {
                Collections.get(parseInt(req.params.userID))
                    .then(collection => {
                        res.status(200).json({ collection, success: true, message: 'Post updated' });
                    });
            })
            .catch(err => res.status(400).json({ success: false, message: 'Post not updated' }));
    },

    // DELETE AN ITEM
    DeleteItem(req, res, next){
        Collections.delete(parseInt(req.params.userID), parseInt(req.params.id))
            .then(() => {
                Collections.get(parseInt(req.params.userID))
                    .then(collection => {
                        res.status(200).json({ collection, success: true, message: 'Post deleted' });
                    });
            })
            .catch(() => res.status(400).json({ success: false, message: 'Post not deleted' }));
    },


}