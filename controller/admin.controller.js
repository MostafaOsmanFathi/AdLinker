const userModel = require("../model/account.model");

let getAllUsers = async (req, res) => {
    try {
        let userList = await userModel.find();
        res.status(200).json(userList);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to get all users"});
    }
};

let deleteAllUsers = async (req, res) => {
    try {
        let numOfDeleted = await userModel.deleteMany();
        console.log(`all users deleted with : ${numOfDeleted}`);
        res.status(200).json(numOfDeleted);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to delete all users"});
    }
};

let deleteUserByEmail = async (req, res) => {
    try {
        let email = req.body.email;
        let isDeleted = await userModel.findOneAndDelete({email: email});
        if (isDeleted) {
            res
                .status(200)
                .json({message: `User with ${email} deleted successfully.`});
        } else {
            res.status(400).json({message: `User with ${email} not found`});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to delete user"});
    }
};


module.exports = {
    getAllUsers,
    deleteUserByEmail,
    deleteAllUsers,
};
