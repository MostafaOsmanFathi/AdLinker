const userModel = require('../model/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../env.js');


let getAllUsers = async (req, res) => {
    try {
        let userList = await userModel.find();
        res.status(200).json(userList)
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to get all users"});
    }
}

let deleteAllUsers = async (req, res) => {
    try {
        let numOfDeleted = await userModel.deleteMany();
        console.log(`all users deleted with : ${numOfDeleted}`);
        res.status(200).json(numOfDeleted);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to delete all users"});
    }
}

let deleteUserByEmail = async (req, res) => {
    try {
        let email = req.body.email;
        let isDeleted = await userModel.findOneAndDelete(
            {email: email},
        )
        if (isDeleted) {
            res.status(200).json({message: `User with ${email} deleted successfully.`})
        } else {
            res.status(400).json({message: `User with ${email} not found`})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to delete user"});
    }
}


let registerUser = async (req, res) => {
    try {
        req.body.password = await bcryptjs.hash(req.body.password, 12);
        const {email, name, password, user_type} = req.body;
        let newUserModel = new userModel({email, name, password, user_type});
        await newUserModel.save();
        console.log(`User with ${email} and ${name} registered successfully.`)
        res.status(200).json({message: `User with ${email} and ${name} registered successfully.`})
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to register user"});
    }
}

let loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).json({error: "Email or password is incorrect"});
        }
        const isMatch = bcryptjs.compareSync(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: "Email or password is incorrect"});
        }

        const token = jwt.sign(
            {userId: user._id, email: user.email, user_type: user.user_type},
            env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.user_type
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to login user"});
    }
}

module.exports = {getAllUsers, deleteUserByEmail, deleteAllUsers, registerUser, loginUser}