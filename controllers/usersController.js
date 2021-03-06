const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {

    // REGISTER A NEW USER
    newUser(req, res, next){
        
        // EXTRACT FORM DATA
        const { username, email, password } = req.body;

        // INSERT USER DATA INTO AN OBJECT
        let newUser = { username, email, password };

            // USE MODEL TO REGISTER A NEW USER
            User.addUser(newUser)
                .then(user => {
                    // CREATE A TOKEN
                    const token = jwt.sign(user, process.env.SECRET_KEY, {
                        expiresIn: 604800 // 1 WEEK
                    });

                    res.status(201).json({ 
                        success: true, 
                        message: 'Thanks for registering',
                        token: 'JWT ' +token,
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        } 
                    });

                    // WHEN USER REGISTERS ADD TOKEN TO DATABASE
                    //const newToken = 'JWT ' +token;
                    //User.addToken(user.username, newToken);
                }).catch(err => console.error(err));
    },

    // AUTHENTICATE/LOG IN
    // SEND BACK A TOKEN IF THE USER SUCCESSFULLY LOGS IN
    LogIn(req, res, next){

        // EXTRACT FORM DATA
        const { username, password } = req.body;

        // FIND USER BY USERNAME
        User.findByUserName(username)
            .then(user => {
                // IF A USER ISN'T FOUND
                if(!user){
                    return res.status(401).json({ success: false, message: "User not found" });
                }
                // IF A USER IS FOUND, CONTINUE AND COMPARE PASSWORD WITH HASH
                User.comparePassword(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    // IF PASSWORDS MATCH
                    if(isMatch){
                        // CREATE A TOKEN
                        const token = jwt.sign(user, process.env.SECRET_KEY, {
                            expiresIn: 604800 // 1 WEEK
                        });
                        // SEND JSON OBJECT ALONG WITH TOKEN
                        res.status(200).json({
                            success: true,
                            token: 'JWT ' +token,
                            user: {
                                id: user.id,
                                username: user.username,
                                email: user.email
                            }
                        });

                        // WHEN USER LOGS IN ADD TOKEN TO DATABASE
                        //const newToken = 'JWT ' +token;
                        //User.addToken(username, newToken);
                    } else {
                        return res.status(401).json({ success: false, message: "Wrong password" });
                    }
                });
            });

    },

    // PROFILE INFORMATION
    // PROTECTED ROUTE
    fetchProfile(req, res, next){

        const userID = req.params.id;

        User.grabProfile(userID)
            .then(user => {
                res.status(200).json({
                    success: true,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                });
            }).catch(err => console.error(err));
    }

}