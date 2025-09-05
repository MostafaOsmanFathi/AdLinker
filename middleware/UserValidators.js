const {body, validationResult} = require("express-validator");


const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors})
    }
    next()
}

const emailValidation = [
    body("email").isEmail(),
    validate
]

const registerUserValidation = [
    body("email").isEmail(),
    body("name").isLength({min: 4}),
    body("password").isLength({min: 4}),
    body("user_type").optional().isIn(["publisher", "user", "admin"]),
    validate
];

const loginUserValidation = [
    body("email").isEmail(),
    body("password").isLength({min: 4}),
    validate
]


module.exports = {
    emailValidation,
    registerUserValidation,
    loginUserValidation,
}