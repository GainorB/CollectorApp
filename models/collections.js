const db = require('../config/config');

const Collection = {};

// CREATE A NEW POST
Collection.new = (newPost, userID) => {
    return db.none(`INSERT INTO collection(userid, brand, title, 
                    condition, size, purchasedfor, purchasedfrom, worth, forsale, image)`
                    + `VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [userID, newPost.brand, newPost.title, newPost.condition, newPost.size,
        newPost.purchasedfor, newPost.purchasedfrom, newPost.worth, newPost.forsale, newPost.image]);
}

// GET ALL MY POSTS IN MY COLLECTION
Collection.get = (userID) => {
    return db.any(`SELECT id, brand, title, condition, size, purchasedfor, 
                    purchasedfrom, worth, forsale, image, 
                    COALESCE(to_char(date_added, 'Dy Mon DD at HH12:MI:SSam'), '') 
                    AS date_added FROM collection WHERE userid = $1 ORDER BY date_added DESC`, userID);
}

// DELETE A POST
Collection.delete = (userID, postID) => {
    return db.none('DELETE from collection WHERE id = $1 AND userid = $2', [postID, userID]);
}

// EDIT A POST
Collection.edit = (post, userID, postID) => {
    return db.none(`UPDATE collection SET brand = $1, title = $2, condition = $3
                    size = $4, purchasedfor = $5, purchasedfrom = $6, worth = $7, forsale = $8
                    image = $9 WHERE id = $10`,
                [post.brand, post.title, post.condition, post.size, post.purchasedfor,
                post.purchasedfrom, post.worth, post.forsale, post.image, postID]);
}

// GET INFO REGARDING AN UPDATED POST
Collection.info = (userID, itemID) => {
    return db.oneOrNone(`SELECT brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image FROM collection WHERE userid = $1 AND id = $2`, [userID, itemID]);
}

module.exports = Collection;