const express = require('express');
const router = express.Router();
const Collections = require('../models/collections');

const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/:id/new/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log(req.body);
    const userID = req.params.id;
    // EXTRACT FORM DATA
    const { category, brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image1, image2 } = req.body;

    // INSERT DATA INTO OBJECT
    const newPost = { category, brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image1, image2 };

    // ERROR CHECKING
    if(Object.values(newPost).indexOf('') >= 0){

        res.status(400).json({ success: false, message: 'Please fill in all fields' });
    
    } else {
        // ADD NEW POST
        Collections.new(newPost, userID)
            .then(post => { 
                res.status(201).json({ success: true, message: 'Post added successfully' });
            })
            .catch(err => {
                // console.error(err);
                res.status(400).json({ success: false, message: `Please fill in ${err.column}` }); 
            });
    }
});

router.get('/mine/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userID = parseInt(req.params.id);
    Collections.getMine(userID)
        .then(collection => {
            res.status(200).json({
                success: true,
                message: 'All posts received',
                collection
            });
        });
});

router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const postID = parseInt(req.params.id);
    const { category, userID, brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image1, image2 } = req.body; 
    const post = { category, brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image1, image2 };

    Collections.edit(post, userID, postID)
        .then(res.status(200).json({ success: true, message: 'Post updated' }))
        .catch(res.status(400).json({ success: false, message: 'Post not updated' }));
});

router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const postID = parseInt(req.params.id);
    const { userID } = req.body;

    Collections.delete(userID, postID)
        .then(res.status(200).json({ success: true, message: 'Post deleted' }))
        .catch(res.status(400).json({ success: false, message: 'Post not deleted' }));
});

module.exports = router;