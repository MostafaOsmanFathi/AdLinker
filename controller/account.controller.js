const bcryptjs = require("bcryptjs");
const userModel = require("../model/account.model");
const userLinkVisitHistoryModel = require("../model/userLinkVisitHistory.model")
const jwt = require("jsonwebtoken");

let registerUser = async (req, res) => {
    try {
        req.body.password = await bcryptjs.hash(req.body.password, 12);
        const {email, name, password, user_type} = req.body;
        let newUserModel = new userModel({email, name, password, user_type});
        await newUserModel.save();
        console.log(`User with ${email} and ${name} registered successfully.`);
        res
            .status(200)
            .json({
                message: `User with ${email} and ${name} registered successfully.`,
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to register user"});
    }
};

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
            {
                userId: user._id,
                email: user.email,
                user_type: user.user_type,
                name: user.name,
            },
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        );

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.user_type,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to login user"});
    }
};

let getMyAccountData = async (req, res) => {
    try {
        if (!req.auth_user_data) {
            res.status(404).json({error: "User Not Found"});
        }
        const result = await userModel.find({email: req.auth_user_data.email})
        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to getMyAccountData"});
    }
}
let changeMyAccountData = async (req, res) => {
    try {
        if (!req.auth_user_data) {
            res.status(404).json({error: "User Not Found"});
        }
        let result = await userModel.findOne({email: req.auth_user_data.email})

        if (!result) {
            res.status(404).json({error: "User Not Found"});
            return;
        }

        Object.keys(req.body).forEach((key) => {
            result[key] = req.body[key];
        })

        if (req.body.password !== undefined) {
            result["password"] = await bcryptjs.hash(req.body.password, 12)
        }

        await result.save()

        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to getMyAccountData"});
    }
}
let deleteMyAccount = async (req, res) => {
    try {
        if (!req.auth_user_data) {
            res.status(404).json({error: "User Not Found"});
        }
        const result = await userModel.findOneAndDelete({email: req.auth_user_data.email})
        if (!result) {
            res.status(404).json({error: "User Not Found"});
        }
        res.status(200).json({message: "account deleted successfully."});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to getMyAccountData"});
    }
}

let logoutUser = async (req, res) => {
    //TODO Implement jwt black list to revoke jwt token access
    req.status(200).json({error: "user logged out"});
}

let getAllAccountVisits = async (req, res) => {
    try {
        const email = req.auth_user_data.email;
        const result = await userLinkVisitHistoryModel.find({email})
        res.status(200).json(result)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

module.exports = {
    registerUser,
    loginUser,
    getMyAccountData,
    changeMyAccountData,
    deleteMyAccount,
    logoutUser,
    getAllAccountVisits,
}