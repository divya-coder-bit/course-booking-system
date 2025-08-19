const UserModel = require('../models/user');
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


class UserController {
    static register =async(req,res)=> {
        try {
            console.log(req.body);
            const { name, email, password } = req.body;
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    msg: "email already exists"
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
        
            const data = await userModel.create({
                name,
                email,
                password:hashedPassword
            });

            res.json({
                data,
                msg: "User registered successfully"
            })
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }
    static login =async(req,res)=> {
        try {
            // console.log(req.body)
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });
            //console.log(user)
            if (!user) {
                return res.status(400).json({ message: "invalid credentials"});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            //console.log(isMatch)
            if (!isMatch) {
                return res.status(400).json({ message: "invalid credentials" });
            }
            // token create
            var token = jwt.sign({ ID: user._id }, process.env.JWT_SECRET, {
                expiresIn: "2d" 
            });
            // console.log(token);

            // send token in http-only cookie
            res.cookie("token", token, {
                httpOnly: true,

            });    
                 // Set to true if using HTTPS

            res
                .status(200)
                .json({ 
                    message: "Login successful",
                });
        } catch (error) {
            console.log(error);
        }
    }

    static profile = async (req, res) => {
        try {
            console.log("hello profile")
        } catch (error) {
            console.log(error);
        }
    }
    static logout = async (req, res) => {
        try {
            res.clearCookie("token");
            res.status(200).json({ message: "Logout successful" });

        } catch (error) {
            console.log(error);
        }

    }
        
    


}
module.exports = UserController