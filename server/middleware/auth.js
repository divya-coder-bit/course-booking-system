const jwt = require('jsonwebtoken');
const UserModel = require('../models/user')

const checkAuth = async (req,res,next)=> {
   // console.log("hello auth")
    const token = req.cookies.token;
    console.log(token)
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, 'dddddiiiivvvyyya');
        console.log(decoded)
        // fetch user from database
        const user = await UserModel.findById(decoded.ID);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user; // full user now available including email
        // consle.log(req.user)
        next();
    } catch (error) {
        console.log(err)
        res.status(401).json({ message: "Invalid token" });
    }

}
module.exports = checkAuth