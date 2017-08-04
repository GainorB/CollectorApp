const express = require('express');
const router = express.Router();
const Collections = require('../models/collections');

const passport = require('passport');
const jwt = require('jsonwebtoken');

// CREATE A NEW ITEM
router.post('/:id/new/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log(req.body);
    const userID = req.params.id;
    // EXTRACT FORM DATA
    const { brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image } = req.body;

    // INSERT DATA INTO OBJECT
    const newPost = { brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image };

    // ERROR CHECKING
    // if(Object.values(newPost).indexOf('') >= 0){

        // res.status(400).json({ success: false, message: 'Please fill in all fields' });
    
    // } else {
        // ADD NEW POST
        Collections.new(newPost, userID)
            .then(post => { 
                res.status(201).json({ success: true, message: 'Post added successfully' });
            })
            .catch(err => {
                // console.error(err);
                res.status(400).json({ success: false, message: `Please fill in ${err.column}` }); 
            });
   // }
});

// GET ITEM TO UPDATES INFO
router.get('/:id/update/info/:itemID', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userID = parseInt(req.params.id);
    const itemID = parseInt(req.params.itemID);
    Collections.info(userID, itemID)
        .then(info => {
            res.status(200).json({
                success: true,
                message: 'Item to update received',
                info
            });
        });
});

// GET MY COLLECTION
router.get('/mine/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userID = parseInt(req.params.id);
    Collections.get(userID)
        .then(collection => {
            res.status(200).json({
                success: true,
                message: 'All posts received',
                collection
            });
        });
});

// UPDATE AN ITEM
router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const postID = parseInt(req.params.id);
    const { userID, brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image1 } = req.body; 
    const post = { brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image1 };

    Collections.edit(post, userID, postID)
        .then(()=> res.status(200).json({ success: true, message: 'Post updated' }))
        .catch(()=> res.status(400).json({ success: false, message: 'Post not updated' }));
});

// DELETE AN ITEM
router.delete('/:userID/delete/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userID = parseInt(req.params.userID);
    const postID = parseInt(req.params.id);

    Collections.delete(userID, postID)
        .then(() => res.status(200).json({ success: true, message: 'Post deleted' }))
        .catch(() => res.status(400).json({ success: false, message: 'Post not deleted' }));
});

module.exports = router;