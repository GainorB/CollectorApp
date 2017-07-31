const db = require('../config/config');

const Collection = {};

// CREATE A NEW POST
Collection.new = (newPost, userID) => {
    return db.none(`INSERT INTO collection(userid, category, brand, title, 
                    condition, size, purchasedfor, purchasedfrom, worth, 
                    forsale, image1, image2)`
                    + `VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [userID, newPost.category, newPost.brand, newPost.title, newPost.condition, newPost.size,
        newPost.purchasedfor, newPost.purchasedfrom, newPost.worth, newPost.forsale, newPost.image1, 
        newPost.image2]);
}

// GET ALL MY POSTS IN MY COLLECTION
Collection.getMine = (userID) => {
    return db.any(`SELECT category, brand, title, condition, size, purchasedfor, 
                    purchasedfrom, worth, forsale, image1, image2, 
                    COALESCE(to_char(date_added, 'Dy Mon DD at HH12:MI:SSam'), '') 
                    AS date_added FROM collection WHERE userid = $1 ORDER BY date_added DESC`, userID);
}

// DELETE A POST
Collection.delete = (userID, postID) => {
    return db.none('DELETE from collection WHERE id = $1 AND userid = $2', [postID, userID]);
}

// EDIT A POST
Collection.edit = (post, userID, postID) => {
    return db.none(`UPDATE collection SET category = $1, brand = $2, title = $3, condition = $4
                    size = $5, purchasedfor = $6, purchasedfrom = $7, worth = $8, forsale = $9
                    image1 = $10, image2 = $11 WHERE id = $12`,
                [post.category, post.brand, post.title, post.condition, post.size, post.purchasedfor,
                post.purchasedfrom, post.worth, post.forsale, post.image1, post.image2, postID]);
}

module.exports = Collection;